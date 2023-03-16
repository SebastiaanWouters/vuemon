<script setup>
  import ChatInfo from './ChatInfo.vue';
  import Chat from './Chat.vue';
  import Input from './Input.vue';
</script>

<template>
   <div class="overflow-hidden w-2/3 h-full max-w-4xl glass rounded-md flex flex-col shadow-lg">
    <ChatInfo></ChatInfo>
    <Chat></Chat>
    <Input></Input>
  </div>
</template>