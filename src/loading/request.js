//!______request-Appels API paginés (limit / offset)-________//
//*limit :Nombre de résultats par page
//*offset : Point de démmarage pour la pagination

/**
 *
 * @param {*} page
 * @param {*} API_BASE
 * @param {*} PER_PAGE Nombre d'élément par page
 * @returns
 */
export async function fetchPage(page, API_BASE, PER_PAGE) {
  const offset = (page - 1) * PER_PAGE;
  const url = `${API_BASE}limit=${PER_PAGE}&offset=${offset}`;
  console.log(url);
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw new Error("Erreur du chargement des toilettes");
  }
  return {};
}
