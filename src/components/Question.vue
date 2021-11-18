<template>
    <div>
        <div id="question" class="fixed pl-10 pt-10 z-10 text-red-800 text-4xl">
            <p>Hvor ligger <span class="font-bold">{{locations[index].properties.name}}</span>?</p>
        </div>
        <div id="button" class="fixed bottom-8 z-10 text-center w-full text-yellow-100">
            <button @click="updateIndex" class="text-3xl bg-red-800 hover:bg-red-900 w-36 mt-6 rounded pb-1">Gæt</button>
        </div>
    </div>
</template>

<script lang="ts">
import { fastfoodFeature } from '@/interfaces'
import { defineComponent, PropType, ref, watch } from 'vue'

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
    setup(props, { emit }) {
        const index = ref<number>(0)

        const updateIndex = () => {
            index.value ++
        }

        watch(index.value, () => {
            emit('udpateIndex', index.value)
        })

        return {
            index,
            updateIndex,
        }
    }
})
</script>
