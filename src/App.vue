<template>
  <Summary @playAgain="playAgain" v-if="showSummary" :guessDistance="totalGuessDistance"/>
  <Question @finishQuiz="finishQuiz" @nextQuestion="nextQuestion" @guessUpdate="handleGuess" :curLocation="currentLocation" :locationIndex="locIndex" v-if="showStart == false" :finished="finished" :guessDistance="guessDistance"/>
  <Start @initialsChange="initialsUpdate" @showStart="updateStart" v-if="showStart" />
  <Kort @guessUpdated="updateGuess" :currentLocation="currentLocation" :locations="locations" :locationIndex="locIndex" :guessLinestring="guessLinestring" :finished="finished" :guessDistance="guessDistance" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import Kort from '@/components/Kort.vue'
import Start from '@/components/Start.vue'
import Summary from '@/components/Summary.vue'
import { rastepladser } from "@/assets/rastepladser";
import { locationFeature } from '@/locationInterface'
import { lineString } from "@/linestringInterface";
import Question from '@/components/Question.vue'
import { Marker } from 'maplibre-gl';
import distance from "@turf/distance";
import { startData } from "@/showStartInterface";
import { supabase } from "@/supabase";
import { Highscore } from "@/highscoreInterface";

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
    const finished = ref<boolean>(false);
    const locations = ref<locationFeature[]>([]);
    const locIndex = ref<number>(0);
    const guess = ref<Marker | any>()
    const guessDistance = ref<number>();
    const totalGuessDistance = ref<number>(0);
    const guessLinestring = ref<lineString | any>();
    const currentLocation = computed(() => {
      return locations.value[locIndex.value]
    });
    const ladestandereLocations = computed(() => {
      return rastepladser.features.filter(rasteplads => rasteplads.properties.description.includes('Ladestation'))
    })
    const playerInitials = ref<string>();
    const category = ref<string>();

    const numberOfQuestions = 10;


    const updateStart = (data: startData) => {
      showStart.value = data.state;
      category.value = data.category;
      if (data.category == 'rastepladser') {
        locations.value = getRandomLocations(rastepladser.features, numberOfQuestions)
      } else if (data.category == 'ladestandere') {
        locations.value = getRandomLocations(ladestandereLocations.value, numberOfQuestions)
        console.log(ladestandereLocations.value);
        
      }
    }

    const playAgain = () => {
      showStart.value = true;
      showSummary.value = false;
      finished.value = false;
      locIndex.value = 0;
      totalGuessDistance.value = 0;
    }

    const nextQuestion = () => {
      locIndex.value++;
      guessLinestring.value = null;
      guessDistance.value = 0;
    }
    
    const insertHighscore = async () => {
      if (category.value == 'rastepladser') {
        await supabase.from<Highscore>('highscore_rastepladser').insert({name: playerInitials.value, score: totalGuessDistance.value})
      } else if (category.value == 'ladestandere') {
        await supabase.from<Highscore>('highscore_ladestandere').insert({name: playerInitials.value, score:totalGuessDistance.value})
      }
    }

    const finishQuiz = () => {
      showSummary.value = !showSummary.value
      finished.value = true
      guessDistance.value = 0
      insertHighscore();
    }

    const updateGuess = (guessMarker: Marker) => {
      guess.value = guessMarker;
    }

    const initialsUpdate = (initials: string) =>  {
      playerInitials.value = initials;
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
      guessLinestring.value = createLine([currentLocation.value.geometry.coordinates[0], currentLocation.value.geometry.coordinates[1]], [guess.value?.getLngLat().lng, guess.value?.getLngLat().lat]);
      guessDistance.value = getDistance([currentLocation.value.geometry.coordinates[0], currentLocation.value.geometry.coordinates[1]], [guess.value?.getLngLat().lng, guess.value?.getLngLat().lat]);
      totalGuessDistance.value = totalGuessDistance.value + guessDistance.value
    } 

    
    const getRandomLocations = (features: locationFeature[], n: number) => {
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
      guessDistance,
      totalGuessDistance,
      showSummary,
      finishQuiz,
      finished,
      playAgain,
      initialsUpdate,
      playerInitials,
      ladestandereLocations
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