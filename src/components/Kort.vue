<template>
    <div class="w-full h-full absolute" id="mapcontainer"></div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue'
import maplibregl, { LngLatLike, Map, MapMouseEvent, Marker } from 'maplibre-gl'
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
        },
        finished: {
            type: Boolean,
            default: () => {
                return false
            }
        }
    },
    setup(props, { emit }) {

        const map = ref<Map | any>();
        const guessMarker = ref<Marker | any>();
        const currentLocationMarker = ref<Marker | any>();
        // const currentLocationMarker = computed((): Marker => {
        //     return new maplibregl.Marker({color: '#FF0000'}).setLngLat([props.currentLocation.geometry?.coordinates[0], props.currentLocation.geometry?.coordinates[1]])
        // })

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

        const addCurrentLocationMarker = (coordinates: LngLatLike) => {
            if (currentLocationMarker.value === null) {
                currentLocationMarker.value = new maplibregl.Marker({color: '#ff0000'}).setLngLat(coordinates).addTo(map.value);
            } else {
                currentLocationMarker.value?.remove()
                currentLocationMarker.value = new maplibregl.Marker({color: '#ff0000'}).setLngLat(coordinates).addTo(map.value);
            }
        }

        watch(guessMarker, () => {
            emit('guessUpdated', guessMarker.value)
            
        })

        const addLine = (line: lineString) => {
            if (line !== null) {
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
        }

        const removeLine = () => {
            if (map.value.getLayer('line')) {
                map.value.removeLayer('line')
            }

            if (map.value.getSource('guessLine')) {
                map.value.removeSource('guessLine')
            }
        }

        const zoomToSlagelse = () => {
            map.value.flyTo({
                center: [11.295584 ,55.341815],
                zoom: 10
            })
        }

        watch(() => props.guessLinestring, (newValue) => {
            addLine(newValue);
            if (newValue !== null) {
                addCurrentLocationMarker([props.currentLocation.geometry.coordinates[0], props.currentLocation.geometry.coordinates[1]]);
            }
        })

        watch(() => props.locationIndex, () => {
            removeLine();

            guessMarker.value.remove();
            currentLocationMarker.value?.remove();
            
            zoomToSlagelse();
        })

        watch(() => props.finished, () => {
            removeLine();

            guessMarker.value.remove();
            currentLocationMarker.value?.remove();
            
            zoomToSlagelse();
        })

        return {
            map,
            guessMarker,
            currentLocationMarker
        }
    },
})
</script>