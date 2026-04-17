import { renderCards, renderPagination } from "./generate_page/component";
import { fetchPage } from "./loading/request";
import { createCards } from "./view";

/**
 *
 * @param {*} currentPageParams index page en cours
 * @param {*} API_BASE
 * @param {*} PER_PAGE
 */
export async function goToPage(currentPageParams, API_BASE, PER_PAGE) {
  try {
    const data = await fetchPage(currentPageParams, API_BASE, PER_PAGE);
    let markers = data.results;
    renderCards(markers);
    renderPagination(currentPageParams, data.total_count, PER_PAGE);
  } catch (error) {
    console.error("go to page", error);
  }
}
