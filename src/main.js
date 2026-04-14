import "./style.css";
import { requestAPI } from "./data";
import { extractCitiesFromData } from "./view";
import { searchCities } from "./search";
import { fetchmarkers } from "./map";
// const data = await requestAPI();
extractCitiesFromData();
searchCities();
fetchmarkers();
