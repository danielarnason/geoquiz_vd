<template>
  <Question @updateIndex="updateIndex" :curLocation="currentLocation" :locationIndex="locIndex" v-if="showStart == false" />
  <Start @showStart="updateStart" v-if="showStart" />
  <Kort @guessUpdated="updateGuess" :currentLocation="currentLocation" :locations="locations" :locationIndex="locIndex"/>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Kort from '@/components/Kort.vue'
import Start from '@/components/Start.vue'
import { fastfood } from '@/assets/fastfood'
import { fastfoodFeature } from '@/interfaces'
import Question from '@/components/Question.vue'
import { Marker } from 'maplibre-gl';

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
    const guess = ref<Marker>()

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
    }

    const currentLocation = computed(() => {
      return locations.value[locIndex.value]
    })
    
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
      guess
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