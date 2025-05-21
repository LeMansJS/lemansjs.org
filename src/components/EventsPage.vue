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

const events = ref<EventMeta[]>([])
const loading = ref(true)
const groupedEvents = ref<Record<string, EventMeta[]>>({})

const loadEvents = async () => {
  try {
    const index = await fetch('/events/index.json').then(res => res.json())
    const allEvents: EventMeta[] = []
    for (const slug of index) {
      const data = await fetch(`/events/${slug}.json`).then(res => res.json())
      if (data?.date) allEvents.push(data)
    }
    events.value = allEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    // Regrouper par année
    groupedEvents.value = events.value.reduce((acc, event) => {
      const year = new Date(event.date).getFullYear().toString()
      if (!acc[year]) acc[year] = []
      acc[year].push(event)
      return acc
    }, {} as Record<string, EventMeta[]>)
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
  <div>
    <header class="page-hero">
      <h1>Événements précédents</h1>
    </header>
    <div class="events-page">
      <div v-if="loading" class="event-loading">Chargement…</div>
      <div v-else>
        <div v-for="year in Object.keys(groupedEvents).sort((a,b) => b.localeCompare(a))" :key="year" class="event-year-group">
          <h2>{{ year }}</h2>
          <div class="event-list">
            <div v-for="event in groupedEvents[year]" :key="event.id" class="event-card">
              <h3>{{ event.title }}</h3>
              <p class="event-date">📅 {{ new Date(event.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</p>
              <p class="event-location">📍 {{ event.location?.name }}</p>
              <p class="event-summary" v-if="event.summary">{{ event.summary }}</p>
              <a v-if="event.meetup" :href="event.meetup" class="btn btn-primary" target="_blank" rel="noopener">Voir la page Meetup</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.page-hero {
  background: var(--gradient-blue);
  color: #fff;
  padding: 140px 0 2.5em 0;
  text-align: center;
}
.page-hero h1 {
  font-size: 2.5em;
  font-family: 'Nohemi', system-ui, Arial, sans-serif;
  font-weight: 700;
  margin: 0 0 1em 0;
  color: #fff;
}
.events-page {
  max-width: 900px;
  margin: 2.5em auto 2em auto;
  padding: 0 1.5em;
  background: none;
  border-radius: 0;
  box-shadow: none;
}
.event-year-group {
  margin-bottom: 2.5em;
}
.event-year-group h2 {
  display: inline-block;
  font-size: 2em;
  font-family: 'Nohemi', system-ui, Arial, sans-serif;
  font-weight: 700;
  color: var(--color-blue-dark);
  margin-bottom: 1em;
  border-bottom: 4px solid #FFD253;
  padding-bottom: 0.2em;
}
.event-list {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
}
.event-card {
  background: #f7f8fa;
  border-radius: 12px;
  box-shadow: 0 2px 8px #0e6ecc11;
  padding: 1.2em 1.5em;
  width: 100%;
}
.event-card h3 {
  margin-bottom: 0.3em;
  font-size: 1.2em;
  color: var(--color-blue-dark);
}
.event-date, .event-location {
  font-size: 0.95em;
  color: #666;
  margin: 0;
}
.event-summary {
  font-size: 1.05em;
  color: #333;
  line-height: 1.6;
}
.event-loading {
  text-align: center;
  font-style: italic;
  color: #888;
}
</style> 