<template>
    <div>
        <div id="question" class="fixed pl-10 pt-10 z-10 text-red-800 text-4xl">
            <p>Hvor ligger <span class="font-bold">{{curLocation.properties.name}}</span>?</p>
        </div>
        <div v-if="finished == false" id="button" class="fixed bottom-8 z-10 text-center w-full text-yellow-100">
            <button v-if="guessButton" @click="guessUpdate" class="text-3xl bg-red-800 hover:bg-red-900 w-36 mt-6 rounded pb-1">Gæt</button>
            <button v-else-if="guessButton == false && locationIndex < 9" @click="nextQuestion" class="text-3xl bg-red-800 hover:bg-red-900 w-36 mt-6 rounded pb-1">Næste</button>
            <button v-else-if="guessButton == false && locationIndex == 9" @click="finishQuiz" class="text-3xl bg-red-800 hover:bg-red-900 w-44 mt-6 rounded pb-1">Se Resultat!</button>
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
        },
        finished: {
            type: Boolean,
            default: () => {
                return false
            }
        }
    },
    setup(props, {emit}) {

        const guessButton = ref<boolean>(true)

        const guessUpdate = () => {
            emit('guessUpdate');
            guessButton.value = !guessButton.value
        }

        const nextQuestion = () => {
            guessButton.value = !guessButton.value
            emit('nextQuestion')
        }

        const finishQuiz = () => {
            emit('finishQuiz')
        }

        return {
            guessUpdate,
            guessButton,
            nextQuestion,
            finishQuiz
        }
    }
})
</script>
