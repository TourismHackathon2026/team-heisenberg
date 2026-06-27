const enToNep = {
  "hello": "नमस्ते",
  "help": "मद्दत",
  "hospital": "अस्पताल",
  "police": "प्रहरी",
  "water": "पानी",
  "food": "खाना",
  "lost": "हराएँ",
  "danger": "खतरा",
  "where is hospital": "अस्पताल कहाँ छ"
};

const nepToEn = {
  "namaste": "hello",
  "madad": "help",
  "aspatal": "hospital",
  "prhari": "police",
  "pani": "water",
  "khana": "food",
  "khatra": "danger"
};

/* TAB SWITCH */
function openTab(id, el){
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

  document.getElementById(id).classList.add('active');
  el.classList.add('active');
}

/* EN → NEP */
function translateENtoNEP(){
  let text = document.getElementById("enInput").value.toLowerCase().trim();
  let out = document.getElementById("enOutput");

  if(!text){
    out.innerText = "Type something...";
    return;
  }

  if(enToNep[text]){
    out.innerText = enToNep[text];
    return;
  }

  out.innerText = text.split(" ").map(w => enToNep[w] || w).join(" ");
}

/* NEP → EN */
function translateNEPtoEN(){
  let text = document.getElementById("nepInput").value.toLowerCase().trim();
  let out = document.getElementById("nepOutput");

  if(!text){
    out.innerText = "Type something...";
    return;
  }

  if(nepToEn[text]){
    out.innerText = nepToEn[text];
    return;
  }

  out.innerText = text.split(" ").map(w => nepToEn[w] || w).join(" ");
}

/* COPY */
function copyText(text){
  navigator.clipboard.writeText(text);

  const msg = document.getElementById("copyMsg");
  msg.innerText = "Copied: " + text;

  setTimeout(() => msg.innerText = "", 1500);
}