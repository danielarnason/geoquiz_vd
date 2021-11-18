<template>
    <div id="mapcontainer"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import maplibregl, { Map } from 'maplibre-gl'

export default defineComponent({
    setup() {

        const map = ref<Map>();

        const getRandomLocations = (features: [], n: number) => {
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

        onMounted(() => {
            map.value = new maplibregl.Map({
                container: 'mapcontainer',
                style: 'mapbox://styles/mapbox/light-v10',
                center: [11.295584 ,55.341815],
                zoom: 10,
                accessToken: 'pk.eyJ1IjoiZGFuaWVsLWFybmFzb24iLCJhIjoiY2pyOHo2OXp3MGI2MDQ5dm1nMzZ0NjJycCJ9.ESsG_fdvITuPsMUbUevoGQ',
            })
            // map.value.addControl(new maplibregl.NavigationControl(), 'top-left');
        })

        return {
            map
        }
    },
})
</script>


<style scoped>
#mapcontainer {
    height: 100%;
    width: 100%;
    position: absolute;
}
</style>