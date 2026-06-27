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
    wind: 6
  },
  pokhara: {
    city: "Pokhara",
    temp: 24,
    condition: "Sunny",
    wind: 4
  },
  chitwan: {
    city: "Chitwan",
    temp: 30,
    condition: "Hot & Humid",
    wind: 3
  }
};


// ===================== UPDATE WEATHER UI =====================
function updateWeatherUI(cityKey) {

  const data = weatherDB[cityKey];
  const cityName = document.getElementById("cityName");
  const condition = document.getElementById("condition");
  const temp = document.getElementById("temp");
  const wind = document.getElementById("wind");

  if (!data || !cityName || !condition || !temp || !wind) return;

  cityName.innerText = data.city;
  condition.innerText = data.condition;
  temp.innerText = data.temp + "°C";
  wind.innerText = data.wind + " km/h";
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

  // 🔥 UPDATE WEATHER UI ONLY (NO ALERT)
  const cityKey = query.toLowerCase().split(" ")[0];
  updateWeatherUI(cityKey);
}


// ===================== DEFAULT WEATHER =====================
window.addEventListener("load", () => {
  updateWeatherUI("kathmandu");
});