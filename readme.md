<h1> Projet de jeu éducatif </h1>
<p>But de ce projet est de développer en commun un jeu éducatif pour enfant de 4 à 10 ans.
Les jeux éducatifs sont des jeux qui ont pour but d'enseigner des notions aux enfants tout en les amusant.
Le jeu doit être simple, intuitif et surtout AMUSANT. Il doit être adapté à l'âge de l'enfant.
pour l'adaptation chaque petit jeux dois avoir plusieures niveaux de difficulté.
</p>
<h2> Les jeux </h2>
<p>Tout type de jeux sont autoriser tant qu'ils répondre à ses critères :</p>
<ul>
  <li>éducatif</li>
  <li>amusant</li>
  <li>adapté à l'âge de l'enfant</li>
  <li>plusieurs niveaux de difficulté</li>
  <li>simple et intuitif</li>
  <li>rapide (pas plus de 2 minute spar parties)</li>
</ul>
<p>Sont exclu les jeux</p>
<ul>
  <li>adictif</li>
  <li>violent</li>
  <li>sexuel</li>
  <li>politique</li>
  <li>religieux</li>
  <li>discriminatoire</li>
</ul>

<h2> Les technologies </h2>
<p>Le jeu doit être développé en HTML5, CSS3 et JavaScript. Il doit être compatible avec les navigateurs les plus courants (Chrome, Firefox, Safari, Edge, Opera).</p>
<p>Il est possible d'utiliser des librairies JavaScript (jQuery, Phaser, etc.) et par contre minimiser le CSS et pas de bibliotèque CSS</p>


<h2>Architecture</h2>
<p>Le jeu doit être structuré en plusieurs fichiers :</p>
<ul>
  <li>nomdujeu.html : la page d'accueil du jeu avec ses différents niveaux</li>
  <li>nomdujeu.js : le code JavaScript du jeu</li>
  <li>nomdujeu.css : le code CSS du jeu</li>
  <li>images/nomdujeu/ : le dossier contenant les images du jeu</li>
  <p>Chaque jeu dois offrir une recompense qui se fera sous forme d'image. Cette image doit être placée dans le dossier images/recompense/
    A la fin du jeu le joueur sera redirigévers la page index.html qui affichera toutes les recompenses gagnées.
    Pour cela il faudra inscrire dans le JSON du joueur les recompenses gagnées. le Json est déja mise en pace et se trouve dans le dossier data/</p>
  </p>
  <h3>Gain perte</p>
  voir fonction dans fichier math1 :
  <li>si je joueur il dois revenir à la page index avec un nouveau comagnon</li>
            const rewards = JSON.parse(localStorage.getItem('rewards')) || { recompense: [] };
            rewards.recompense.push(`nomcompangion.png`);
  <li>si le joueur perd il dois perdre le compagnon avec lequel il joue</li>
            rewards.recompense.pop(); // Supprimer la dernière récompense
            localStorage.setItem('rewards', JSON.stringify(rewards));




<h3>bilbli</h3>
<h4>Son</h4>
<a href="https://pixabay.com/fr/music/search/genre/jeux%20vid%C3%A9o/" rel="stylesheet">Pixabay</a>