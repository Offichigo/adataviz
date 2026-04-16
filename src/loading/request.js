import { createCards } from "../view";
import { requestAPI } from "../data";

export const extractCitiesFromData = async () => {
  try {
    const response = await requestAPI();
    response.results.forEach((toilet) => createCards(toilet));
  } catch (err) {
    console.error("Erreur lors du chargement des toilettes :", err);
  }
};

export async function fetchPage(page, API_BASE, PER_PAGE) {
  const offset = (page - 1) * PER_PAGE + 1;
  const url = `${API_BASE}?limit=${PER_PAGE}&offset=${offset}`;
  console.log(url);

  const response = await fetch(url);
  const data = await response.json();

  return data;
}
