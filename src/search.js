//  Lire ce que l'utilisateur a tapé
//

//creation validation recherche button ?
import { createCards } from "./view.js";
export const searchCities = async () => {
  document.querySelector("#search").addEventListener("keypress", async (e) => {
    if (e.code === "Enter") {
      let getCities = document.querySelector("#search").value;
      console.log(getCities);
      const url = `https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_toilettes-publiques-nantes-metropole/records?where=quartier like "${getCities}%"&limit=-1&refine=pole%3A%22Nantes%20Centralit%C3%A9%22`;
      try {
        const response = await fetch(url);
        const cities = await response.json();
        console.log(cities);
        document.querySelector(".card-toilets").innerHTML = "";
        cities.results.forEach((cities) => {
          createCards(cities);
        });
      } catch (err) {
        console.error(err);
      }
    }
  });
};
// ici tu as cities.results qui contient les toilettes filtrées
// → vider la section
// → forEach + createCards
//filter dans l'api du
//utiliser where???
