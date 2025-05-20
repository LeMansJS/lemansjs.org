<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps<{
  title: string
  video: string
}>()

// Fonction pour extraire l'ID de la vidéo YouTube
function getYoutubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/)
  return match ? match[1] : null
}
const videoId = getYoutubeId(props.video)
</script>

<template>
  <div class="replay-card">
    <img v-if="videoId" :src="`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`" :alt="title" class="replay-thumb" />
    <div class="replay-info">
      <h3>{{ title }}</h3>
      <a :href="video" class="btn btn-secondary" target="_blank">Voir le replay</a>
    </div>
  </div>
</template>

<style scoped>
.replay-card {
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 2px 12px #0e6ecc11;
  overflow: hidden;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.replay-thumb {
  width: 100%;
  height: 180px;
  object-fit: cover;
}
.replay-info {
  padding: 1.2em;
  text-align: left;
}
</style> 