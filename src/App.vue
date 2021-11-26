<template>
  <Summary v-if="showSummary" />
  <Question @finishQuiz="finishQuiz" @nextQuestion="nextQuestion" @guessUpdate="handleGuess" :curLocation="currentLocation" :locationIndex="locIndex" v-if="showStart == false" />
  <Start @showStart="updateStart" v-if="showStart" />
  <Kort @guessUpdated="updateGuess" :currentLocation="currentLocation" :locations="locations" :locationIndex="locIndex" :guessLinestring="guessLinestring"/>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Kort from '@/components/Kort.vue'
import Start from '@/components/Start.vue'
import Summary from '@/components/Summary.vue'
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
    Question,
    Summary
  },
  setup() {
    const showStart = ref<boolean>(true);
    const showSummary = ref<boolean>(false);
    const locations = ref<fastfoodFeature[]>([]);
    const locIndex = ref<number>(0);
    const guess = ref<Marker | any>()
    const guessDistance = ref<number>();
    const totalGuessDistance = ref<number>(0);
    const guessLinestring = ref<lineString | any>();
    const currentLocation = computed(() => {
      return locations.value[locIndex.value]
    });

    const numberOfQuestions = 10;


    const updateStart = (state: boolean) => {
      showStart.value = state
      locations.value = getRandomLocations(fastfood.features, numberOfQuestions)
    }

    const nextQuestion = () => {
      locIndex.value++;
      guessLinestring.value = null;
    }

    const finishQuiz = () => {
      showSummary.value = !showSummary.value
    }

    const updateGuess = (guessMarker: Marker) => {
      guess.value = guessMarker;
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
      if (locIndex.value < 10) {
        guessLinestring.value = createLine([currentLocation.value.geometry.coordinates[0], currentLocation.value.geometry.coordinates[1]], [guess.value?.getLngLat().lng, guess.value?.getLngLat().lat]);
        guessDistance.value = getDistance([currentLocation.value.geometry.coordinates[0], currentLocation.value.geometry.coordinates[1]], [guess.value?.getLngLat().lng, guess.value?.getLngLat().lat]);
        totalGuessDistance.value = totalGuessDistance.value + guessDistance.value
      } else {
        showSummary.value = !showSummary.value
      }
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
      nextQuestion,
      currentLocation,
      updateGuess,
      guess,
      handleGuess,
      guessLinestring,
      totalGuessDistance,
      showSummary,
      finishQuiz
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