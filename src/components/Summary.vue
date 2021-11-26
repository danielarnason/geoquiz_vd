<template>
    <div class="summary fixed w-full h-full bg-black bg-opacity-50 z-10 flex justify-center items-center flex-col text-yellow-100">
        <div class="item text-center">
            <h1>Du har gættet {{ roundedDistance }} km forkert!</h1>
            <button class="text-3xl bg-red-800 hover:bg-red-900 w-36 mt-6 rounded pb-1 uppercase">Spil igen!</button>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        guessDistance: {
            type: Number as PropType<number>,
            default: () => {
                return 0
            }
        }
    },
    setup(props) {
        const roundedDistance = computed(() => {
            if (props.guessDistance < 1) {
                return Math.round(props.guessDistance * 1000)
            } else {
                return Math.round(props.guessDistance * 10) / 10
            }
        })

        return {
            roundedDistance
        }
    }
})
</script>
