<template>
    <div class="start fixed w-full h-full bg-black bg-opacity-50 z-10 flex justify-center items-center flex-col text-yellow-100">
        <div class="intro text-center max-w-screen-sm">
            <h2 class="text-4xl mb-6">Velkommen til <span class="font-bold text-red-800">Slagelse GEOQUIZ</span>
            </h2>
            <p>Hvor godt kender du fastfood scenen i Slagelse?</p>
        </div>
        <div class="help">
            <p>Klik i kortet og bekræft dit gæt</p>
        </div>
        <div class="startButton">
            <button @click="showStart" class="text-3xl bg-red-800 hover:bg-red-900 w-36 mt-6 rounded pb-1">
                Start
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup(props, { emit }) {
        const showStart = () => {
            emit('showStart', false)
        }

        return {
            showStart
        }
    },
})
</script>
