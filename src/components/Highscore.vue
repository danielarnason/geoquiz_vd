<template>
    <div class="flex space-x-4">
        <div v-if="highscoresFastfood.length > 0" id="highscore" class="mt-10 p-5 rounded-xl bg-gray-800 bg-opacity-50">
            <h1 class="text-center text-3xl text-red-400 font-bold mb-5">Top 10 - Fastfood!</h1>
            <table>
                <tr class=" text-center font-bold border-b border-yellow-100">
                    <th class="px-3">Placering</th>
                    <th class="px-3">Navn</th>
                    <th class="px-3">Km forkert</th>
                </tr>
                <tr class="text-center" v-for="(highscore, idx) in topTenFastfood" :key="highscore.id">
                    <td>{{ idx + 1 }}.</td>
                    <td>{{ highscore.name }}</td>
                    <td>{{ Math.round(highscore.score * 10) / 10 }}</td>
                </tr>
            </table>
        </div>
        <div v-if="highscoresFortidsminder.length > 0" id="highscore" class="mt-10 p-5 rounded-xl bg-gray-800 bg-opacity-50">
            <h1 class="text-center text-3xl text-red-400 font-bold mb-5">Top 10 - Fortidsminder</h1>
            <table>
                <tr class=" text-center font-bold border-b border-yellow-100">
                    <th class="px-3">Placering</th>
                    <th class="px-3">Navn</th>
                    <th class="px-3">Km forkert</th>
                </tr>
                <tr class="text-center" v-for="(highscore, idx) in topTenFortidsminder" :key="highscore.id">
                    <td>{{ idx + 1 }}.</td>
                    <td>{{ highscore.name }}</td>
                    <td>{{ Math.round(highscore.score * 10) / 10 }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { Highscore } from "@/highscoreInterface";
import { supabase } from "@/supabase";

export default defineComponent({
    setup() {
        const highscoresFastfood = ref<Highscore[]>([]);
        const topTenFastfood = computed(() => {
            return highscoresFastfood.value.slice(0, 10)
        })
        const highscoresFortidsminder = ref<Highscore[]>([]);
        const topTenFortidsminder = computed(() => {
            return highscoresFortidsminder.value.slice(0, 10)
        })
        
        onMounted( async () => {
            const fastfoodResponse = await supabase
                .from<Highscore>('highscore')
                .select('*')
                .order('score')
            highscoresFastfood.value = fastfoodResponse.data

            const fortidsminderResponse = await supabase
                .from<Highscore>('highscore_fortidsminder')
                .select('*')
                .order('score')
            highscoresFortidsminder.value = fortidsminderResponse.data

        })

        return {
            highscoresFastfood,
            topTenFastfood,
            highscoresFortidsminder,
            topTenFortidsminder
        }
    },
})
</script>
