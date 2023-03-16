<script setup>
  import { reactive, ref, watch } from 'vue';
  import SearchPreview from './SearchPreview.vue'
  import {pool, relays} from '../utils/global'
  import { Author } from 'nostr-relaypool-fork';
  import { useChatStore } from '../stores/chat';
  import { useNavStore } from '../stores/nav';
  import { computed, resetTracking } from '@vue/reactivity';
 
  const chatStore = useChatStore();
  const navStore = useNavStore();
  const searchKey = ref("");
  const user = ref(null);
  const userFound = ref(false);

  watch(searchKey, (key) => {
    user.value = null;
    userFound.value = false;
    if (key.length === 64) {
      const author = new Author(pool, relays, key);
      console.log(author)
      author.metaData(setUser, 0);
    }})

  function setUser(event, afterEose, relays) {
      user.value = JSON.parse(event.content);
      console.log(user.value)
      userFound.value = true;
  }

  function addUser() {
    if (!chatStore.isDuplicate(searchKey.value)) {
      chatStore.partnerToAdd = searchKey.value;
    } 
    chatStore.activePartner = searchKey.value
    navStore.isSearching = false;
    userFound.value = false;
  }

 
  
</script>

<template>
  <div class="bg-black/50 backdrop-blur-md backdrop-brightness-75 h-5/6 flex flex-col items-center justify-start pt-4">
    <input class="outline-none focus:bg-neutral-400 text-neutral-800 p-2 rounded-md bg-neutral-400/80 w-11/12 placeholder-neutral-900" placeholder="enter pubkey..." v-model="searchKey" type="text" />
    <SearchPreview v-if="userFound" @add-user="addUser" :metadata="user" ></SearchPreview>
  </div>
</template>