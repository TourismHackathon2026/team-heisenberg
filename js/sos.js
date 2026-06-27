// ===================== SOS ACTION =====================
const POLICE_NUMBER = "100";
const CONTACT_STORAGE_KEY = "sahayatriEmergencyContacts";

function getSavedEmergencyContacts() {
  const saved = localStorage.getItem(CONTACT_STORAGE_KEY);
  if (!saved) return [];

  return saved
    .split(",")
    .map(contact => contact.trim())
    .filter(Boolean);
}

function saveEmergencyContacts(contacts) {
  localStorage.setItem(CONTACT_STORAGE_KEY, contacts.join(","));
}

function askForEmergencyContacts() {
  const currentContacts = getSavedEmergencyContacts().join(", ");
  const enteredContacts = prompt(
    "Enter emergency contact phone numbers separated by commas.",
    currentContacts
  );

  if (enteredContacts === null) return getSavedEmergencyContacts();

  const contacts = enteredContacts
    .split(",")
    .map(contact => contact.trim())
    .filter(Boolean);

  saveEmergencyContacts(contacts);
  return contacts;
}

function getCurrentLocation() {
  return new Promise(resolve => {
    if (!navigator.geolocation) {
      resolve(null);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        resolve({ latitude, longitude });
      },
      () => resolve(null),
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 0
      }
    );
  });
}

function buildSOSMessage(location) {
  const locationText = location
    ? "My location: https://maps.google.com/?q=" + location.latitude + "," + location.longitude
    : "My location could not be detected automatically.";

  return "SOS! I need urgent help. Please contact me immediately and inform the police. " + locationText;
}

function openPoliceCall() {
  window.location.href = "tel:" + POLICE_NUMBER;
}

function openSOSText(contacts, message) {
  const encodedMessage = encodeURIComponent(message);
  const recipients = contacts.join(",");
  window.location.href = "sms:" + recipients + "?body=" + encodedMessage;
}

async function sendSOS() {
  let contacts = getSavedEmergencyContacts();

  if (!contacts.length) {
    contacts = askForEmergencyContacts();
  }

  if (!contacts.length) {
    const callPolice = confirm(
      "No emergency contacts are saved yet. Do you want to call police now?"
    );

    if (callPolice) openPoliceCall();
    return;
  }

  const shouldSend = confirm(
    "Send an SOS message to your emergency contacts and prepare to call police?"
  );

  if (!shouldSend) return;

  const location = await getCurrentLocation();
  const message = buildSOSMessage(location);

  alert(
    "Your SOS text will open now. After sending it, return here to call police at " + POLICE_NUMBER + "."
  );

  openSOSText(contacts, message);

  setTimeout(() => {
    const callPolice = confirm("Call police now at " + POLICE_NUMBER + "?");
    if (callPolice) openPoliceCall();
  }, 1500);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".sos-btn").forEach(button => {
    button.onclick = null;
    button.type = "button";
    button.setAttribute("aria-label", "Send SOS message");
    button.addEventListener("click", sendSOS);
  });
});
