<template>
    <div class="summary fixed w-full h-full bg-black bg-opacity-50 z-10 flex justify-center items-center flex-col text-yellow-100">
        <div class="item text-center">
            <h1>Du har gættet {{ guessDistance }} km forkert!</h1>
            <button class="text-3xl bg-red-800 hover:bg-red-900 w-36 mt-6 rounded pb-1 uppercase">Spil igen!</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        guessDistance: {
            type: Number
        }
    }
})
</script>
