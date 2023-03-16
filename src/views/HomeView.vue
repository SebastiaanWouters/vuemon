<script setup>
import router from '../router';
import { onMounted } from 'vue';
import { useChatStore } from '../stores/chat';
import { useUserStore } from '../stores/user';
import SideBar from '../components/SideBar.vue'
import ChatComp from '../components/ChatComp.vue'

const userStore = useUserStore();
const chatStore = useChatStore();

</script>

<template>
 <div class="relative bg-violet-900 min-h-screen h-screen flex justify-center items-center">
  <div class="flex justify-center w-11/12 h-4/6 items-center gap-12">
    <SideBar/>
    <ChatComp/>
  </div>
 </div>
</template>
