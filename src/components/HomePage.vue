<script setup lang="ts">
import EventList from './EventList.vue'
import ReplayCard from './ReplayCard.vue'
import { ref, onMounted, computed } from 'vue'

const replays = ref<{ title: string, video: string }[]>([])
const loadingReplays = ref(true)

onMounted(async () => {
  try {
    const data = await fetch('/replays.json').then(r => r.json())
    replays.value = data
  } catch (e) {
    replays.value = []
    console.error('Erreur lors du chargement des replays', e)
  } finally {
    loadingReplays.value = false
  }
})

const replayRows = computed(() => {
  const rows = []
  for (let i = 0; i < replays.value.length; i += 3) {
    rows.push(replays.value.slice(i, i + 3))
  }
  return rows
})
</script>
<template>
  <div>
    <header class="hero">
      <div class="hero-content-flex">
        <div class="hero-content">
          <img src="/logo.png" alt="LeMansJS logo" class="logo" style="width: 300px; height: auto" />
          <h2>La communauté mancelle</h2>
          <p>autour de JavaScript et de son écosystème</p>
          <div class="actions">
            <a href="https://www.meetup.com/fr-FR/lemansjs/" target="_blank" class="btn btn-primary">Rejoindre le meetup</a>
            <a href="https://github.com/LeMansJS/talks" target="_blank" class="btn btn-secondary">Proposer un talk</a>
          </div>
        </div>
      </div>
    </header>
    <section class="events-section" id="events">
      <h2 class="section-title">Prochain événement</h2>
      <EventList />
      <div class="center-btn">
        <router-link to="/evenements" class="btn btn-light btn-lg">Voir tous les événements</router-link>
      </div>
    </section>
    <section class="replay-section" id="replays">
      <h2 class="section-title">Nos derniers replays</h2>
      <div v-if="loadingReplays" class="event-loading">Chargement…</div>
      <div v-else>
        <div v-if="replays.length === 0" class="event-empty">
          <p><strong>Aucun replay pour le moment.</strong></p>
          <p>Reviens bientôt pour découvrir les prochaines vidéos !</p>
        </div>
        <div v-else>
          <div v-for="(row, idx) in replayRows" :key="'row-' + idx" class="replay-grid" style="margin-top: 1.5em;">
            <ReplayCard v-for="replay in row" :key="replay.video + '-' + idx" :title="replay.title" :video="replay.video" />
          </div>
        </div>
      </div>
    </section>
    <section class="sponsor-section" id="sponsors">
      <h2 class="section-title">Sponsors</h2>
      <div class="sponsor-grid">
        <img src="/sponsors/logo-ekod.svg" alt="EKOD" class="sponsor-logo" />
        <img src="/sponsors/logo-pixel.png" alt="Collectif Pixel" class="sponsor-logo sponsor-logo-pixel" />
      </div>
    </section>
  </div>
</template>
<style scoped>
.hero {
  background: var(--gradient-blue);
  color: #fff;
  min-height: 480px;
  padding-bottom: 2em;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  padding-top: 90px;
}
.hero-content-flex {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 1000px;
  margin: 3em auto 0 auto;
  gap: 2em;
}
.hero-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 700px;
  margin: 3em 8em 3em auto;
  text-align: left;
}
.hero-content h2 {
  font-size: 2em;
  font-family: 'Nohemi', system-ui, Arial, sans-serif;
  font-weight: 600;
  margin-bottom: 0px;
  color: #fff;
}
.hero-content p {
  margin-top: 0px !important;
  color: #FFD253;
  font-size: 1.2em;
  margin-bottom: 2em;
}
.actions {
  margin-bottom: 1em;
  display: flex;
  gap: 1em;
}
.btn {
  display: inline-block;
  padding: 0.85em 2em;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1.05em;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  border: 2px solid transparent;
  line-height: 1.2;
  letter-spacing: 0.3px;
}
.btn-primary {
  background: #0E6ECC;
  color: #fff;
  border-color: #0E6ECC;
}
.btn-primary:hover {
  background: #0c5bb2;
  border-color: #0c5bb2;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(14, 110, 204, 0.3);
}
.btn-secondary {
  background: transparent;
  color: #0E6ECC;
  border: 2px solid #0E6ECC;
  font-weight: 600;
  text-shadow: 0 0 0.5px #0E6ECC;
}
.btn-secondary:hover {
  background: #0E6ECC;
  color: #fff;
  box-shadow: 0 4px 14px rgba(14, 110, 204, 0.2);
  transform: translateY(-1px);
}
.btn-light {
  background: #f9f9f9;
  color: #333;
  border: 2px solid #e5e5e5;
}
.btn-light:hover {
  background: #eaeaea;
  color: #000;
}
.btn-lg {
  font-size: 1.15em;
  padding: 1em 2.7em;
}
@media (max-width: 900px) {
  .hero-content-flex { flex-direction: column; align-items: center; gap: 1em; }
  .hero-content { max-width: 95vw; margin: 2em auto; }
  .sponsor-grid { gap: 1em; }
}
@media (max-width: 700px) {
  .logo { height: 32px; }
  .hero-content h2 { font-size: 1.2em; }
  .hero-content { margin: 1.5em auto; padding: 0 0.5em; }
  .section-title { font-size: 1.3em; }
  .replay-grid { flex-direction: column; gap: 1em; }
  .sponsor-section, .events-section, .replay-section { padding: 1.5em 0 1em 0; }
  .sponsor-logo { height: 38px; max-width: 100px; }
  .sponsor-grid { grid-template-columns: 1fr; gap: 0.7em; }
}
.events-section {
  background: #fff;
  padding: 3em 0 2em 0;
  text-align: center;
}
.section-title {
  font-family: 'Nohemi', system-ui, Arial, sans-serif;
  font-size: 2em;
  font-weight: 700;
  color: var(--color-blue-dark);
  margin-bottom: 1em;
  display: inline-block;
  border-bottom: 4px solid #FFD253;
  padding-bottom: 0.2em;
}
.center-btn {
  margin-top: 2em;
  text-align: center;
}
.replay-section {
  background: #f7f8fa;
  padding: 3em 0 2em 0;
  text-align: center;
}
.replay-grid {
  display: flex;
  gap: 2em;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2em;
}
.sponsor-section {
  background: #fff;
  padding: 3em 0 2em 0;
  text-align: center;
}
.sponsor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, max-content));
  gap: 2em;
  justify-content: center;
  align-items: center;
  margin-top: 2em;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
.sponsor-logo {
  height: 60px;
  width: auto;
  max-width: 160px;
  object-fit: contain;
  margin-bottom: 0.7em;
  display: block;
}
.sponsor-logo-pixel {
  filter: invert(0%) brightness(0) saturate(100%);
}
</style> 