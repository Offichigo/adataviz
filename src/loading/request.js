/**
 *
 * @param {*} page
 * @param {*} API_BASE
 * @param {*} PER_PAGE Nombre d'élément par page
 * @returns
 */
export async function fetchPage(page, API_BASE, PER_PAGE) {
  const offset = (page - 1) * PER_PAGE + 1;
  const url = `${API_BASE}?limit=${PER_PAGE}&offset=${offset}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Erreur du chargement des toilettes");
  }
  return {};
}
