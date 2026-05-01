/**
 *
 * @param {object} result toilette
 */

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
  else types.push("Normal");
  //evolution pokemon
  if (result.equipement_urinoir >= 1) types.push("Poison");
  if (result.equipement_table_langer === 1) types.push("Fée");
  if (result.equipement_turque >= 1) types.push("Combat");
  return types;
};
/**
 *
 * @param {*} types type wc change type pokemon
 * @param {*} num result data gid en num cart pokemon
 */
const getSprite = (types, num) => {
  const card = document.querySelector(`#wc-${num} .card-types-icons`);
  types.forEach((type) => {
    addSprite(type, iconsContainer);
  });
};

const addSprite = (type, card) => {
  const imgTypes = document.createElement("img");
  switch (type) {
    case "Poison":
      imgTypes.setAttribute(
        "src",
        "/icon-type-WCdex/120px-Miniature_Type_Poison_EV.png",
      );
      break;
    case "Eau":
      imgTypes.setAttribute(
        "src",
        "/icon-type-WCdex/120px-Miniature_Type_Eau_EV.png",
      );
      break;
    case "Ténèbre":
      imgTypes.setAttribute(
        "src",
        "/icon-type-WCdex/120px-Miniature_Type_Tenebres_EV.png",
      );
      break;
    case "Spectre":
      imgTypes.setAttribute(
        "src",
        "/icon-type-WCdex/120px-Miniature_Type_Spectre_EV.png",
      );
      break;
    case "Fée":
      imgTypes.setAttribute(
        "src",
        "/icon-type-WCdex/120px-Miniature_Type_Fee_EV.png",
      );
      break;
    case "Combat":
      imgTypes.setAttribute(
        "src",
        "/icon-type-WCdex/Miniature_Type_Combat_EV.png",
      );
      break;
    case "Normal":
      imgTypes.setAttribute(
        "src",
        "/icon-type-WCdex/Miniature_Type_Normal_EV.png",
      );
      break;
  }
  card.appendChild(imgTypes);
};

//**Création de cartes */
export const createCards = (result) => {
  const section = document.getElementById("card-toilets");
  //création nouvel élement
  //création numero de carte
  const num = String(result.gid).padStart(3, "0");

  //Img carte create
  const img = document.createElement("img");
  img.src = `/card-img/${num}.png`;
  img.onerror = function () {
    this.onerror = null; // desactive si image de défault n'existe éviter quelle fasse des appel, avant de changer le src
    this.src = "/card-img/0404.png";
  };
  img.classList.add("card-image");

  const cards = document.createElement("div");
  cards.classList.add("card-toilet");
  cards.setAttribute("id", `wc-${num}`);

  const types = getTypes(result);
  const pmr = result.accessibilite_pmr === "oui" ? "♿" : "❌";
  const etat =
    result.etat === "En service"
      ? "❤️"
      : result.etat === "Hors service"
        ? "💀"
        : "🛠️";
  cards.innerHTML = `
  <div class="card-left">
    <span class="card-num">n°${num}</span>
    <div class="card-sprite"></div>
  </div>

  <div class="card-right">
    <h3 class="name-card">${result.nom ?? "Nom inconnu"}</h3>
    <p class="card-quartier">📍 ${result.quartier ?? "Pas renseigné"}</p>
    <p class="card-types-text">Type(s) : ${types.length > 0 ? types.join(" / ") : "Normal"}</p>
    <div class="card-types-icons"></div>

    <div class="card-details hidden">
      <ul>
        <li>Pôle : ${result.pole ?? "Inconnu"}</li>
        <li>Configuration : ${result.configuration_wc ?? "Inconnue"}</li>
        <li>Accessibilité PMR : ${pmr}</li>
        <li>État : ${etat}</li>
        <li>Horaires : ${result.horaire_ouverture ?? "—"}</li>
        <li>Jours : ${result.jour_ouverture ?? "—"}</li>
        <li>Type WC : ${result.type_wc ?? "—"}</li>
        <li>Table à langer : ${result.equipement_table_langer === 1 ? "✓" : "✗"}</li>
        <li>Urinoirs : ${result.equipement_urinoir ?? 0}</li>
        <li>WC turc : ${result.equipement_turque ?? "—"}</li>
      </ul>
    </div>

    <button class="btn-details">Voir plus</button>
  </div>
`;
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
  getSprite(types, cards);
};
//** pour .toggle Si la classe est absente => il l'ajoute/ Si la classe est présente => il la retire
/**
 * * ecoute du clique
 * ajout au clique changement de la carte
 * crée card qui affiche tous les autres détail et fait une comparaison et donne le type en fonction du type de wc et de son equipement
 *  clique affiche les détails pour chaque card pour en savoir plus
 * adresse - commune - quartier- type equip - acces pmr (true false)-hour-état=boolean
 *
 */
