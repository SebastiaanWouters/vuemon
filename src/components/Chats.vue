<script setup>
  import {pool, relays} from '../utils/global'
  import { Author } from 'nostr-relaypool-fork';
  import { useChatStore } from '../stores/chat';
  import ChatPreview from '../components/ChatPreview.vue'

  const chatStore = useChatStore()
</script>

<template>
  <div class="bg-black/50 backdrop-blur-md backdrop-brightness-75 h-5/6 flex overflow-y-auto flex-col justify-start items-center">
    <ChatPreview v-bind:key="partner" v-for="partner in chatStore.partners.slice().reverse()" :pubkey="partner.pubkey"></ChatPreview>
  </div>
</template>