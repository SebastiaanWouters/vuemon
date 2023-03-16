<script setup="props">
  import { useChatStore } from '../stores/chat'
  import { defineProps, onMounted, reactive, ref } from 'vue'

  const props = defineProps({
    pubkey: String
  })

  const chatStore = useChatStore();

  function setActiveUser() {
    chatStore.activePartner = props.pubkey;
  }
</script>

<template>
  <button @click="setActiveUser" :class="chatStore.activePartner === pubkey ? 'bg-neutral-50/40 backdrop-blur-md backdrop-brightness-105' : 'bg-black/25 backdrop-blur-md backdrop-brightness-100'" class="p-4 rounded-lg glas mt-4 flex justify-start items-center cursor-pointer hover:bg-neutral-50/50 gap-2 w-11/12">
    <img :src="chatStore.metadata[pubkey] ? chatStore.metadata[pubkey].picture : 'test'" class="w-10 h-10"/>
    <p class="text-neutral-50 ml-2 font-bold">{{ chatStore.metadata[pubkey] ? chatStore.metadata[pubkey].name : pubkey.slice(0,6) }}</p>
  </button>
</template>