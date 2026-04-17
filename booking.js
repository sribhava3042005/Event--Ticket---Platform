document.addEventListener("DOMContentLoaded", () => {

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const ticketSelect = document.getElementById("tickets");
    const typeSelect = document.getElementById("ticket-type");
    const totalDisplay = document.querySelector(".total span:last-child");
    const form = document.querySelector("form");

    
    if (!nameInput || !emailInput || !form) return;

    let basePrice = 299;
    let fee = 20;

    //  AUTOFILL //

    try {
        nameInput.value = localStorage.getItem("name") || "";
        emailInput.value = localStorage.getItem("email") || "";
    } catch {}

    
    //  SAVE USER DATA //
    
    nameInput.addEventListener("input", () => {
        localStorage.setItem("name", nameInput.value);
    });

    emailInput.addEventListener("input", () => {
        localStorage.setItem("email", emailInput.value);
    });

    
    //  PRICE CALCULATION //
    
    function updatePrice() {
        if (!ticketSelect || !typeSelect || !totalDisplay) return;

        let tickets = parseInt(ticketSelect.value);
        let type = typeSelect.value;

        let multiplier = 1;
        if (type === "vip") multiplier = 2;
        if (type === "student") multiplier = 0.8;

        let total = (basePrice * multiplier * tickets) + fee;
        totalDisplay.innerText = "₹" + Math.round(total);
    }

    if (ticketSelect && typeSelect) {
        ticketSelect.addEventListener("change", updatePrice);
        typeSelect.addEventListener("change", updatePrice);
        updatePrice();
    }

    
    //  PHONE VALIDATION //
    
    if (phoneInput) {
        phoneInput.addEventListener("input", () => {
            let value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
            phoneInput.value = value;

            phoneInput.style.borderColor =
                value.length === 10 ? "green" : "red";
        });
    }

    // LIVE TICKET SUMMARY //
    
    if (ticketSelect && typeSelect) {
        const summaryBox = document.createElement("p");
        summaryBox.style.marginTop = "10px";
        summaryBox.style.fontWeight = "bold";

        document.querySelector(".booking-form-box").appendChild(summaryBox);

        function updateSummary() {
            summaryBox.innerText =
                `🎟️ ${ticketSelect.value} ticket(s) | Type: ${typeSelect.value.toUpperCase()}`;
        }

        ticketSelect.addEventListener("change", updateSummary);
        typeSelect.addEventListener("change", updateSummary);
        updateSummary();
    }

    
    //  COUPON SYSTEM //
    
    const discountInput = document.createElement("input");
    discountInput.placeholder = "Enter coupon code";
    discountInput.style.marginTop = "10px";

    document.querySelector(".booking-form-box").appendChild(discountInput);

    discountInput.addEventListener("blur", () => {
        if (discountInput.value.toLowerCase() === "save10") {
            alert("🎉 10% Discount Applied!");
            basePrice *= 0.9;
            updatePrice();
        }
    });

    
    //  SUBMIT -CONFIRMATION  //
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        localStorage.setItem("name", nameInput.value);
        localStorage.setItem("email", emailInput.value);

        const btn = document.querySelector(".booking-submit-btn");
        btn.innerText = "Processing...";
        btn.disabled = true;

        setTimeout(() => {
            window.location.href = "confirmation.html";
        }, 1500);
    });

});