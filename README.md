# ☢ Atomic Bomb by JLV

**Site web éducatif, scientifique et immersif sur l'histoire, la science et les effets de la bombe atomique.**

## Présentation

Ce projet est un site web interactif haut de gamme, entièrement en français, consacré à la compréhension du phénomène nucléaire sous ses aspects historiques, scientifiques, géopolitiques et visuels.

Il comprend une **simulation 3D immersive** d'une explosion nucléaire stylisée, des **visualisations de données interactives**, une **frise chronologique**, un **glossaire complet** et des sections pédagogiques détaillées.

> **Avertissement :** Ce site a une vocation strictement éducative et documentaire. Il ne contient aucune information opérationnelle ou exploitable à des fins de fabrication d'armes.

## Objectif pédagogique

- Comprendre l'histoire de l'ère nucléaire, du début du XXe siècle à nos jours
- Appréhender les bases de la physique nucléaire (fission, fusion, rayonnements)
- Visualiser les effets d'une explosion nucléaire de manière pédagogique
- Analyser les enjeux géopolitiques de la dissuasion nucléaire
- Sensibiliser aux dimensions éthiques et humanitaires

## Structure des fichiers

```
├── index.html      # Structure HTML complète du site
├── style.css       # Styles CSS (design, responsive, animations)
├── script.js       # JavaScript (simulation 3D, graphiques, interactions)
├── logo_JLV.jpg    # Logo JLV (à placer dans le dossier racine)
└── README.md       # Documentation du projet
```

## Technologies utilisées

| Technologie | Usage | Source |
|---|---|---|
| **HTML5 / CSS3** | Structure et design | Natif |
| **JavaScript ES6+** | Interactions et logique | Natif |
| **Three.js r128** | Simulation 3D WebGL | CDN |
| **Chart.js 4.4** | Graphiques et data viz | CDN |
| **Google Fonts** | Typographies (Inter, JetBrains Mono) | CDN |

Aucune dépendance back-end. Site 100 % front-end.

## Installation

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/votre-utilisateur/atomic-bomb-jlv.git
   cd atomic-bomb-jlv
   ```

2. **Ouvrir dans un navigateur :**
   - Double-cliquez sur `index.html`, ou
   - Utilisez un serveur local pour de meilleures performances :
     ```bash
     # Avec Python
     python -m http.server 8000

     # Avec Node.js
     npx serve .

     # Avec VS Code
     # Installer l'extension "Live Server" et cliquer sur "Go Live"
     ```

3. **Accéder au site :** Ouvrir `http://localhost:8000` dans votre navigateur.

## Mode d'emploi

### Navigation
- Le menu sticky en haut permet d'accéder à toutes les sections
- La navigation est fluide par ancres avec scroll animé
- Le site est responsive : desktop, tablette et mobile

### Simulation 3D
1. Naviguer vers la section **Simulation 3D**
2. Ajuster les paramètres dans le panneau latéral :
   - **Puissance** : curseur de 1 à 100 kt
   - **Altitude** : surface, aérienne ou haute altitude
   - **Vitesse** : contrôle de la vitesse d'animation
   - **Couches** : activer/désactiver boule de feu, onde de choc, chaleur, rayonnement, retombées
   - **Mode nuit** : basculer entre jour et nuit
3. Cliquer sur **Lancer** pour démarrer
4. Utiliser la souris pour orbiter autour de la scène (clic + glisser)
5. Molette pour zoomer/dézoomer
6. **Plein écran** disponible pour une immersion complète

### Graphiques
Les graphiques Chart.js sont interactifs : survoler pour voir les détails, cliquer sur les légendes pour filtrer.

## Personnalisation du logo JLV

Remplacer le fichier `logo_JLV.jpg` à la racine du projet par votre propre logo. Formats recommandés : JPG, PNG ou SVG. Taille suggérée : 80×40 px minimum.

## Intégration d'images

Les emplacements de la galerie utilisent des placeholders par défaut. Pour ajouter vos propres images :

1. Placer vos images dans un dossier `img/` à la racine
2. Dans `index.html`, remplacer les `<div class="gallery-placeholder">` par des balises `<img>` :
   ```html
   <div class="gallery-img">
       <img src="img/votre-image.jpg" alt="Description">
   </div>
   ```

## Mise en ligne sur GitHub Pages

1. Pousser le code sur GitHub
2. Aller dans **Settings** > **Pages**
3. Source : sélectionner la branche `main` et le dossier `/ (root)`
4. Cliquer sur **Save**
5. Le site sera accessible à : `https://votre-utilisateur.github.io/atomic-bomb-jlv/`

## Avertissement éthique et scientifique

Ce site est un projet **strictement éducatif**. Il vise à informer et sensibiliser sur un sujet historique et scientifique majeur.

- Aucune information de fabrication ou opérationnelle n'est fournie
- La simulation est purement illustrative et qualitative
- Le contenu scientifique reste à un niveau pédagogique
- L'objectif est la compréhension, la mémoire et la réflexion critique

Les armes nucléaires représentent la menace existentielle la plus grave créée par l'humanité. Comprendre leur histoire et leurs effets est un devoir de mémoire et un préalable à l'engagement pour le désarmement.

---

**Atomic Bomb by JLV** — Projet éducatif et scientifique
© 2024 JLV — Tous droits réservés
