import { ref, computed, watch, onMounted } from 'vue'
import { defineStore } from 'pinia'
import {pool, relays} from '../utils/global'
import {Author} from 'nostr-relaypool-fork'
import router from '../router';

export const useUserStore = defineStore('user', () => {
    const pubkey = ref(localStorage.getItem('emon-pubkey'));
    const picture = ref("");
    const username = ref("")

    onMounted(() => {
        if (pubkey.value) {
            const author = new Author(pool, relays, pubkey.value);
            author.metaData((event, afterEose, relays) => login(event), 0);
        } else {
            router.push('/')
        }
    })

    watch(pubkey, (pubkey) => {
        const author = new Author(pool, relays, pubkey);
        author.metaData((event, afterEose, relays) => login(event), 0);
    })

    function login(event) {
        localStorage.setItem("emon-pubkey", event.pubkey)
        const metaData = JSON.parse(event.content);
        username.value = metaData.name? metaData.name : "fail";
        try {
            picture.value = metaData.picture ? encodeURI(metaData.picture) : "fail";
        } catch {
            picture.value = "catch"
        }

        router.push('/home')
    }


    return { pubkey, picture, username }
    })
