<script setup>
  import { useUserStore } from '../stores/user';
  const userStore = useUserStore();
  console.log(userStore.picture)
</script>

<template>
  <div class="bg-black/60 backdrop-blur-md backdrop-brightness-50 h-16 flex items-center justify-between p-2.5">
    <img class="w-10 h-10" src="../assets/logo.svg" alt="">
    <div class="userInfo flex items-center gap-3">
      <span class="text-bold text-neutral-50">{{ userStore.username }}</span>
      <img class="w-8 h-8" :src="userStore.picture" alt=""/>
    </div>
    
    </div>
</template>