import { requestAPI } from "./data";
/**
 *
 * @param {object} result toilette
 */
export let allToilets = [];
//**transformation
// en fonction du type de wc et si d’equipement specifique ajout d’une evolution
//     - type_wc :
//         - cabine automatique : ténèbres/spectre
//         - mobilier : type eau
//         - bâtiment : type eau
//     - type-equipement_urinoir : evolution ajout type:  poison
//     - type-equipement turque: evolution ajout type: combat
//     - type-equipement table à langer : evolution ajout type: fée
//
const getTypes = (result) => {
  const types = [];
  if (result.type_wc === "Cabine automatique") types.push("Ténèbre", "Spectre");
  else if (result.type_wc === "Mobilier" || result.type_wc === "Bâtiment")
    types.push("Eau");
  //evolution pokemon
  if (result.equipement_urinoir >= 1) types.push("Poison");
  if (result.equipement_table_langer === 1) types.push("Fée");
  return types;
};

const getSprite = (types, num) => {
  const card = document.getElementById(num);
  types.forEach((type) => {
    addSprite(type, card);
  });
};
const addSprite = (type, card) => {
  const imgTypes = document.createElement("img");

  switch (type) {
    case "Poison":
      imgTypes.setAttribute(
        "src",
        "./public/icon-type-WCdex/120px-Miniature_Type_Poison_EV.png",
      );
      break;
    case "Eau":
      imgTypes.setAttribute(
        "src",
        "./public/icon-type-WCdex/120px-Miniature_Type_Eau_EV.png",
        "alt",
        "icone type de pokemon Eau",
      );
      break;
    case "Ténèbre":
      imgTypes.setAttribute(
        "src",
        "./public/icon-type-WCdex/120px-Miniature_Type_Ténèbres_EV.png",
        "alt",
        "icone type de pokemon Ténèbre",
      );
      break;
    case "Spectre":
      imgTypes.setAttribute(
        "src",
        "./public/icon-type-WCdex/120px-Miniature_Type_Spectre_EV.png",
        "alt",
        "icone type de pokemon Spectre",
      );
      break;
    case "Fée":
      imgTypes.setAttribute(
        "src",
        "./public/icon-type-WCdex/120px-Miniature_Type_Fée_EV.png",
        "alt",
        "icone type de pokemon Fée",
      );
      break;
  }
  card.appendChild(imgTypes);
};

//**Création de cartes */
export const createCards = (result) => {
  const section = document.querySelector(".card-toilets");
  //création nouvel élement
  //création numero de carte
  const num = String(result.gid).padStart(3, "0");

  //Img carte create
  const img = document.createElement("img");
  img.src = `./public/card-img/${num}.png`;
  img.onerror = function () {
    this.onerror = null; // desactive si image de défault n'existe éviter quelle fasse des appel, avant de changer le src
    this.src = "./public/card-img/0404.png";
  };
  img.classList.add("card-image");

  const cards = document.createElement("div");
  cards.classList.add("card-toilet");
  cards.setAttribute("id", num);

  //ajout image de remplacement si error
  const types = getTypes(result);
  const pmr = result.accessibilite_pmr === "oui" ? "♿" : "❌";
  const etat =
    result.etat === "En service"
      ? "❤️"
      : result.etat === "Hors service"
        ? "💀"
        : "🛠️";
  cards.innerHTML = `
      <span class="card-num">n°${num}</span>
      <div class="card-sprite"></div>
    <h3 class="name-card">${result.nom ?? "Nom inconnue"}</h3>
    <p>Apparais dans le quartier : ${result.quartier ?? "Pas renseigné"}</p>
    <p class="card-types">Type(s) : ${types.length > 0 ? types.join(" / ") : "Normal"}</p> 

      <div class="card-details hidden"> 
    <ul>
    <li>${result.pole ?? "Pôle inconnue"}</li>
    <li>${result.configuration_wc ?? "Configuration wc inconnue"}</li>
    <li>Accessibilité PMR : ${pmr}</li>
    <li>Vie: ${etat}</li>
    <li>${result.horaire_ouverture ?? "Pas plus d'informations"}</li>
    <li>${result.jour_ouverture ?? "Pas plus d'informations"}</li>
    <li>Type de wc : ${result.type_wc ?? "Pas plus d'informations"}</li>  
    <li>Equipement Table à langer : ${result.equipement_table_langer === 1 ? "✓" : "✗"}</li>
    <li>Equipement urinoir : ${result.equipement_urinoir ?? "Pas plus d'informations"}</li>
    </ul>
      </div>
       <button class="btn-details">Voir plus</button> `;
  cards.querySelector(".card-sprite").appendChild(img);

  cards.querySelector(".btn-details").addEventListener("click", () => {
    const details = cards.querySelector(".card-details");
    const btn = cards.querySelector(".btn-details");

    details.classList.toggle("hidden");
    btn.textContent = details.classList.contains("hidden")
      ? "Voir plus"
      : "Voir moins";
  });
  section.appendChild(cards);
  getSprite(types, num);
};

/**
 * * ecoute du clique
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
