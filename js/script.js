const emergencyButton = document.querySelector(".emergency-btn");
const emergencyMenu = document.querySelector(".emergency-menu");

let open = false;

emergencyButton.onclick = () => {

    open = !open;

    emergencyMenu.style.display = open ? "flex" : "none";

};

// Close popup when clicking outside
document.addEventListener("click", (e) => {

    if (
        !emergencyButton.contains(e.target) &&
        !emergencyMenu.contains(e.target)
    ) {

        emergencyMenu.style.display = "none";
        open = false;

    }

});