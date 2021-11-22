<template>
    <div class="w-full h-full absolute" id="mapcontainer"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue'
import maplibregl, { Map, MapMouseEvent, Marker } from 'maplibre-gl'
import { fastfoodFeature } from '@/interfaces';

export default defineComponent({
    props: {
        locations: {
            type: Array as PropType<fastfoodFeature[]>,
            default: () => {
                return []
            }
        },
        currentLocation: {
            type: Object as PropType<fastfoodFeature>
        },
        locationIndex: {
            type: Number
        }
    },
    setup() {

        const map = ref<Map | any>();
        const guessMarker = ref<Marker>();

        onMounted(() => {
            map.value = new maplibregl.Map({
                container: 'mapcontainer',
                style: 'mapbox://styles/mapbox/light-v10',
                center: [11.295584 ,55.341815],
                zoom: 10,
                accessToken: 'pk.eyJ1IjoiZGFuaWVsLWFybmFzb24iLCJhIjoiY2pyOHo2OXp3MGI2MDQ5dm1nMzZ0NjJycCJ9.ESsG_fdvITuPsMUbUevoGQ',
            })

            map.value.on('click', (e: MapMouseEvent) => {
                guessMarker.value = new maplibregl.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map.value);
            })
        })

        return {
            map,
            guessMarker
        }
    },
})
</script>