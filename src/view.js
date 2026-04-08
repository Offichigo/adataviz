import { requestAPI } from "./data";
/**
 *
 * @param {object} result toilette
 */

export const createCards = (result) => {
  const section = document.querySelector(".card-toilets");
  //création nouvel élement
  const cards = document.createElement("div");
  cards.classList.add("card-toilet");
  cards.innerHTML = `
    <h3>Toilette : "${result.nom ?? "Nom inconnue"}"</h3>
    <p>${result.commune ?? "Commune non renseignée"}</p>
    <p>apparait dans le quartier : ${result.quartier ?? "Pas renseigné"}
  `;
  section.appendChild(cards);
};
/**
 * récupérer les données toilette publics
 * crée card qui affiche les commune et le quartier
 * clique affiche les détails pour chaque card pour en savoir plus
 * adresse - commune - quartier- type equip - acces pmr (true false)-hour-état=boolean
 *affiner ce que donne le donne le tableau
 */
export const extractCitiesFromData = async () => {
  try {
    const response = await requestAPI();
    response.results.forEach((toilet) => createCards(toilet));
  } catch (err) {
    console.error("Erreur lors du chargement des toilettes :", err);
  }
};

//recuperer les noms des communes une par une dans un tableau
//retourner les noms
//afficher
