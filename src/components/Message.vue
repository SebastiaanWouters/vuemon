<script setup>


  const props = defineProps({
    message: String,
    owner: Boolean,
  })
</script>

<template>
  <div :class='owner ? "justify-start" : "justify-end"' class="flex px-3 py-1.5 items-center w-full">
    <div :class="owner ? 'bg-neutral-50/60 backdrop-blur-md backdrop-brightness-105 text-neutral-900' : 'bg-black/25 backdrop-blur-md backdrop-brightness-100 text-neutral-200'" class="w-auto p-2 rounded-lg shadow-lg max-w-fit ">{{ message }}</div>
  </div>

</template>