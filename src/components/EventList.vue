<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface EventMeta {
  id: number
  title: string
  date: string
  summary?: string
  cover?: string
  location?: {
    name: string
    address?: string
  }
  meetup?: string
  [key: string]: any
}

const upcomingEvent = ref<EventMeta | null>(null)
const loading = ref(true)

const loadEvents = async () => {
  try {
    const index = await fetch('/events/index.json').then(res => res.json())

    const allEvents: EventMeta[] = []

    for (const slug of index) {
      const data = await fetch(`/events/${slug}.json`).then(res => res.json())
      if (data?.date) allEvents.push(data)
    }

    const now = new Date()
    const futureEvents = allEvents
      .filter(e => new Date(e.date) > now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    upcomingEvent.value = futureEvents[0] || null
  } catch (err) {
    console.error('Erreur lors du chargement des événements:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadEvents()
})
</script>

<template>
    <div class="event-container">
        <div v-if="loading" class="event-loading">Chargement…</div>

        <div v-else-if="upcomingEvent" class="event-card">
        <div class="event-header">
            <h3>{{ upcomingEvent.title }}</h3>
            <p class="event-date">
            📅 {{ new Date(upcomingEvent.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}
            </p>
            <p class="event-location">📍 {{ upcomingEvent.location?.name }}</p>
        </div>
        <p class="event-summary" v-if="upcomingEvent.summary">{{ upcomingEvent.summary }}</p>
        <a v-if="upcomingEvent.meetup" :href="upcomingEvent.meetup" class="btn btn-primary" target="_blank" rel="noopener">Voir la page Meetup</a>
        </div>

        <div v-else class="event-empty">
        <p><strong>Pas de prochain LeMansJS de trouvé !</strong></p>
        <p>Reviens dans quelques jours, le prochain évènement ne saurait tarder.</p>
        </div>
    </div>
</template>  

<style scoped>
.event-container {
  max-width: 750px;
  margin: 0 auto;
  padding: 2em 1.5em;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 20px rgba(14, 110, 204, 0.08);
  text-align: left;
}

.event-card {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.event-header h3 {
  margin-bottom: 0.3em;
  font-size: 1.6em;
  color: var(--color-blue-dark);
}

.event-date,
.event-location {
  font-size: 0.95em;
  color: #666;
  margin: 0;
}

.event-summary {
  font-size: 1.05em;
  color: #333;
  line-height: 1.6;
}

.event-empty {
  text-align: center;
  font-size: 1.1em;
  color: #666;
  background: #f8f8f8;
  border-radius: 12px;
  padding: 2em;
}

.event-loading {
  text-align: center;
  font-style: italic;
  color: #888;
}

</style>
