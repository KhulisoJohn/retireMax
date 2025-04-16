document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const darkModeToggle = document.getElementById("darkModeToggle");
    const lightModeToggle = document.getElementById("lightModeToggle");
    const logo = document.getElementById("logo");
    const Logo = document.getElementById("Logo");
    const footer = document.querySelector(".footer");
    const navbar = document.querySelector(".navbar");
    const modalContent = document.querySelector("#assumptionsModal .modal-content");

    const MIN_WITHDRAWAL = 2500;
    const INPUT_IDS = [1, 2, 3, 4, 5, 6];
    const errorMessages = {
        1: "Please enter a valid current age.",
        2: "Please enter a valid retirement age greater than current age.",
        3: "Please enter a valid gross monthly income.",
        4: "Please enter a valid monthly retirement contribution.",
        5: "Please enter a valid savings component value.",
        6: "Please enter a valid withdrawal amount between R2,500 and the savings component value."
    };

    // Initialize theme based on localStorage
    localStorage.getItem("theme") === "dark" ? enableDarkMode() : enableLightMode();
    darkModeToggle?.addEventListener("click", enableDarkMode);
    lightModeToggle?.addEventListener("click", enableLightMode);

    function enableDarkMode() {
        body.classList.replace("light-mode", "dark-mode");
        navbar.classList.replace("navbar-light", "navbar-dark");
        navbar.classList.replace("bg-light", "bg-dark");
        footer.classList.replace("bg-light", "bg-dark");
        darkModeToggle.classList.add("d-none");
        lightModeToggle.classList.remove("d-none");
        
          
        if (modalContent) {
            modalContent.classList.add("bg-dark", "text-light");
        }
        if (logo) logo.src = "./assets/dark-logo.png";
        if (Logo) Logo.src = "./assets/dark-logo.png";
        localStorage.setItem("theme", "dark");
    }

    function enableLightMode() {
        body.classList.replace("dark-mode", "light-mode");
        navbar.classList.replace("navbar-dark", "navbar-light");
        navbar.classList.replace("bg-dark", "bg-light");
        footer.classList.replace("bg-dark", "bg-light");
        darkModeToggle.classList.remove("d-none");
        lightModeToggle.classList.add("d-none");

     
        if (modalContent) {
            modalContent.classList.remove("bg-dark", "text-light");
        }
        if (logo) logo.src = "./assets/light-logo.png";
        if (Logo) Logo.src = "./assets/light-logo.png";
        localStorage.setItem("theme", "light");
    }

    function handleValidation(input, error, message) {
        input.classList.add("is-invalid");
        error.textContent = message;
    }

    function validateAndPreview() {
        let valid = true;
        let numbers = [];
        INPUT_IDS.forEach((id) => {
            const input = document.getElementById(`number${id}`);
            const error = document.getElementById(`error${id}`);
            input.classList.remove("is-invalid");
            error.textContent = "";
            let value = input.value.trim();
            let num = Number(value);
            if (!value || isNaN(num) || num < 0) {
                handleValidation(input, error, errorMessages[id]);
                valid = false;
                return;
            }
            if (id === 2) {
                let currentAge = Number(document.getElementById("number1").value);
                if (num <= currentAge) {
                    handleValidation(input, error, errorMessages[id]);
                    valid = false;
                    return;
                }
            }
            if (id === 6) {
                let maxWithdrawal = Number(document.getElementById("number5").value);
                if (isNaN(maxWithdrawal) || maxWithdrawal < MIN_WITHDRAWAL) {
                    handleValidation(document.getElementById("number5"), document.getElementById("error5"), errorMessages[5]);
                    valid = false;
                    return;
                }
                if (num < MIN_WITHDRAWAL || num > maxWithdrawal) {
                    handleValidation(input, error, errorMessages[6].replace("R2,500", `R${MIN_WITHDRAWAL}`).replace("savings component value", `R${maxWithdrawal}`));
                    valid = false;
                    return;
                }
            }
            numbers.push(num);
        });
        if (valid) {
            console.log("Validation successful!", numbers);
        }
    }

    document.getElementById("retirementForm")?.addEventListener("submit", (event) => {
        event.preventDefault();
        validateAndPreview();
    });
});
