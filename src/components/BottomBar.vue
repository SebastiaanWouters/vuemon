<script setup>
   import { useUserStore } from '../stores/user';
   import { useNavStore } from '../stores/nav';
   import { useChatStore } from '../stores/chat';
   import {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription,
   } from '@headlessui/vue'
   import Plus from '../assets/plus.svg'
   import Logout from '../assets/logout.svg'
   import router from '../router';
   import { ref } from 'vue';
   const userStore = useUserStore();
   const chatStore = useChatStore();
   const navStore = useNavStore();


  const isOpen = ref(false)

  function setIsOpen(value) {
    isOpen.value = value
  }

   async function logout() {
      localStorage.setItem('emon-pubkey', null);
      localStorage.setItem('emon-chatpartners', []);
      chatStore.reset();
      userStore.pubkey = ''; 
      router.push('/')
   }
</script>

<template>
   <div class="bg-black/60 backdrop-blur-md backdrop-brightness-50 h-16 flex justify-between items-center">
    <button class="text-neutral-50 pl-2 h-1 flex justify-center items-center" @click="setIsOpen(true)"><img :src="Logout" class="hover:scale-105 transition-all w-9 h-9" /></button>
    <button class="pr-2 h-1 flex justify-center items-center" @click="navStore.isSearching = !navStore.isSearching"><img class="hover:scale-105 transition-all w-8 h-8" :class="navStore.isSearching ? 'rotate-45' : ''" :src="Plus"/></button>
   </div>
   <Dialog class="relative z-50" :open="isOpen" @close="setIsOpen">
      <div class="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      <div class="fixed inset-0 flex items-center justify-center p-4">
         <DialogPanel class="flex justify-center flex-col items-center rounded-xl shadow-xl p-4 max-w-xl h-fit bg-neutral-900/90 text-neutral-300">
            <DialogTitle class="font-bold text-2xl">Warning</DialogTitle>
            <DialogDescription class="p-4 text-center">
            Are you sure you want to log out? This will delete all chat partners from storage.
            You will have to manually add them again when logging back in.
            </DialogDescription>
            <div class="flex gap-6 p-3">
            <button @click="setIsOpen(false); logout()" class="bg-neutral-700 glass hover:bg-neutral-600 hover:shadow-2xl shadow-md uppercase p-2 rounded-md">Proceed</button>
            <button @click="setIsOpen(false)" class="bg-violet-800 glass hover:bg-violet-700 shadow-md hover:shadow-2xl uppercase p-2 rounded-md">Cancel</button>
            </div>
         
         </DialogPanel>
      </div>
   </Dialog>
</template>