<template>
    <div>
        <div id="question" class="fixed pl-10 pt-10 z-10 text-red-800 text-4xl">
            <p>Hvor ligger <span class="font-bold">{{locations[locationIndex].properties.name}}</span>?</p>
        </div>
        <div id="button" class="fixed bottom-8 z-10 text-center w-full text-yellow-100">
            <button @click="updateIndex" class="text-3xl bg-red-800 hover:bg-red-900 w-36 mt-6 rounded pb-1">Gæt</button>
        </div>
    </div>
</template>

<script lang="ts">
import { fastfoodFeature } from '@/interfaces'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    props: {
        locations: {
            type: Array as PropType<fastfoodFeature[]>,
            default: () => {
                return []
            }
        },
        locationIndex: {
            type: Number
        }
    },
    setup(props, {emit}) {

        const updateIndex = () => {
            emit('updateIndex');
        }

        return {
            updateIndex
        }
    }
})
</script>
