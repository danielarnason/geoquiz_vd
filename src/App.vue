<template>
  <Start v-if="showStart" />
  <Kort />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Kort from '@/components/Kort.vue'
import Start from '@/components/Start.vue'

export default defineComponent({
  name: 'App',
  components: {
    Kort,
    Start
  },
  setup() {
    const showStart = ref<boolean>(true)

    return {
      showStart
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