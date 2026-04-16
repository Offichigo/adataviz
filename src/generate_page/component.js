import { createCards } from "../view";

export function renderCards(markers) {
  const grid = document.getElementById("card-toilets");
  grid.innerHTML = "";
  markers.forEach((marker) => {
    createCards(marker);
  });
}

export function renderPagination(currentPage, total_count, PER_PAGE) {
  const pageInfo = document.getElementById("page-number");

  const totalPages = Math.ceil(total_count / PER_PAGE);
  pageInfo.textContent = `Page ${currentPage} / ${totalPages}`;
}
