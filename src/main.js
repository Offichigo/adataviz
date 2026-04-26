import "./style.css";
import { searchCities } from "./search";
import { fetchmarkers } from "./map";
import { goToPage } from "./page";
//____________________________________________________________________________________________________________________________________
//!__________main-Point d'entrée, pagination (listen!), connexion carte Mapbox-__________//
//*DATA

const API_BASE =
  "https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_toilettes-publiques-nantes-metropole/records?";
let currentAPI = API_BASE;
export const resertApiUrl = () => {
  currentAPI = API_BASE;
};
export const modifyCurrentApiUrl = (url) => {
  currentAPI = url;
};
//*Data page
//*PER_PAGE: Nombre d'élément par page
//*currentPage: La page en cours

export const PER_PAGE = 6;

let currentPage = 1;
let totalCount = 0;

//* fonction pour reset la pagination sur la page 1 de manière globale. Utile aprés une recherche
export const resetCurrentPage = () => {
  currentPage = 1;
};

//* Nombre de page a afficher, utile pour la fonction qui empéche d'aller après la dernière page dans la pagination
export const modifyTotalCount = (newTotalCount) => {
  totalCount = newTotalCount;
};

//*Data map
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const API =
  "https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_toilettes-publiques-nantes-metropole/records?limit=-1";

//____________________________________________________________________________________________________________________________________

//*Connect map

let map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/maelie/cmb7nnzmz00r901pact8o1xtf",
  center: [-1.55, 47.216671],
  zoom: 15,
});
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");

//____________________________________________________________________________________________________________________________________

//* Bouton page

btnPrev.addEventListener("click", () => {
  if (currentPage >= 2) {
    currentPage = currentPage - 1;
    goToPage(currentPage, currentAPI, PER_PAGE);
  } else if (currentPage === 1) {
    currentPage = totalCount;
    goToPage(currentPage, currentAPI, PER_PAGE);
  } else {
    console.warn("Mauvais Index");
  }
});
btnNext.addEventListener("click", () => {
  if (currentPage < totalCount) {
    currentPage = currentPage + 1;
    goToPage(currentPage, currentAPI, PER_PAGE);
  } else {
    currentPage = 1;
    goToPage(currentPage, currentAPI, PER_PAGE);
  }
});
document.getElementById("card-toilets").innerHTML = `
  <div id="loading">
    <img src="/toilet-gif-cat.gif" alt="chargement" />
    <p>Chargement en cours...</p>
  </div>
`;
export const createCardsPage = () => {
  goToPage(currentPage, currentAPI, PER_PAGE);
};
setTimeout(async () => {
  await createCardsPage();
}, 10000);

//si curent page est >= 2 alors on peut descendre à -1
//mais si current page est = à 1 il faut bloquer à 1
//
//____________________________________________________________________________________________________________________________________

//* Call Fonction: pour affichage map et le fonctionnement de la barre de recherche

searchCities();
fetchmarkers(API, map);
