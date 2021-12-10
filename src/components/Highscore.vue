<template>
    <div class="flex space-x-4">
        <div v-if="highscoresRastepladser.length > 0" id="highscore" class="mt-10 p-5 rounded-xl bg-gray-800 bg-opacity-50">
            <h1 class="text-center text-3xl text-red-400 font-bold mb-5">Top 10 - Rastepladser!</h1>
            <table class="m-auto">
                <tr class=" text-center font-bold border-b border-yellow-100">
                    <th class="px-3">Placering</th>
                    <th class="px-3">Navn</th>
                    <th class="px-3">Km forkert</th>
                </tr>
                <tr class="text-center" v-for="(highscore, idx) in topTenRastepladser" :key="highscore.id">
                    <td>{{ idx + 1 }}.</td>
                    <td>{{ highscore.name }}</td>
                    <td>{{ Math.round(highscore.score * 10) / 10 }}</td>
                </tr>
            </table>
        </div>
        <div v-if="highscoresLadestandere.length > 0" id="highscore" class="mt-10 p-5 rounded-xl bg-gray-800 bg-opacity-50">
            <h1 class="text-center text-3xl text-red-400 font-bold mb-5">Top 10 - Ladestandere</h1>
            <table class="m-auto">
                <tr class=" text-center font-bold border-b border-yellow-100">
                    <th class="px-3">Placering</th>
                    <th class="px-3">Navn</th>
                    <th class="px-3">Km forkert</th>
                </tr>
                <tr class="text-center" v-for="(highscore, idx) in topTenLadestandere" :key="highscore.id">
                    <td>{{ idx + 1 }}.</td>
                    <td>{{ highscore.name }}</td>
                    <td>{{ Math.round(highscore.score * 10) / 10 }}</td>
                </tr>
            </table>
        </div>
        <div v-if="highscoresE55.length > 0" id="highscore" class="mt-10 p-5 rounded-xl bg-gray-800 bg-opacity-50">
            <h1 class="text-center text-3xl text-red-400 font-bold mb-5">Top 10 - E55</h1>
            <table class="m-auto">
                <tr class=" text-center font-bold border-b border-yellow-100">
                    <th class="px-3">Placering</th>
                    <th class="px-3">Navn</th>
                    <th class="px-3">Km forkert</th>
                </tr>
                <tr class="text-center" v-for="(highscore, idx) in topTenE55" :key="highscore.id">
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
        const highscoresRastepladser = ref<Highscore[]>([]);
        const topTenRastepladser = computed(() => {
            return highscoresRastepladser.value.slice(0, 10)
        })
        const highscoresLadestandere = ref<Highscore[]>([]);
        const topTenLadestandere = computed(() => {
            return highscoresLadestandere.value.slice(0, 10)
        })
        const highscoresE55 = ref<Highscore[]>([]);
        const topTenE55 = computed(() => {
            return highscoresE55.value.slice(0, 10)
        })
        
        onMounted( async () => {
            const rastepladserResponse = await supabase
                .from<Highscore>('highscore_rastepladser')
                .select('*')
                .order('score')
            highscoresRastepladser.value = rastepladserResponse.data

            const ladestandereResponse = await supabase
                .from<Highscore>('highscore_ladestandere')
                .select('*')
                .order('score')
            highscoresLadestandere.value = ladestandereResponse.data

            const e55Response = await supabase
                .from<Highscore>('highscore_e55')
                .select('*')
                .order('score')
            highscoresE55.value = e55Response.data
        })

        return {
            highscoresRastepladser,
            topTenRastepladser,
            highscoresLadestandere,
            topTenLadestandere,
            highscoresE55,
            topTenE55
        }
    },
})
</script>
