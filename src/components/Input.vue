<script setup>
  import { reactive, ref, watch } from 'vue';
  import { useChatStore } from '../stores/chat'
  import Send from '../assets/sendbutton.svg'

  const chatStore = useChatStore();
  const message = ref("");


  function resetMessage() {
    message.value = "";
  }

</script>

<template>
  <div class="bg-black/60 backdrop-blur-md backdrop-brightness-50 w-full p-3 h-16 flex items-center justify-between">
    <input v-if="chatStore.activePartner" v-model="message" placeholder="Say Hi..." v-on:keydown.enter="chatStore.publishMessage(message, resetMessage, chatStore.activePartnerData);" class="text-neutral-50 bg-transparent p-1 border-none focus:outline-none w-11/12"/>
    <button class='text-neutral-50' v-if="chatStore.activePartner" @click="chatStore.publishMessage(message, resetMessage, chatStore.activePartnerData);"><img :src="Send" /></button>
  </div>
</template>