// mapboxgl.accessToken =
//   "pk.eyJ1IjoibWFlbGllIiwiYSI6ImNtbnlvYTNjaTA0ZG8yb3I4bzR2OGl0engifQ.VQuGfWozqzE7jGU6rXwJdA";

const API =
  "https://data.nantesmetropole.fr/api/explore/v2.1/catalog/datasets/244400404_toilettes-publiques-nantes-metropole/records?limit=-1&refine=pole%3A%22Nantes%20Centralit%C3%A9%22&refine=commune%3A%22Nantes%22";

//connect
let map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/maelie/cmb7nnzmz00r901pact8o1xtf",
  center: [-1.55, 47.216671],
  zoom: 10,
});

export async function fetchmarkers() {
  const response = await fetch(API);
  const data = await response.json();
  const markers = data.results;
  addMarkersToMap(markers);
  fitMapToMarkers(markers);
}

// ── addMarkersToMap() ─────────────────────────────────────────────────────────

function addMarkersToMap(markers) {
  markers.forEach((marker) => {
    const popup = new mapboxgl.Popup({ maxWidth: "260px" }).setHTML(
      buildPopupHTML(marker),
    );

    new mapboxgl.Marker()
      .setLngLat([marker.geo_point_2d.lon, marker.geo_point_2d.lat])
      .setPopup(popup)
      .addTo(map);
  });
}

// ── fitMapToMarkers() ─────────────────────────────────────────────────────────

function fitMapToMarkers(markers) {
  const bounds = new mapboxgl.LngLatBounds();
  markers.forEach((marker) =>
    bounds.extend([marker.geo_point_2d.lon, marker.geo_point_2d.lat]),
  );
  map.fitBounds(bounds, { padding: 70, maxZoom: 15, duration: 0 });
}

// ── buildPopupHTML() ──────────────────────────────────────────────────────────

function buildPopupHTML(marker) {
  const name = marker.nom || "Inconnu";
  const cities = marker.quartier || "—";
  const espece = marker.type_wc || "—";
  const state = marker.etat || "_";

  return `
    <div class="popup-title">🚽 ${name}</div>
    <div class="popup-row"><span class="popup-label">Quartier: </span><span class="popup-value">${cities}</span></div>
    <div class="popup-row"><span class="popup-label">Type de wc: </span><span class="popup-value">${espece}</span></div>
        <div class="popup-row"><span class="popup-label">Êtat: </span><span class="popup-value">${state}</span></div>

  `;
}
