<template>
  <Question @guessUpdate="handleGuess" :curLocation="currentLocation" :locationIndex="locIndex" v-if="showStart == false" />
  <Start @showStart="updateStart" v-if="showStart" />
  <Kort @guessUpdated="updateGuess" :currentLocation="currentLocation" :locations="locations" :locationIndex="locIndex" :guessLinestring="guessLinestring"/>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Kort from '@/components/Kort.vue'
import Start from '@/components/Start.vue'
import { fastfood } from '@/assets/fastfood'
import { fastfoodFeature } from '@/interfaces'
import { lineString } from "@/linestringInterface";
import Question from '@/components/Question.vue'
import { Marker } from 'maplibre-gl';
import distance from "@turf/distance";

export default defineComponent({
  name: 'App',
  components: {
    Kort,
    Start,
    Question
  },
  setup() {
    const showStart = ref<boolean>(true);
    const locations = ref<fastfoodFeature[]>([]);
    const locIndex = ref<number>(0);
    const guess = ref<Marker | any>()
    const guessDistance = ref<number>();
    const guessLinestring = ref<lineString>()
    const currentLocation = computed(() => {
      return locations.value[locIndex.value]
    })


    const updateStart = (state: boolean) => {
      console.log('Nu vil start page ikke vises længere!');
      showStart.value = state
      locations.value = getRandomLocations(fastfood.features, 10)
    }

    const updateIndex = () => {
      locIndex.value++
    }

    const updateGuess = (guessMarker: Marker) => {
      guess.value = guessMarker;
      console.log([currentLocation.value.geometry.coordinates[1], currentLocation.value.geometry.coordinates[0]]);
      
      // guessDistance.value = getDistance([guess.value.getLngLat().lng, guess.value.getLngLat().lat], [currentLocation.value.geometry.coordinates[1], currentLocation.value.geometry.coordinates[0]])
    }

    const createLine = (p1: [number, number], p2: [number, number]) => {
      return {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [p1, p2]
        }
      }
    }

    const getDistance = (p1: [number, number], p2: [number, number]) => {
      return distance(p1, p2)
    }

    const handleGuess = () => {
      guessLinestring.value = createLine([currentLocation.value.geometry.coordinates[0], currentLocation.value.geometry.coordinates[0]], [guess.value?.getLngLat().lng, guess.value?.getLngLat().lat]);
    }

    
    const getRandomLocations = (features: fastfoodFeature[], n: number) => {
        const result = new Array(n);
        let len = features.length;
        const taken = new Array(len);

        if (n > len) {
            throw new RangeError("getRandomLocation: more elements taken than available")
        } 
        while (n--) {
            const x = Math.floor(Math.random() * len);
            result[n] = features[x in taken ? taken[x] : x];
            taken[x] = --len in taken ? taken[len] : len;
        }
        return result;
    }

    return {
      showStart,
      updateStart,
      locations,
      locIndex,
      updateIndex,
      currentLocation,
      updateGuess,
      guess,
      handleGuess,
      guessLinestring
    }
  }
});
</script>

<style>
html, body {
  height: 100%;
  width: 100%;
  margin: 0;
}
</style>