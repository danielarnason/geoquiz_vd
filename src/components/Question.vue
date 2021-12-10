<template>
    <div>
        <div v-if="finished == false" id="question" class="fixed pl-10 pt-10 z-10 text-red-400 text-4xl">
            <p class="text-purple-500">{{locationIndex + 1}} / 10</p>
            <p v-if="category == 'e55'">Hvor ligger <span class="font-bold">{{curLocation.properties.name}}</span>?</p>
            <p v-else>Hvor ligger <span class="font-bold">{{curLocation.properties.title}}</span>?</p>
            <p v-if="guessDistance != 0"> Du ramte {{ distance }} ved siden af!</p>
        </div>
        <div v-if="finished == false" id="button" class="fixed bottom-8 z-10 text-center w-full text-yellow-100">
            <button v-if="guessButton" @click="guessUpdate" class="text-3xl bg-red-400 hover:bg-red-900 w-36 mt-6 rounded pb-1">Gæt</button>
            <button v-else-if="guessButton == false && locationIndex < 9" @click="nextQuestion" class="text-3xl bg-red-400 hover:bg-red-900 w-36 mt-6 rounded pb-1">Næste</button>
            <button v-else-if="guessButton == false && locationIndex == 9" @click="finishQuiz" class="text-3xl bg-red-400 hover:bg-red-900 w-44 mt-6 rounded pb-1">Se Resultat!</button>
        </div>
    </div>
</template>

<script lang="ts">
import { locationFeature } from '@/locationInterface'
import { computed, defineComponent, PropType, ref } from 'vue'

export default defineComponent({
    props: {
        curLocation: {
            type: Object as PropType<locationFeature>,
        },
        locationIndex: {
            type: Number
        },
        finished: {
            type: Boolean,
            default: () => {
                return false
            }
        },
        guessDistance: {
            type: Number,
            default: () => {
                return 0
            }
        },
        category: {
            type: String,
            default: () => {
                return ''
            }
        }
    },
    setup(props, {emit}) {

        const guessButton = ref<boolean>(true)
        const distance = computed(() => {
            if (props.guessDistance < 1) {
                return `${Math.round(props.guessDistance * 1000)} m`;
            } else {
                return `${Math.round(props.guessDistance * 10) / 10} km`
            }
        })

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
            finishQuiz,
            distance
        }
    }
})
</script>
