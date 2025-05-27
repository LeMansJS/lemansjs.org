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

// Fonction pour ouvrir la vidéo
function openVideo() {
  window.open(props.video, '_blank')
}

const videoId = getYoutubeId(props.video)
</script>

<template>
  <button class="replay-card" @click="openVideo" type="button" :aria-label="`Voir le replay: ${title}`">
    <img v-if="videoId" :src="`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`" :alt="title" class="replay-thumb" />
    <div class="replay-overlay">
      <div class="play-button">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 5V19L19 12L8 5Z" fill="currentColor"/>
        </svg>
      </div>
    </div>
    <div class="replay-info">
      <h3>{{ title }}</h3>
      <span class="replay-cta">Cliquer pour voir le replay</span>
    </div>
  </button>
</template>

<style scoped>
.replay-card {
  background: linear-gradient(145deg, #ffffff 0%, #fafbfc 100%);
  border: 1px solid rgba(14, 110, 204, 0.08);
  border-radius: 20px;
  box-shadow: 
    0 4px 20px rgba(14, 110, 204, 0.08),
    0 1px 3px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  width: 340px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 0 auto;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  padding: 0;
  font-family: inherit;
  text-align: inherit;
  backdrop-filter: blur(10px);
  animation: fadeInUp 0.6s ease-out;
  will-change: transform, box-shadow;
}

.replay-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 
    0 20px 40px rgba(14, 110, 204, 0.15),
    0 8px 16px rgba(0, 0, 0, 0.1);
  border-color: rgba(14, 110, 204, 0.2);
}

.replay-card:focus {
  outline: 3px solid #FFD253;
  outline-offset: 3px;
  transform: translateY(-4px);
}

.replay-card:active {
  transform: translateY(-8px) scale(0.98);
  transition: all 0.15s ease;
}

.replay-thumb {
  width: 100%;
  height: 190px;
  object-fit: cover;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  filter: brightness(1) contrast(1.05) saturate(1.1);
  will-change: transform, filter;
}

.replay-card:hover .replay-thumb {
  transform: scale(1.08);
  filter: brightness(1.1) contrast(1.1) saturate(1.2);
}

.replay-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 190px;
  background: linear-gradient(
    135deg, 
    rgba(16, 34, 168, 0.4) 0%, 
    rgba(14, 110, 204, 0.3) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  backdrop-filter: blur(2px);
}

.replay-card:hover .replay-overlay {
  opacity: 1;
}

.play-button {
  width: 70px;
  height: 70px;
  background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0E6ECC;
  transform: scale(0.7) rotate(-10deg);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 
    0 8px 25px rgba(14, 110, 204, 0.3),
    0 3px 10px rgba(0, 0, 0, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.8);
  will-change: transform, box-shadow;
}

.replay-card:hover .play-button {
  transform: scale(1) rotate(0deg);
  box-shadow: 
    0 12px 35px rgba(14, 110, 204, 0.4),
    0 5px 15px rgba(0, 0, 0, 0.15);
}

.play-button svg {
  margin-left: 3px;
  width: 28px;
  height: 28px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.replay-info {
  padding: 1.5em 1.4em 1.4em 1.4em;
  text-align: left;
  background: linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.5) 100%);
}

.replay-info h3 {
  margin: 0 0 0.8em 0;
  font-size: 1.25em;
  font-weight: 700;
  line-height: 1.3;
  color: #1a2332;
  transition: all 0.3s ease;
  font-family: 'Nohemi', system-ui, Arial, sans-serif;
}

.replay-card:hover .replay-info h3 {
  color: #0E6ECC;
  transform: translateY(-1px);
}

.replay-cta {
  color: #64748b;
  font-size: 0.95em;
  font-weight: 500;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5em;
  opacity: 0.8;
}

.replay-cta::before {
  content: "▶";
  font-size: 0.8em;
  transition: transform 0.3s ease;
}

.replay-card:hover .replay-cta {
  color: #0E6ECC;
  opacity: 1;
  transform: translateX(2px);
}

.replay-card:hover .replay-cta::before {
  transform: translateX(3px);
}

/* Badge durée (optionnel pour plus tard) */
.duration-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.3em 0.6em;
  border-radius: 6px;
  font-size: 0.8em;
  font-weight: 600;
  backdrop-filter: blur(10px);
}

@media (max-width: 700px) {
  .replay-card {
    width: 95vw;
    min-width: 0;
    max-width: 380px;
    border-radius: 16px;
  }
  
  .replay-thumb {
    height: 160px;
  }
  
  .replay-overlay {
    height: 160px;
  }
  
  .replay-info {
    padding: 1.2em 1em 1em 1em;
  }
  
  .replay-info h3 {
    font-size: 1.1em;
  }
  
  .play-button {
    width: 60px;
    height: 60px;
  }
  
  .play-button svg {
    width: 24px;
    height: 24px;
  }
  
  .replay-card:hover {
    transform: translateY(-8px) scale(1.01);
  }
}

@media (max-width: 480px) {
  .replay-card {
    width: 92vw;
    max-width: 340px;
  }
  
  .replay-info h3 {
    font-size: 1.05em;
    line-height: 1.25;
  }
  
  .replay-cta {
    font-size: 0.9em;
  }
}

/* Animation d'apparition */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 