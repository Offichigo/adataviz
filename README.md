# 🚽 WCdex — Pokédex des toilettes publiques de Nantes

> Projet réalisé dans le cadre d'une formation développement web — Ada Tech School

---

## 📋 Consignes du projet

### Fonctionnalités obligatoires

**1. Afficher les données depuis l'API**

- Récupérer les données via un `fetch`
- Créer une fonction dédiée à la récupération
- Afficher les données dans la page

**2. Bouton "Voir plus"**

- Afficher / masquer la description au clic
- Basculer le texte du bouton : `"Voir plus"` ↔ `"Voir moins"`
- Affichage alternatif si données absentes (image ou texte par défaut)
- Mise en page responsive une fois le contenu déplié

**3. Barre de recherche**

- Déclencher la recherche au clic ou à la touche Entrée
- Recherche insensible à la casse (`toLowerCase()`)
- Utiliser le paramètre `where` dans l'URL de requête

### Interdictions

- ❌ Framework frontend (React, Vue.js…)
- ❌ Backend ou base de données

### Bonus réalisés

- ✅ Design et UX soignés (thème Pokédex)
- ✅ Gestion des erreurs API
- ✅ Pagination avec `offset`
- ✅ Loader pendant le chargement
- ✅ Carte interactive Mapbox
- ✅ Suggestions de recherche en temps réel

---

## 🚀 Installation & démarrage

### Prérequis

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

### Installation

```bash
pnpm install
```

### Démarrage du serveur local

```bash
pnpm dev
```

Le site est accessible sur `http://localhost:5173`

### Tests

```bash
pnpm vitest
```

### Variables d'environnement

Créer un fichier `.env` à la racine :

```
VITE_MAPBOX_TOKEN=votre_token_mapbox_ici
```

> ⚠️ Fichier ignoré par Git — ne jamais committer le token

---

## 🗂️ Structure du projet

```
src/
├── main.js                   # Point d'entrée, pagination, carte Mapbox
├── view.js                   # Création des cartes et logique des types
├── search.js                 # Barre de recherche avec suggestions
├── map.js                    # Marqueurs Mapbox et popups
├── page.js                   # Navigation entre les pages
├── style.css                 # Styles (mode clair & sombre, responsive)
├── loading/
│   └── request.js            # Appels API paginés (limit / offset)
└── generate_page/
    └── component.js          # Rendu des cartes et affichage pagination
```

---

## 🌐 Présentation du site

### Concept

**WCdex** transforme les données des toilettes publiques de Nantes en cartes style Pokédex. Chaque toilette devient un "Pokémon" avec un numéro, un nom, des types et des statistiques.

### API utilisée

```
https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/
244400404_toilettes-publiques-nantes-metropole/records
```

Paramètres utilisés :

| Paramètre | Rôle                                       |
| --------- | ------------------------------------------ |
| `limit`   | Nombre de résultats par page               |
| `offset`  | Point de départ pour la pagination         |
| `where`   | Filtrage par quartier (barre de recherche) |
| `refine`  | Filtrage par pôle ou commune               |

### Champs de l'API

| Champ                     | Exemple                | Utilisation           |
| ------------------------- | ---------------------- | --------------------- |
| `gid`                     | `"57"`                 | Numéro de carte       |
| `nom`                     | `"Martyrs Nantais"`    | Nom affiché           |
| `pole`                    | `"Nantes Centralité"`  | Pôle territorial      |
| `quartier`                | `"Malakoff"`           | Recherche & affichage |
| `type_wc`                 | `"Cabine automatique"` | Logique des types     |
| `configuration_wc`        | `"Mixte"`              | Détails               |
| `accessibilite_pmr`       | `"oui"`                | ♿ affiché si oui     |
| `etat`                    | `"En service"`         | ❤️ / 💀 / 🛠️          |
| `horaire_ouverture`       | `"24h/24"`             | Détails               |
| `jour_ouverture`          | `"7j/7"`               | Détails               |
| `equipement_table_langer` | `0` ou `1`             | Type Fée              |
| `equipement_urinoir`      | `0` à `3`              | Type Poison           |
| `geo_point_2d`            | `{ lat, lon }`         | Marqueur carte        |

---

## ⚙️ Fonctionnement

### 🎮 Logique des types Pokémon

| Condition                        | Type attribué      |
| -------------------------------- | ------------------ |
| `type_wc` = Cabine automatique   | Ténèbres + Spectre |
| `type_wc` = Mobilier ou Bâtiment | Eau                |
| Autre                            | Normal             |
| `equipement_urinoir` ≥ 1         | + Poison           |
| `equipement_turque` ≥ 1          | + Combat           |
| `equipement_table_langer` = 1    | + Fée              |

### 📄 Pagination

```
offset = (page - 1) × PER_PAGE
```

La pagination repart à la page 1 à chaque nouvelle recherche.

### 🔍 Recherche

La barre de recherche propose des suggestions en temps réel issues de l'API. La recherche se déclenche à l'appui sur **Entrée** ou au **clic sur une suggestion**.

URL générée :

```
?where=quartier like "Malak%"
```

---

## ✅ Fonctionnalités réalisées

### 🃏 Carte principale

- [x] Numéro (`gid`), nom, pôle, quartier
- [x] Image unique par carte avec fallback `0404.png`
- [x] Statut : ❤️ En service · 💀 Hors service · 🛠️ Temporairement fermé
- [x] Bouton "Voir plus" style Pokéball

### 📋 Carte détaillée (au clic)

- [x] Configuration, PMR, horaires, jours, type WC
- [x] Équipements (urinoir, turc, table à langer)
- [x] Icônes de types Pokémon
- [x] Bouton bascule "Voir plus" / "Voir moins"

### 🔥 Types Pokémon

- [x] Cabine automatique → Ténèbres / Spectre
- [x] Mobilier / Bâtiment → Eau
- [x] Urinoir → Poison
- [x] WC turc → Combat
- [x] Table à langer → Fée

### 📄 Pagination

- [x] 6 cartes par page
- [x] Boutons Précédent / Suivant
- [x] Affichage `Page X / Y`
- [x] Remise à zéro à chaque recherche
- [x] Blocage du bouton Précédent en page 1

### 🔍 Barre de recherche

- [x] Suggestions en temps réel
- [x] Sélection au clic dans la liste
- [x] Recherche insensible à la casse
- [x] Paramètre `where` dans l'URL API
- [x] Retour aux résultats complets si champ vide

### 🗺️ Carte interactive

- [x] Marqueurs Mapbox pour chaque toilette
- [x] Popup avec nom, quartier, type, état
- [x] Zoom automatique sur les marqueurs...(pas vraiment)

### 🧹 Finitions

- [x] Loader GIF pendant le chargement
- [x] Gestion d'erreur si l'API ne répond pas
- [x] Responsive : mobile
- [x] Token sécurisé via `.env`

---

## 🎓 Compétences acquises

- [x] Connecter HTML et JS
- [x] Utiliser le CSS (Grid, Flexbox, responsive)
- [x] Créer des balises HTML via JS (`createElement`, `innerHTML`)
- [x] Afficher les données récupérées depuis une API
- [x] Comprendre et expliquer le fonctionnement d'une API
- [x] Manipuler un événement DOM (`click`, `keypress`, `input`)
- [x] Modifier le CSS via un événement JS (`classList.toggle`)
- [x] Utiliser `fetch` avec `async/await`
- [x] Comprendre les fonctions asynchrones
- [x] Passer des paramètres d'URL dans une requête HTTP
- [x] Afficher une erreur si l'API ne fonctionne pas
- [x] Organiser le code en modules
- [x] Gérer un loader / un état de chargement

---

_WCdex Nantes · Données [data.nantesmetropole.fr](https://data.nantesmetropole.fr) · Off Perianin_
