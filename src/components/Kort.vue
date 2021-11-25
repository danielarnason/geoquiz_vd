<template>
    <div class="w-full h-full absolute" id="mapcontainer"></div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue'
import maplibregl, { Map, MapMouseEvent, Marker } from 'maplibre-gl'
import { fastfoodFeature } from '@/interfaces';
import { lineString } from '@/linestringInterface';
import bbox from "@turf/bbox";

export default defineComponent({
    props: {
        locations: {
            type: Array as PropType<fastfoodFeature[]>,
            default: () => {
                return []
            }
        },
        currentLocation: {
            type: Object as PropType<fastfoodFeature>,
            default: () => {
                return {}
            }
        },
        locationIndex: {
            type: Number
        },
        guessLinestring: {
            type: Object as PropType<lineString>,
            default: () => {
                return {}
            }
        }
    },
    setup(props, { emit }) {

        const map = ref<Map | any>();
        const guessMarker = ref<Marker>();
        const currentLocationMarker = computed((): Marker => {
            return new maplibregl.Marker({color: '#FF0000'}).setLngLat([props.currentLocation.geometry?.coordinates[0], props.currentLocation.geometry?.coordinates[1]])
        })

        onMounted(() => {
            map.value = new maplibregl.Map({
                container: 'mapcontainer',
                style: 'mapbox://styles/mapbox/light-v10',
                center: [11.295584 ,55.341815],
                zoom: 10,
                accessToken: 'pk.eyJ1IjoiZGFuaWVsLWFybmFzb24iLCJhIjoiY2pyOHo2OXp3MGI2MDQ5dm1nMzZ0NjJycCJ9.ESsG_fdvITuPsMUbUevoGQ',
            })

            map.value.on('click', (e: MapMouseEvent) => {
                addMarker(e);
            })
        })

        const addMarker = (e: MapMouseEvent) => {
            if (guessMarker.value === null) {
                guessMarker.value = new maplibregl.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map.value);
            } else {
                guessMarker.value?.remove()
                guessMarker.value = new maplibregl.Marker().setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map.value);
            }
        }


        watch(guessMarker, () => {
            emit('guessUpdated', guessMarker.value)
            
        })

        const addLine = (line: lineString) => {
            map.value.addSource('guessLine', {
                type: 'geojson',
                data: line
            });

            map.value.addLayer({
                id: 'line',
                type: 'line',
                source: 'guessLine',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#888',
                    'line-width': 8
                }
            })
            map.value.fitBounds(bbox(line), {
                padding: 100
            })
        }

        const addCurrentLocationMarker = (marker: Marker) => {
            marker.addTo(map.value)
        }

        watch(() => props.guessLinestring, (first) => {
            addLine(first);
            addCurrentLocationMarker(currentLocationMarker.value);
        })

        return {
            map,
            guessMarker,
            currentLocationMarker
        }
    },
})
</script>