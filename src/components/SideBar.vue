<script setup>
  import { ref } from 'vue';
  import { useNavStore } from '../stores/nav';
  import Chats from './Chats.vue';
  import BottomBar from './BottomBar.vue';
  import Search from './Search.vue';
  import NavBar from './NavBar.vue';

  const navStore = useNavStore();
</script>

<template>
  <div class="w-1/3 min-w-fit max-w-md h-full glass overflow-hidden rounded-md flex flex-col shadow-lg">
    <NavBar></NavBar>
    <Search v-if="navStore.isSearching"></Search>
    <Chats v-else></Chats>
    <BottomBar></BottomBar>
   
  </div>
</template>