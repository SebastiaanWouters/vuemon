<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import router from '../router';
import { useUserStore } from '../stores/user'

const userStore = useUserStore();

async function login() {
    const pubkey = await window.nostr.getPublicKey();
    userStore.pubkey = pubkey
}


</script>

<template>
 <div class="bg-violet-800 min-h-screen h-screen flex justify-center items-center"><button class="transition-all py-8 px-10 text-4xl text-neutral-100 backdrop-blur-md shadow-md uppercase font-bold bg-black/50 rounded-lg hover:bg-white/50 hover:shadow-2xl hover:text-neutral-900" @click="login">Login</button></div>
</template>

<style>
   
</style>
