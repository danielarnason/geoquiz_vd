<template>
    <div id="mapcontainer"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue'
import maplibregl, { Map } from 'maplibre-gl'
import { fastfoodFeature } from '@/interfaces';

export default defineComponent({
    props: {
        locations: {
            type: Array as PropType<fastfoodFeature[]>,
            default: () => {
                return []
            }
        }
    },
    setup() {

        const map = ref<Map>();

        onMounted(() => {
            map.value = new maplibregl.Map({
                container: 'mapcontainer',
                style: 'mapbox://styles/mapbox/light-v10',
                center: [11.295584 ,55.341815],
                zoom: 10,
                accessToken: 'pk.eyJ1IjoiZGFuaWVsLWFybmFzb24iLCJhIjoiY2pyOHo2OXp3MGI2MDQ5dm1nMzZ0NjJycCJ9.ESsG_fdvITuPsMUbUevoGQ',
            })
            // map.value.addControl(new maplibregl.NavigationControl(), 'top-left');
        })

        return {
            map
        }
    },
})
</script>


<style scoped>
#mapcontainer {
    height: 100%;
    width: 100%;
    position: absolute;
}
</style>