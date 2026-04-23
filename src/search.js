//  Lire ce que l'utilisateur a tapé
//
import { goToPage } from "./page.js";
import { createCards } from "./view.js";
import {
  createCardsPage,
  PER_PAGE,
  resetCurrentPage,
  modifyCurrentApiUrl,
  resertApiUrl,
} from "./main.js";

//Recherche par quartier
export const searchCities = async () => {
  const urlAllCities = `https://data.nantesmetropole.fr//api/explore/v2.1/catalog/datasets/244400404_toilettes-publiques-nantes-metropole/records?select=quartier&limit=-1`;
  try {
    const responseAllCities = await fetch(urlAllCities);
    const allCities = await responseAllCities.json();
    const allCitiesObj = allCities.results;
    let allCitiesArray = [];
    allCitiesObj.forEach((city) => {
      if (!allCitiesArray.includes(city.quartier) && city.quartier !== null) {
        allCitiesArray.push(city.quartier);
      }
    });
    const searchInput = document.getElementById("search");
    suggestionSearch(searchInput, allCitiesArray);
  } catch (err) {
    console.error("Erreur lors du chargement des toilettes :", err);
  }

  document.querySelector("#search").addEventListener("keypress", async (e) => {
    if (e.code === "Enter") {
      let getCities = document.querySelector("#search").value;
      searchToilletByCity(getCities);
    }
  });
};

/**
 *
 * @param {*} getCities
 */
const searchToilletByCity = async (getCities) => {
  removeSuggestion();
  if (getCities == "") {
    resertApiUrl();
    createCardsPage();
  } else {
    resetCurrentPage();
    const url = `https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_toilettes-publiques-nantes-metropole/records?where=quartier like "${getCities}%"&`;
    try {
      modifyCurrentApiUrl(url);
      goToPage(1, url, PER_PAGE);
    } catch (err) {
      console.error("Erreur lors du chargement des toilettes :", err);
    }
  }
};
// ici tu as cities.results qui contient les toilettes filtrées
// → vider la section
// → forEach + createCards
//filter dans l'api du
//utiliser where???

/**
 *
 * @param {*} input ce que tape user dans la barre de recherche
 * @param {*} list liste de suggestions de quartier
 */
const suggestionSearch = (input, list) => {
  input.addEventListener("input", () => {
    removeSuggestion();
    if (!input.value) return;
    const suggestions = document.createElement("div");
    suggestions.setAttribute("id", "suggestions");
    list.forEach((city) => {
      const cityLower = city.toLowerCase();
      if (cityLower.includes(input.value.toLowerCase())) {
        const suggestion = document.createElement("p");
        suggestion.innerHTML = city;
        suggestion.addEventListener("click", () => {
          input.value = city;
          searchToilletByCity(city);
        });
        suggestions.appendChild(suggestion);
      }
    });
    input.parentNode.appendChild(suggestions);
  });
};

//*Remplace la suggestion en fonction de ce qui est écrit

const removeSuggestion = () => {
  const suggestions = document.getElementById("suggestions");
  if (suggestions) {
    suggestions.parentNode.removeChild(suggestions);
  }
};
