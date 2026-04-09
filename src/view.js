import { requestAPI } from "./data";
/**
 *
 * @param {object} result toilette
 */
//**transformation
// ajout boolean pmr */
export const createCards = (result) => {
  const section = document.querySelector(".card-toilets");
  //création nouvel élement
  //création numero de carte
  const cards = document.createElement("div");
  cards.classList.add("card-toilet");
  const num = String(result.gid).padStart(3, "0");

  cards.innerHTML = `
      <span class="card-num">n°${num}</span>
    <h3 class="name-card">${result.nom ?? "Nom inconnue"}</h3>
    <p>Apparais dans le quartier : ${result.quartier ?? "Pas renseigné"}
  `;
  section.appendChild(cards);
};

export const createCardsDetails = (result) => {
  const section = document.querySelector(".card-toilets");
  const cardsDetails = document.createElement("div");
  cards.classList.add("card-toilet-details");
  const num = String(result.gid).padStart(3, "0");

  cardsDetails.innerHTML = `
        <span class="card-num">n°${num}</span>
    <h3 class="name-card">${result.nom ?? "Nom inconnue"}</h3>
    <p>Apparais dans le quartier : ${result.quartier ?? "Pas renseigné"}
    <ul>
    <li>${result.pole ?? "Pôle inconnue"}</li>
    <li>${result.configuration_wc ?? "Configuration wc inconnue"}</li>
    <li>${result.accessibilite_pmr ?? "✗"}</li>
    <li>${result.etat ?? "Pas plus d'informations"}</li>
    <li>${result.horaire_ouverture ?? "Pas plus d'informations"}</li>
    <li>${result.ouverture ?? "Pas plus d'informations"}</li>
    <li>${result.equipement_table_langer ?? "Pas plus d'informations"}</li>
    <li>${result.equipement_urinoir ?? "Pas plus d'informations"}</li>
    <li>${result.geo_point_2d ?? "Pas plus d'informations"}</li>

    }
  `;
  section.appendChild(cardsDetails);
};

/**
 * * ecoute du clique
 * ajout carte detaillé
 * ajout au clique changement de la carte
 * crée card qui affiche tous les autres détail et fait une comparaison et donne le type en fonction du type de wc et de son equipement
 *  clique affiche les détails pour chaque card pour en savoir plus
 * adresse - commune - quartier- type equip - acces pmr (true false)-hour-état=boolean
 *
 */
/**
 * récupérer les données toilette publics
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
