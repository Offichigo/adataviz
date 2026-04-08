export const requestAPI = async () => {
  const url =
    "https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_toilettes-publiques-nantes-metropole/records?limit=20&refine=pole%3A%22Nantes%20Centralit%C3%A9%22&refine=commune%3A%22Nantes%22";
  console.log(url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};
// Récupérer la div list

// Créer une fonction
// Récupérer les données de l'API (url) -> fetch
// Récupérer la réponse en JSON
// On récupère le tableau result
// On itère sur notre array

// On créer une nouvelle fonction (créer des cards pour chaque toilettes)
// Créer le html (div) pour chaque toilettes
// On ajoute la div à la list
