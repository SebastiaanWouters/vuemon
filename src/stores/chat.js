import { ref, computed, onMounted, reactive, watch, nextTick } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './user'
import {pool, relays} from '../utils/global'
import { uniqBy, addAndSort } from '../utils/helpers'
import { Author } from 'nostr-relaypool-fork'
import {getEventHash} from 'nostr-tools'
import * as secp from '@noble/secp256k1';

export const useChatStore = defineStore('chat', () => {
  const userStore = useUserStore();
  const partnerToAdd = ref(null);
  const activePartner = ref(null);
  /*const partners = reactive(JSON.parse(localStorage.getItem('emon-chatpartners') || "[]"));*/
  const partners = reactive([]);
  const metadata = ref({});
  const decryptedCache = reactive([]);


  const activePartnerMessages = computed(() => {
    const partnerMessages = decryptedCache.filter(message => {
      return message.tags[0][1] === activePartnerData.value.sendSecret || message.tags[0][1] === activePartnerData.value.receiveSecret
    }).sort((a,b) => a.created_at < b.created_at ? 1 : -1)
    return partnerMessages;
  })


  const activePartnerData = computed(() => {
    return {...metadata.value[activePartner.value], pubkey: activePartner.value};
  })

  onMounted(async () => {
      setTimeout(function() { decryptPartnerData(); }, 200);
  })

  async function initializePartner(partner) {
    const secret = await window.nostr.getSharedSecret(partner.pubkey);
    const sendSecret = (userStore.pubkey < partner.pubkey ? secret : await sha256(secret));
    const receiveSecret = (userStore.pubkey < partner.pubkey ? await sha256(secret) : secret);

    const author = new Author(pool, relays, partner.pubkey);
    author.metaData((event, afterEose, relays) => {metadata.value[partner.pubkey] = bundleMetadata(event, receiveSecret, sendSecret)}, 0);
    const incoming = new Author(pool, relays, receiveSecret);
    incoming.sentAndRecievedDMs(async (event, isAfterEose, relays) => { await handleNewEvent(event, partner.pubkey)}, 50, 0);
    const outgoing = new Author(pool, relays, sendSecret);
    outgoing.sentAndRecievedDMs(async (event, isAfterEose, relays) => { await handleNewEvent(event, partner.pubkey)}, 50, 0);
  }

  async function handleNewEvent(event, partnerPubkey) {
    /*updating the partners timestamp and order */
    console.log(event);
    const i = partners.findIndex(partner => partner.pubkey === partnerPubkey);
    if (i > -1) {
      if (partners[i].latest < event.created_at) {
        partners[i].latest = event.created_at
      }
    } else {
      partners.push({pubkey: partnerPubkey, latest: event.created_at})
    }
    partners.sort((a, b) => a.latest > b.latest ? 1 : -1);
    updateStoredChatPartners();

    let decrypted = ""
    if (!decryptedCache.some(message => message.id === event.id)) {
      try {
        decrypted = await window.nostr.nip04.decrypt(partnerPubkey, event.content);
      } catch {
        decrypted= "fail"
      }
      decryptedCache.push({...event, content: decrypted});
    }
  }

  watch(partnerToAdd, async (newPartner) => {
   if (newPartner) {
    console.log("newPartner")
    partnerToAdd.value = null;
    let secret = await window.nostr.getSharedSecret(newPartner);
    let sendSecret = (userStore.pubkey < newPartner ? secret : await sha256(secret));
    let receiveSecret = (userStore.pubkey < newPartner ? await sha256(secret) : secret);

    const author = new Author(pool, relays, newPartner);
    author.metaData((event, afterEose, relays) => {metadata.value[newPartner] = bundleMetadata(event, receiveSecret, sendSecret)}, 0);
    const incoming = new Author(pool, relays, receiveSecret);
    incoming.sentAndRecievedDMs((event, isAfterEose, relays) => {handleNewEvent(event, newPartner)}, 50, 0);
    const outgoing = new Author(pool, relays, sendSecret);
    outgoing.sentAndRecievedDMs((event, isAfterEose, relays) => {handleNewEvent(event, newPartner)}, 50, 0);

   }
  })

  function bundleMetadata(event, receiveSecret, sendSecret) {
    let metadata = JSON.parse(event.content)
    const username = metadata.name ? metadata.name : event.pubkey.slice(0,6);
    let picture = "";
    try {
      picture = metadata.picture ? encodeURI(metadata.picture) : "fallback";
    } catch {
      picture = "fallback"
    }
    return {...metadata, name: username, picture: picture, receiveSecret: receiveSecret, sendSecret: sendSecret}
  }

  async function decryptPartnerData() {
    if (localStorage.getItem('emon-chatpartners')) {
      const partnerString = await window.nostr.nip04.decrypt(userStore.pubkey, localStorage.getItem('emon-chatpartners'));
      Object.assign(partners, JSON.parse(partnerString));
    }
    for (const partner of partners) { initializePartner(partner)}
  }


  async function updateStoredChatPartners() {
    /*localStorage.setItem('emon-chatpartners', JSON.stringify(partners));*/
    const encrypted = await window.nostr.nip04.encrypt(userStore.pubkey, JSON.stringify(partners))
    localStorage.setItem('emon-chatpartners', encrypted);
  }


  async function sha256(hex) {
    let bytes = secp.utils.hexToBytes(hex);
    let hash = await secp.utils.sha256(bytes);
    return secp.utils.bytesToHex(hash);
  }

  async function publishMessage(message, resetMessage, receiver) {
    
    if (message.length === 0) return

    let encrypted = await window.nostr.nip04.encrypt(receiver.pubkey, message);

    // make event
    let event = {
      pubkey: userStore.pubkey,
      created_at: Math.floor(Date.now() / 1000),
      kind: 4,
      tags: [['p', receiver.sendSecret]],
      content: encrypted
    }

    console.log("publishing event: ", event);

    event.id = await getEventHash(event);
    
    const signedEvent = await window.nostr.signEvent(event);
    pool.publish(signedEvent, relays);
    resetMessage();
  }

  function isDuplicate(pubkey) {
    const dup = partners.find(obj => {
      return obj.pubkey === pubkey
    })
    return dup ? true : false;
  }

  function reset() {
    partners.splice(0);
    decryptedCache.splice(0);
    metadata.value = {};
    activePartner.value = null;
  }


  return { partnerToAdd, partners, metadata, activePartner, activePartnerData, decryptedCache, isDuplicate, publishMessage, reset, activePartnerMessages }
})

