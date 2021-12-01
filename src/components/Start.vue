<template>
    <div class="start fixed w-full h-full bg-black bg-opacity-50 z-10 flex justify-center items-center flex-col text-yellow-100">
        <div class="intro text-center max-w-screen-sm">
            <h2 class="text-4xl mb-6">Velkommen til <span class="font-bold text-red-400">Slagelse GEOQUIZ</span>
            </h2>
            <p>Hvor godt kender du fastfood scenen i Slagelse?</p>
        </div>
        <div class="help">
            <p>Klik på kortet og bekræft dit gæt</p>
        </div>

        <div id="initials" class="text-red-400 mt-4">
            <input placeholder="Skriv dit navn" class=" text-center shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" v-model="initials" @input="initialsChange" type="text">
        </div>
        
        <div class="startButton">
            <button :disabled="activateButton" @click="showStart" :class=dynClass>
                Start
            </button>
        </div>
        <Highscore />
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import Highscore from '@/components/Highscore.vue'

export default defineComponent({
    components: {
        Highscore
    },
    setup(props, { emit }) {

        const initials = ref<string>("");
        const activateButton = computed(() => {
            if (initials.value.length > 0) {
                return false
            } else {
                return true
            }
        })
        const dynClass = computed(() => {
            if (initials.value.length > 0) {
                return "text-3xl bg-red-400 hover:bg-red-900 w-36 mt-6 rounded pb-1"
            } else {
                return "text-3xl bg-gray-800 w-36 mt-6 rounded pb-1 disabled:opacity-50 cursor-not-allowed"
            }
        })
        
        const showStart = () => {
            emit('showStart', false)
        }

        const initialsChange = () => {
            emit('initialsChange', initials.value)
        }

        return {
            showStart,
            initialsChange,
            initials,
            activateButton,
            dynClass
        }
    },
})
</script>
