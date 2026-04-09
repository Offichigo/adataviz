import { requestAPI } from "./data";
/**
 *
 * @param {object} result toilette
 */
//**transformation
const getTypes = (result) => {
  const types = [];
  if (result.type_wc === "Cabine automatique") types.push("Ténèbre", "Spectre");
  else if (result.type_wc === "Mobilier" || result.type_wc === "Bâtiment")
    types.push("Eau");
  if (result.equipement_urinoir >= 1) types.push("Poison");
  if (result.equipement_table_langer === 1) types.push("Fée");
  return types;

  // en fonction du type de wc et si d’equipement specifique ajout d’une evolution
  //     - type_wc :
  //         - cabine automatique : ténèbres/spectre
  //         - mobilier : type eau
  //         - bâtiment : type eau
  //     - type-equipement_urinoir : evolution ajout type:  poison
  //     - type-equipement turque: evolution ajout type: combat
  //     - type-equipement table à langer : evolution ajout type: fée
  //
};
const getsprite = (type) => {
  //ajout visuel selon type wc
};

export const createCards = (result) => {
  const section = document.querySelector(".card-toilets");
  //création nouvel élement
  //création numero de carte
  const cards = document.createElement("div");
  cards.classList.add("card-toilet");
  const num = String(result.gid).padStart(3, "0");
  const types = getTypes(result);

  cards.innerHTML = `
      <span class="card-num">n°${num}</span>
    <h3 class="name-card">${result.nom ?? "Nom inconnue"}</h3>
    <p>Apparais dans le quartier : ${result.quartier ?? "Pas renseigné"}</p>
    <p class="card-types">Type(s) : ${types.length > 0 ? types.join(" / ") : "Normal"}</p>   
    <button class="btn-details">Voir plus</button>
  `;
  cards.querySelector(".btn-details").addEventListener("click", () => {
    openDetails(result);
  });
  section.appendChild(cards);
};

const openDetails = (result) => {
  const existing = document.querySelector(".card-toilets-details");
  if (existing) existing.remove();

  const section = document.querySelector(".card-toilets");
  const cardsDetails = document.createElement("div");
  cardsDetails.classList.add("card-toilet-details");

  const num = String(result.gid).padStart(3, "0");
  const types = getTypes(result);
  const pmr = result.accessibilite_pmr === "oui" ? "♿" : "❌";
  //etat ajout visuel tempérament fermé dead
  //gender?
  //
  // ajout boolean pmr */
  cardsDetails.innerHTML = `
        <span class="card-num">n°${num}</span>
    <h3 class="name-card">${result.nom ?? "Nom inconnue"}</h3>
    <p>Apparais dans le quartier : ${result.quartier ?? "Pas renseigné"}</p>
    <p class="card-types">Type(s) : ${types.length > 0 ? types.join(" / ") : "Normal"}</p>   
    <ul>
    <li>${result.pole ?? "Pôle inconnue"}</li>
    <li>${result.configuration_wc ?? "Configuration wc inconnue"}</li>
    <li>Accessibilité PMR : ${pmr}</li>
    <li>${result.etat ?? "Pas plus d'informations"}</li>
    <li>${result.horaire_ouverture ?? "Pas plus d'informations"}</li>
    <li>${result.jour_ouverture ?? "Pas plus d'informations"}</li>
    <li>Type de wc : ${result.type_wc ?? "Pas plus d'informations"}</li>  
    <li>Equipement table à langer : ${result.equipement_table_langer ?? "Pas plus d'informations"}</li>
    <li>Equipement urinoir : ${result.equipement_urinoir ?? "Pas plus d'informations"}</li>
    <button class="btn-close-details">Fermer</button>
    </ul>
  `;
  cardsDetails
    .querySelector(".btn-close-details")
    .addEventListener("click", () => {
      cardsDetails.remove();
    });
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
