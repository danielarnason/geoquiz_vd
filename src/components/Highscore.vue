<template>
    <div v-if="highscores.length > 0" id="highscore" class="mt-10 p-5 rounded-xl bg-gray-800 bg-opacity-50">
        <h1 class="text-center text-3xl text-red-400 font-bold">Scoreboard!</h1>
        <table>
            <tr class=" text-center font-bold border-b border-yellow-100">
                <th class="px-3">Placering</th>
                <th class="px-3">Navn</th>
                <th class="px-3">Km forkert</th>
            </tr>
            <tr class="text-center" v-for="(highscore, idx) in highscores" :key="highscore.id">
                <td>{{ idx + 1 }}.</td>
                <td>{{ highscore.name }}</td>
                <td>{{ Math.round(highscore.score * 10) / 10 }}</td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { Highscore } from "@/highscoreInterface";
import { supabase } from "@/supabase";

export default defineComponent({
    setup() {
        const highscores = ref<Highscore[]>([]);
        
        onMounted( async () => {
            const response = await supabase
                .from<Highscore>('highscore')
                .select('*')
                .order('score')

            highscores.value = response.data
        })

        return {
            highscores
        }
    },
})
</script>
