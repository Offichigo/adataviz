import "./style.css";
import { requestAPI } from "./data";
import { searchCities } from "./search";
import { fetchmarkers } from "./map";
import { goToPage } from "./page";
const API_BASE =
  "https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_toilettes-publiques-nantes-metropole/records";

const PER_PAGE = 6;

let currentPage = 1;
let totalCount = 0;

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const API =
  "https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_toilettes-publiques-nantes-metropole/records?limit=-1&refine=pole%3A%22Nantes%20Centralit%C3%A9%22&refine=commune%3A%22Nantes%22";

//connect
let map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/maelie/cmb7nnzmz00r901pact8o1xtf",
  center: [-1.55, 47.216671],
  zoom: 25,
});
const btnPrev = document.getElementById("prev");
const btnNext = document.getElementById("next");

// =======================================================================

btnPrev.addEventListener("click", () => {
  currentPage = currentPage - 1;
  goToPage(currentPage, API_BASE, PER_PAGE);
});
btnNext.addEventListener("click", () => {
  currentPage = currentPage + 1;
  goToPage(currentPage, API_BASE, PER_PAGE);
});
await goToPage(currentPage, API_BASE, PER_PAGE);

searchCities();
fetchmarkers(API, map);
