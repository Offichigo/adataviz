import "./style.css";
import { requestAPI } from "./data";
import { extractCitiesFromData } from "./view";
import { searchCities } from "./search";

// const data = await requestAPI();
extractCitiesFromData();
searchCities();
