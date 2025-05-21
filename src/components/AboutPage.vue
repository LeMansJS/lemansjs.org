<template>
  <div>
    <header class="page-hero">
      <h1>À propos</h1>
    </header>
    <div class="about-page">
      <h2>Qu'est-ce que LeMansJS&nbsp;?</h2>
      <p>
        LeMansJS est une communauté de passionné·e·s de JavaScript et de technologies web, basée au Mans et en Sarthe. Elle a pour vocation de rassembler les développeur·euse·s, étudiant·e·s, professionnel·le·s du numérique et curieux·ses autour de moments conviviaux, pour échanger, apprendre et partager autour du développement web 🚀
      </p>
      <p>
        Les rencontres sont gratuites, ouvertes à toutes et tous, quel que soit le niveau. Elles peuvent prendre différentes formes : présentations, ateliers, démonstrations en direct ou discussions informelles, avec toujours l'envie de créer du lien dans un cadre bienveillant.
      </p>
      <p>
        Ces événements sont rendus possibles grâce au soutien de partenaires locaux qui nous accompagnent dans l'accueil et l'organisation.
      </p>

      <h2 class="orga-title">Les orgas</h2>
      <div class="orga-gallery">
        <div class="orga-profile">
          <img src="/orga/ugo.jpeg" alt="Ugo Roserat" class="orga-avatar" />
          <div class="orga-name">Ugo Roserat</div>
          <div class="orga-links">
            <a href="https://www.instagram.com/roserat_ugo/" target="_blank" aria-label="Instagram">
              <font-awesome-icon :icon="['fab', 'instagram']" />
            </a>
            <a href="https://www.linkedin.com/in/ugo-roserat/" target="_blank" aria-label="LinkedIn">
              <font-awesome-icon :icon="['fab', 'linkedin']" />
            </a>
          </div>
        </div>
      </div>

      <h2>Pour qui&nbsp;?</h2>
      <p>
        Que tu sois débutant·e, en reconversion, étudiant·e, développeur·euse confirmé·e ou expert·e, tu es le·la bienvenu·e.<br>
        La communauté est ouverte à toutes et tous, dans un esprit de partage et d'entraide.
      </p>
      <p>
        Écoles, entreprises ou collectifs souhaitant s'impliquer ou soutenir l'initiative peuvent également nous contacter.
      </p>

      <h2>Comment participer&nbsp;?</h2>
      <ul>
        <li>Inscris-toi à notre groupe <a href="https://www.meetup.com/fr-FR/lemansjs/" target="_blank">Meetup</a></li>
        <li>Viens échanger lors d'un prochain rendez-vous</li>
        <li>Propose une intervention, un sujet ou une idée</li>
        <li>Parle de LeMansJS autour de toi</li>
        <li>Contacte-nous pour rejoindre l'organisation : <a href="mailto:contact@lemansjs.org">contact@lemansjs.org</a></li>
      </ul>
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
.about-page {
  max-width: 900px;
  margin: 2.5em auto 2em auto;
  padding: 0 1.5em;
  background: none;
  border-radius: 0;
  box-shadow: none;
  text-align: left;
}
.about-page h2 {
  color: var(--color-blue-dark);
  font-family: 'Nohemi', system-ui, Arial, sans-serif;
  font-size: 1.3em;
  font-weight: 700;
  margin-top: 2em;
  margin-bottom: 1em;
  display: inline-block;
  border-bottom: 4px solid #FFD253;
  padding-bottom: 0.2em;
}
.orga-title {
  font-size: 2em;
  margin-top: 2.5em;
  margin-bottom: 1.5em;
  border-bottom: 4px solid #FFD253;
  padding-bottom: 0.2em;
  color: var(--color-blue-dark);
  font-family: 'Nohemi', system-ui, Arial, sans-serif;
  font-weight: 700;
  display: inline-block;
}
.orga-gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 3em;
  justify-content: center;
  margin-bottom: 2em;
}
.orga-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 180px;
}
.orga-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #FFD253;
  margin-bottom: 1em;
}
.orga-name {
  font-weight: 700;
  color: var(--color-blue-dark);
  font-size: 1.2em;
  margin-bottom: 0.7em;
  text-align: center;
}
.orga-links {
  display: flex;
  gap: 1em;
  justify-content: center;
}
.orga-links :deep(svg) {
  width: 28px;
  height: 28px;
  color: #222;
  opacity: 0.7;
  transition: opacity 0.2s, color 0.2s;
}
.orga-links a:hover :deep(svg) {
  opacity: 1;
  color: var(--color-blue-dark);
}
.about-page ul {
  margin: 1em 0 1.5em 1.5em;
  padding: 0;
  list-style: disc inside;
}
.about-page li {
  margin-bottom: 0.5em;
  font-size: 1.05em;
}
@media (max-width: 900px) {
  .about-page { max-width: 98vw; padding: 0 0.5em; }
  .orga-gallery { gap: 1.5em; }
}
@media (max-width: 700px) {
  .about-page { padding: 0 0.2em; }
  .orga-profile { width: 100%; max-width: 220px; }
  .orga-avatar { width: 80px; height: 80px; }
  .orga-title, .about-page h2 { font-size: 1.1em; }
  .orga-gallery { flex-direction: column; gap: 1em; }
}
</style> 