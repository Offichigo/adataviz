// faire une fonction pour supprimer les doublons de résultat qui s'affiche dans la page principale
const nameCities = [...new Set(toilets.map((t) => t.commune))];
console.log(nameCities);
// .map()  => parcourt chaque toilette et on prend juste son nom de commune
// new Set() => supprime les doublons (ex: "Nantes" qui apparaît plusieurs fois)
// [...]   =>  retransforme le résultat en tableau
