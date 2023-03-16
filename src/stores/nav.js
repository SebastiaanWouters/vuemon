import { ref, computed, watch, onMounted } from 'vue'
import { defineStore } from 'pinia'

export const useNavStore = defineStore('nav', () => {
    const isSearching = ref(false);

    return { isSearching }
    })
