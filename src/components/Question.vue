<template>
    <div>
        <div id="question" class="fixed pl-10 pt-10 z-10 text-red-800 text-4xl">
            <p>Hvor ligger <span class="font-bold">{{curLocation.properties.name}}</span>?</p>
        </div>
        <div id="button" class="fixed bottom-8 z-10 text-center w-full text-yellow-100">
            <button v-if="guessButton" @click="guessUpdate" class="text-3xl bg-red-800 hover:bg-red-900 w-36 mt-6 rounded pb-1">Gæt</button>
            <button v-else @click="nextQuestion" class="text-3xl bg-red-800 hover:bg-red-900 w-36 mt-6 rounded pb-1">Næste</button>
        </div>
    </div>
</template>

<script lang="ts">
import { fastfoodFeature } from '@/interfaces'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
    props: {
        curLocation: {
            type: Object as PropType<fastfoodFeature>,
        },
        locationIndex: {
            type: Number
        }
    },
    setup(props, {emit}) {

        const guessButton = ref<boolean>(true)

        const guessUpdate = () => {
            emit('guessUpdate');
            guessButton.value = !guessButton.value
        }

        const nextQuestion = () => {
            console.log('Looper til næste spørgsmål');
            guessButton.value = !guessButton.value
            emit('nextQuestion')
        }

        return {
            guessUpdate,
            guessButton,
            nextQuestion
        }
    }
})
</script>
