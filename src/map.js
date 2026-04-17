/**
 *
 * @param {*} API
 * @param {*} map
 */
export async function fetchmarkers(API, map) {
  const response = await fetch(API);
  const data = await response.json();
  const markers = data.results;
  addMarkersToMap(markers, map);
  fitMapToMarkers(markers, map);
}

// ── addMarkersToMap() ─────────────────────────────────────────────────────────

function addMarkersToMap(markers, map) {
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

function fitMapToMarkers(markers, map) {
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
