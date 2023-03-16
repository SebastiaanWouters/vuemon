<script setup>
  import { defineProps } from 'vue';
  import Plus from '../assets/plus.svg'

  const props = defineProps({
    metadata: Object
  })


</script>

<template>
  <div class="p-4 rounded-lg bg-black/25 backdrop-blur-md backdrop-brightness-100 shadow-sm mt-4 flex justify-start items-center gap-2 w-11/12 cursor-pointer hover:bg-neutral-50/25 hover:shadow-lg">
    <img :src="metadata ? metadata.picture : 'blabla'" class="w-10 h-10"/>
    <span class="text-neutral-50 ml-2 font-bold">{{ metadata ? metadata.name : "loser" }}</span>
    <button @click="$emit('addUser')" class="ml-auto text-neutral-50"><img :src="Plus" class="w-6 h-6 transition-all hover:scale-110"/></button>
  </div>
</template>