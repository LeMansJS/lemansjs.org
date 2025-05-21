<template>
  <footer class="footer">
    <div class="footer-content">
      <div>
        <img src="/logo.png" alt="LeMansJS logo" class="footer-logo" />
      </div>
      <div class="footer-links">
        <a href="https://www.meetup.com/fr-FR/lemansjs/" target="_blank">Meetup</a>
        <a href="#">Twitter</a>
        <a href="mailto:contact@lemansjs.org">Contact</a>
      </div>
      <div class="footer-copy">
        © 2025 LeMansJS. Inspiré par <a href="https://strasbourgjs.org" target="_blank">StrasbourgJS</a> & <a href="https://lyonjs.org" target="_blank">LyonJS</a>.
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--gradient-blue);
  color: #fff;
  padding: 2em 0 1em 0;
  text-align: center;
  margin-top: 3em;
}
.footer-content {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.footer-logo {
  height: 40px;
  margin-bottom: 1em;
}
.footer-links {
  margin: 1em 0;
  display: flex;
  gap: 1.2em;
  flex-wrap: wrap;
  justify-content: center;
}
.footer-links a {
  color: #fff;
  text-decoration: underline;
  transition: color 0.2s;
  font-weight: 500;
  font-size: 1.1em;
}
.footer-links a:hover {
  color: #fff;
}
.footer-copy {
  font-size: 0.95em;
  color: #ffe066;
  margin-top: 1em;
}
.footer-copy a {
  color: #ffe066;
  text-decoration: underline;
}
@media (max-width: 700px) {
  .footer-logo {
    height: 28px;
  }
  .footer-links {
    flex-direction: column;
    gap: 0.5em;
    font-size: 1em;
  }
  .footer-copy {
    font-size: 0.9em;
  }
}
</style> 