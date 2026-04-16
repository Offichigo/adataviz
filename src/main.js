import "./style.css";
import { searchCities } from "./search";
import { fetchmarkers } from "./map";
import { goToPage } from "./page";
//____________________________________________________________________________________________________________________________________
//*DATA

const API_BASE =
  "https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_toilettes-publiques-nantes-metropole/records";

//*Data page
//*PER_PAGE: Nombre d'élément par page
//*currentPage: La page en cours

const PER_PAGE = 6;

let currentPage = 1;
let totalCount = 0;

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
  zoom: 25,
});
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");

//____________________________________________________________________________________________________________________________________

//* Bouton page

btnPrev.addEventListener("click", () => {
  if (currentPage >= 2) {
    currentPage = currentPage - 1;
    goToPage(currentPage, API_BASE, PER_PAGE);
  } else {
    console.warn("Mauvais Index");
  }
});
btnNext.addEventListener("click", () => {
  currentPage = currentPage + 1;
  goToPage(currentPage, API_BASE, PER_PAGE);
});
document.getElementById("card-toilets").innerHTML = `
  <div id="loading">
    <img src="public/toilet-gif-cat.gif" alt="chargement" />
    <p>Chargement en cours...</p>
  </div>
`;
setTimeout(async () => {
  await goToPage(currentPage, API_BASE, PER_PAGE);
}, 10000);
//si curent page est >= 2 alors on peut descendre à -1
//mais si current page est = à 1 il faut bloquer à 1
//
//____________________________________________________________________________________________________________________________________

//* Call Fonction: pour affichage map et le fonctionnement de la barre de recherche

searchCities();
fetchmarkers(API, map);
