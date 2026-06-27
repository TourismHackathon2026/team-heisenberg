function openTab(id){
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

/* COPY FUNCTION */
function copy(text){
  navigator.clipboard.writeText(text);

  const msg = document.getElementById("msg");
  msg.innerText = "Copied: " + text;

  setTimeout(() => msg.innerText = "", 15000);
}