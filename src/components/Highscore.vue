<template>
    <div v-if="highscores.length > 0" id="highscore" class="mt-3">
        <h1 class="text-center">Scoreboard!</h1>
        <table>
            <tr class="text-xl font-bold text-red-800">
                <th>Placering</th>
                <th>Navn</th>
                <th>Km forkert</th>
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
