//  Lire ce que l'utilisateur a tapé
//
import { createCards } from "./view.js";

export const searchCities = async () => {
  document.querySelector("#search").addEventListener("keypress", async (e) => {
    if (e.code === "Enter") {
      let getCities = document.querySelector("#search").value;

      const url = `https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_toilettes-publiques-nantes-metropole/records?where=quartier like "${getCities}%"&limit=-1`;
      try {
        const response = await fetch(url);
        const cities = await response.json();

        document.getElementById("card-toilets").innerHTML = "";
        document.querySelector(".button").innerHTML = "";
        cities.results.forEach((cities) => {
          createCards(cities);
        });
      } catch (err) {
        console.error("Erreur lors du chargement des toilettes :", err);
      }
    }
  });
};
// ici tu as cities.results qui contient les toilettes filtrées
// → vider la section
// → forEach + createCards
//filter dans l'api du
//utiliser where???
