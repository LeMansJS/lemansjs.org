<script setup lang="ts">
import FooterBar from './components/FooterBar.vue'
</script>

<template>
  <div>
    <nav class="navbar">
      <img src="/logo.png" alt="LeMansJS logo" class="logo" />
      <ul class="nav-links">
        <li><router-link to="/">Accueil</router-link></li>
        <li><router-link to="/evenements">Événements</router-link></li>
        <li><router-link to="/a-propos">À propos</router-link></li>
        <li><router-link to="/devenir-sponsor">Devenir sponsor</router-link></li>
        <li><router-link to="/code-de-conduite">Code de conduite</router-link></li>
      </ul>
    </nav>
    <main>
      <router-view />
    </main>
    <FooterBar />
  </div>
</template>

<style scoped>
.navbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 10;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2.2em 0 0.7em 0;
  box-shadow: none;
}
.logo {
  height: 48px;
  width: auto;
  display: block;
  margin-right: 2em;
}
.nav-links {
  list-style: none;
  display: flex;
  gap: 2em;
  margin: 0;
  padding: 0;
}
.nav-links a {
  color: #fff;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1em;
  transition: color 0.2s;
  background: transparent;
  position: relative;
}
.nav-links a::after {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 4px;
  background: #FFD253;
  border-radius: 2px;
  transition: width 0.25s cubic-bezier(.4,0,.2,1);
}
.nav-links a:hover::after {
  width: 100%;
}
.nav-links a.router-link-exact-active::after {
  width: 100%;
}
@media (max-width: 900px) {
  .navbar { width: 100vw; padding: 1em 0 0.5em 0; }
}
@media (max-width: 700px) {
  .logo { height: 32px; }
}
</style>
