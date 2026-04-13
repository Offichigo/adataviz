//  Lire ce que l'utilisateur a tapé
//

//creation validation recherche button ?

export const searchCities = async () => {
  search.addEventListener("keypress", async (e) => {
    if (e.code === "Enter") {
      let getCities = document.querySelector("#search").value.toLowerCase();
      console.log(getCities);
      const url = `https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_toilettes-publiques-nantes-metropole/records?select=quartier&limit=-1&refine=commune%3A%22Nantes%22`;
      try {
        const response = await fetch(url);
        const cities = await response.json();
      } catch (err) {
        console.error(err);
      }
    }
  });
};
//filter dans l'api du
//utiliser where???
