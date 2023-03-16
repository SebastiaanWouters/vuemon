<script setup>
  import { useChatStore } from '../stores/chat';
  const chatStore = useChatStore();
</script>

<template>
  <div class="bg-black/60 backdrop-blur-md flex items-center justify-between backdrop-brightness-50 h-16 p-3">
    <span class="text-neutral-100 text-bold">{{ chatStore.metadata[chatStore.activePartner] ? chatStore.metadata[chatStore.activePartner].name : "" }}</span>
  </div>
</template>