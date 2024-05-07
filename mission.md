<h1>Exrecice a pusher avant 18/05/2024<h1>
<h2>Architecture</h2>
<p>Le jeu doit être structuré en plusieurs fichiers :</p>
<ul>
  <li>nomdujeu.html : la page d'accueil du jeu avec ses différents niveaux 3 minimum</li>
  <li>nomdujeu.js : le code JavaScript du jeu</li>
  <li>nomdujeu.css : le code CSS du jeu</li>
  <li>images/nomdujeu/ : le dossier contenant les images du jeu</li>
  <p>Chaque jeu dois offrir une recompense qui se fera sous forme d'image unique representant personnage avec le même style que le jeu actuelle. Cette image doit être placée dans le dossier images/recompense/
    A la fin du jeu le joueur sera redirigé vers la page "index.html" qui affichera toutes les recompenses gagnées.
    Pour cela il faudra inscrire dans le JSON du joueur les recompenses gagnées. le Json est déja mise en pace et se trouve dans le dossier data/</p>
  </p>
  <h3>Gain perte</p>
  voir fonction dans fichier math1 :
  <li>si je joueur gagne il dois revenir à la page index avec un nouveau comagnon</li>
            const rewards = JSON.parse(localStorage.getItem('rewards')) || { recompense: [] };
            rewards.recompense.push(`nomcompangion.png`);
  <li>si le joueur perd il dois perdre le compagnon avec lequel il joue</li>
            rewards.recompense.pop(); // Supprimer la dernière récompense
            localStorage.setItem('rewards', JSON.stringify(rewards));
  <li>En cous de partis tout echecs dois faire perdre le la vie a son compagnon et toute victoire dois faire perdre au compagnons a gangé</li>

  <p>Sera pris en compte pour la notation du rendu </p>
  <li>La quantité de travail accompli</li>
  <li>L'intérét du jeu et sa jouabilité</li>
  <li>La qualité graphique général</li>
  <li>La logique des noms de valiable et des element dans le code</li>
  <li>La propreté du code et son architecture</li>
  <li>La présence de bugs</li>





<h3>bilbli</h3>
<h4>Son</h4>
<a href="https://pixabay.com/fr/music/search/genre/jeux%20vid%C3%A9o/" rel="stylesheet">Pixabay</a>