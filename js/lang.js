// ================= TABS =================
function openTab(id, btn){

    document.querySelectorAll(".section").forEach(section=>{
        section.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");

    document.querySelectorAll(".tab").forEach(tab=>{
        tab.classList.remove("active");
    });

    btn.classList.add("active");
}


// ================= TEXT TO SPEECH =================

function speakText(text, lang = "ne-NP") {

    if (!("speechSynthesis" in window)) {
        alert("Text-to-Speech is not supported in this browser.");
        return;
    }

    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = lang;
    speech.rate = 0.9;
    speech.pitch = 5;
    speech.volume = 1;

    speechSynthesis.speak(speech);
}


// ================= ENGLISH -> NEPALI =================

const englishToNepali = {

    "hello":"Namaste (नमस्ते)",

    "thank you":"Dhanyabad (धन्यवाद)",

    "please":"Kripaya (कृपया)",

    "i need help":"Malai madat chahiyo (मलाई मद्दत चाहियो)",

    "where is the hospital":"Hospital kata cha? (अस्पताल कहाँ छ?)",

    "where is hospital":"Hospital kata cha? (अस्पताल कहाँ छ?)",

    "call the police":"Police bolaunus (प्रहरी बोलाउनुहोस्)",

    "call police":"Police bolaunus (प्रहरी बोलाउनुहोस्)",

    "i am lost":"Ma haraye (म हराएँ)",

    "i need water":"Malai pani chahiyo (मलाई पानी चाहियो)",

    "where is the hotel":"Hotel kata cha? (होटल कहाँ छ?)",

    "how much does this cost":"Yo kati parcha? (यो कति पर्छ?)",

    "how much":"Yo kati parcha? (यो कति पर्छ?)",

    "good morning":"Subha Prabhat (शुभ प्रभात)",

    "good night":"Subha Ratri (शुभ रात्री)"
};

function translateENtoNEP(){

    let text = document.getElementById("enInput").value;

    text = text.trim().toLowerCase();

    const output = document.getElementById("enOutput");

    if(text===""){
        output.innerHTML="Please enter a phrase.";
        return;
    }

    if(englishToNepali[text]){

        const translated = englishToNepali[text];

        output.innerHTML = `
            <strong>${translated}</strong><br><br>
            <button onclick="speakText(\`${translated}\`, 'ne-NP')">
                🔊 Listen
            </button>
        `;

    }
    else{
        output.innerHTML="Phrase not found.<br><br>Try one of these:<br><br>• Hello<br>• Thank you<br>• Please<br>• I need help<br>• Where is hospital<br>• Call police<br>• I am lost<br>• I need water<br>• Where is the hotel<br>• How much";
    }

}



// ================= NEPALI -> ENGLISH =================

const nepaliToEnglish = {

    "namaste":"Hello",

    "dhanyabad":"Thank you",

    "kripaya":"Please",

    "malai madat chahiyo":"I need help",

    "hospital kata cha":"Where is the hospital?",

    "police bolaunus":"Call the police",

    "ma haraye":"I am lost",

    "malai pani chahiyo":"I need water",

    "hotel kata cha":"Where is the hotel?",

    "yo kati parcha":"How much does this cost?",

    "subha prabhat":"Good morning",

    "subha ratri":"Good night"
};

function translateNEPtoEN(){

    let text = document.getElementById("nepInput").value;

    text = text.trim().toLowerCase();

    const output = document.getElementById("nepOutput");

    if(text===""){
        output.innerHTML="Please enter a phrase.";
        return;
    }

    if(nepaliToEnglish[text]){

        const translated = nepaliToEnglish[text];

        output.innerHTML = `
            <strong>${translated}</strong><br><br>
            <button onclick="speakText(\`${translated}\`, 'en-US')">
                🔊 Listen
            </button>
        `;

    }
    else{
        output.innerHTML="Phrase not found.";
    }

}



// ================= COPY EMERGENCY PHRASES =================

const emergencyTranslations={

    "Help me":"Malai madat chahiyo (मलाई मद्दत चाहियो)",

    "Call police":"Police bolaunus (प्रहरी बोलाउनुहोस्)",

    "I need a hospital":"Hospital kata cha? (अस्पताल कहाँ छ?)",

    "I am lost":"Ma haraye (म हराएँ)",

    "Water please":"Malai pani dinus (मलाई पानी दिनुहोस्)",

    "Danger!":"Khatara! (खतरा!)"

};

function copyText(text){

    navigator.clipboard.writeText(text);

    const msg=document.getElementById("copyMsg");

    const translated = emergencyTranslations[text];

    msg.innerHTML = `
        <strong>${text}</strong><br>
        ${translated}<br><br>

        <button onclick="speakText(\`${translated}\`, 'ne-NP')">
            🔊 Listen
        </button>
    `;

    setTimeout(()=>{
        msg.innerHTML="";
    },5000);

}