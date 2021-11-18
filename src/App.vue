<template>
  <Question @updateIndex="updateIndex" :locations="locations" :locationIndex="locationIndex" v-if="showStart == false" />
  <Start @showStart="updateStart" v-if="showStart" />
  <Kort :locations="locations" :locationIndex="locationIndex"/>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Kort from '@/components/Kort.vue'
import Start from '@/components/Start.vue'
import Question from '@/components/Question.vue'
import { fastfood } from '@/assets/fastfood'
import { fastfoodFeature } from '@/interfaces'

export default defineComponent({
  name: 'App',
  components: {
    Kort,
    Start,
    Question
  },
  setup() {
    const showStart = ref<boolean>(true);
    const locations = ref<fastfoodFeature[]>();
    const locationIndex = ref<number>(0);

    const updateStart = (state: boolean) => {
      console.log('Nu vil start page ikke vises længere!');
      showStart.value = state
      locations.value = getRandomLocations(fastfood.features, 10)
    }

    const updateIndex = (index: number) => {
      locationIndex.value = index;
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
      locationIndex,
      updateIndex
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