<template>
  <Kort />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Kort from '@/components/Kort.vue'

export default defineComponent({
  name: 'App',
  components: {
    Kort
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