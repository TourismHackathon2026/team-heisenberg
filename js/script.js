// ===================== EMERGENCY MENU =====================
const emergencyButton = document.querySelector(".emergency-btn");
const emergencyMenu = document.querySelector(".emergency-menu");

let open = false;

if (emergencyButton && emergencyMenu) {

  emergencyButton.onclick = (e) => {
    e.preventDefault();
    open = !open;
    emergencyMenu.style.display = open ? "flex" : "none";
  };

  document.addEventListener("click", (e) => {
    if (
      !emergencyButton.contains(e.target) &&
      !emergencyMenu.contains(e.target)
    ) {
      emergencyMenu.style.display = "none";
      open = false;
    }
  });

}


// ===================== OFFLINE WEATHER DATABASE =====================
const weatherDB = {

  kathmandu: {
    city: "Kathmandu",
    temp: 22,
    condition: "Partly Cloudy",
    wind: 6,

    risk: "Moderate",
    color: "#f59e0b",
    icon: "ri-alert-line",
    warning: "Light rain expected during the afternoon. Roads may become slippery in hilly areas."
  },

  pokhara: {
    city: "Pokhara",
    temp: 24,
    condition: "Heavy Rain",
    wind: 14,

    risk: "High",
    color: "#ef4444",
    icon: "ri-flood-line",
    warning: "Heavy rainfall increases the risk of flooding and landslides. Avoid trekking routes."
  },

  chitwan: {
    city: "Chitwan",
    temp: 38,
    condition: "Extreme Heat",
    wind: 4,

    risk: "High",
    color: "#dc2626",
    icon: "ri-sun-fill",
    warning: "Very high temperatures. Heatstroke risk is high. Stay hydrated and avoid direct sunlight."
  },

  // HILLY REGION
  dharan: {
    city: "Dharan",
    temp: 29,
    condition: "Thunderstorms",
    wind: 18,

    risk: "High",
    color: "#ef4444",
    icon: "ri-thunderstorms-line",
    warning: "Thunderstorms expected. Strong winds and lightning may disrupt travel. Avoid open areas."
  },

  // MOUNTAIN REGION
  // MOUNTAIN REGION
mugu: {
    city: "Mugu",
    temp: 7,
    condition: "Snowfall",
    wind: 22,

    risk: "High",
    color: "#3b82f6",
    icon: "ri-snowy-line",
    warning: "Snowfall and icy roads expected. Mountain roads may become icy. Carry warm clothing and avoid unnecessary travel during snowfall."
},

  // TERAI REGION
  janakpur: {
    city: "Janakpur",
    temp: 40,
    condition: "Heat Wave",
    wind: 5,

    risk: "Extreme",
    color: "#991b1b",
    icon: "ri-fire-fill",
    warning: "Heat wave in effect. Avoid outdoor activity between 11 AM and 4 PM. Drink plenty of water."
  }

};


// ===================== UPDATE WEATHER UI =====================
function updateWeatherUI(cityKey) {

  const data = weatherDB[cityKey];

  if (!data) return;

  // Weather
  document.getElementById("cityName").innerText = data.city;
  document.getElementById("condition").innerText = data.condition;
  document.getElementById("temp").innerText = data.temp + "°C";
  document.getElementById("wind").innerText = data.wind + " km/h";

  // Risk Card
  document.getElementById("riskLevel").innerText = data.risk;
  document.getElementById("riskLevel").style.color = data.color;

  document.getElementById("riskIcon").className = data.icon;
  document.getElementById("riskIcon").style.color = data.color;

  document.getElementById("riskWarning").innerText = data.warning;
}


// ===================== MAP INIT =====================
let map;
let marker;

if (document.getElementById("map") && typeof L !== "undefined") {

  map = L.map('map').setView([28.3949, 84.1240], 7);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

}


// ===================== SEARCH PLACE =====================
async function searchPlace() {

  const input = document.getElementById("searchBox");
  if (!input || !map) return;

  const query = input.value;
  if (!query) return;

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
  );

  const data = await res.json();

  if (!data.length) return;

  const lat = parseFloat(data[0].lat);
  const lon = parseFloat(data[0].lon);

  // zoom map
  map.setView([lat, lon], 13, { animate: true });

  // remove old marker
  if (marker) {
    map.removeLayer(marker);
  }

  marker = L.marker([lat, lon])
    .addTo(map)
    .bindPopup(data[0].display_name)
    .openPopup();

  
const cityKey = query.trim().toLowerCase();

if (weatherDB[cityKey]) {
    updateWeatherUI(cityKey);
}

} // <-- This closes searchPlace()


// ===================== DEFAULT WEATHER =====================
window.addEventListener("load", () => {
    updateWeatherUI("kathmandu");
});