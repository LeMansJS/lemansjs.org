<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import FooterBar from './components/FooterBar.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
const menuOpen = ref(false)
const isMobile = ref(false)
function checkMobile() {
  isMobile.value = window.innerWidth < 900
  if (!isMobile.value) menuOpen.value = false
}
function openMenu() {
  menuOpen.value = true
  nextTick(() => {
    const drawer = document.querySelector('.drawer') as HTMLElement | null
    if (drawer) drawer.focus()
  })
}
function closeMenu() {
  menuOpen.value = false
}
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
  window.addEventListener('keydown', (e) => {
    if (menuOpen.value && e.key === 'Escape') closeMenu()
  })
})
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<template>
  <div>
    <nav class="navbar">
      <img src="/logo.png" alt="LeMansJS logo" class="logo" />
      <button class="burger" @click="openMenu" :aria-expanded="menuOpen" aria-label="Ouvrir le menu" v-if="isMobile">
        <font-awesome-icon :icon="faBars" class="burger-icon" />
      </button>
      <ul class="nav-links" v-if="!isMobile">
        <li><router-link to="/">Accueil</router-link></li>
        <li><router-link to="/evenements">Événements</router-link></li>
        <li><router-link to="/a-propos">À propos</router-link></li>
        <li><router-link to="/devenir-sponsor">Devenir sponsor</router-link></li>
        <li><router-link to="/code-de-conduite">Code de conduite</router-link></li>
      </ul>
    </nav>
    <div v-if="isMobile && menuOpen" class="drawer-overlay" @click="closeMenu" tabindex="-1"></div>
    <aside v-if="isMobile" class="drawer" :class="{ open: menuOpen }" tabindex="-1" aria-modal="true" role="dialog">
      <nav class="drawer-menu">
        <button class="drawer-close" @click="closeMenu" aria-label="Fermer le menu">&times;</button>
        <ul>
          <li><router-link to="/" @click.native="closeMenu">Accueil</router-link></li>
          <li><router-link to="/evenements" @click.native="closeMenu">Événements</router-link></li>
          <li><router-link to="/a-propos" @click.native="closeMenu">À propos</router-link></li>
          <li><router-link to="/devenir-sponsor" @click.native="closeMenu">Devenir sponsor</router-link></li>
          <li><router-link to="/code-de-conduite" @click.native="closeMenu">Code de conduite</router-link></li>
        </ul>
      </nav>
    </aside>
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
.burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;
  margin-left: auto;
  margin-right: 1em;
  z-index: 20;
}
.burger-icon {
  font-size: 2em;
  color: #fff;
  width: 28px;
  height: 28px;
  display: block;
}
@media (max-width: 900px) {
  .navbar {
    width: 100vw;
    padding: 1em 0 0.5em 0;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    height: 32px;
    margin-right: 0;
    margin-left: 1em;
  }
  .burger {
    display: flex;
    z-index: 100;
    margin-left: 0;
    margin-right: 1em;
  }
  .nav-links {
    display: none !important;
  }
}
@media (min-width: 900px) {
  .burger {
    display: none !important;
  }
  .nav-links {
    display: flex !important;
  }
  .burger-icon {
    color: #fff;
  }
}
@media (max-width: 700px) {
  .logo { height: 32px; }
}
.drawer-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(20,30,60,0.45);
  z-index: 30;
}
.drawer {
  position: fixed;
  top: 0; right: 0;
  width: 80vw;
  max-width: 320px;
  height: 100vh;
  background: var(--gradient-blue);
  color: #fff;
  z-index: 40;
  transform: translateX(100%);
  transition: transform 0.3s cubic-bezier(.4,0,.2,1);
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.drawer.open {
  transform: translateX(0);
}
.drawer-menu {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.drawer-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}
.drawer-menu li {
  margin: 1.5em 0;
  text-align: center;
}
.drawer-menu a {
  color: #fff;
  font-size: 1.2em;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}
.drawer-menu a:hover {
  color: #FFD253;
}
.drawer-close {
  position: absolute;
  top: 1em;
  right: 1em;
  background: none;
  border: none;
  color: #fff;
  font-size: 2em;
  cursor: pointer;
  z-index: 50;
}
.burger:focus {
  outline: 2px solid #FFD253;
  outline-offset: 2px;
}
</style>
