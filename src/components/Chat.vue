<script setup>
   import { useChatStore } from '../stores/chat';
   import Message from './Message.vue'

   const chatStore = useChatStore();


</script>

<template>
   <div v-if="chatStore.activePartnerData" class="bg-black/50 backdrop-blur-md backdrop-brightness-75 py-2.5 h-5/6 border border-black/50 flex flex-col-reverse overflow-y-auto">
      <Message v-bind:key="message" v-for="message in chatStore.activePartnerMessages" :owner="message.tags[0][1] === chatStore.activePartnerData.sendSecret" :message="message.content"></Message>
   </div>

</template>