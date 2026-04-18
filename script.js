
// FILTER EVENTS //

const filterBtns = document.querySelectorAll(".filter-btn");
const eventCards = document.querySelectorAll(".event-card");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".filter-btn.active").classList.remove("active");
        btn.classList.add("active");

        const filter = btn.getAttribute("data-filter");

        eventCards.forEach(card => {
            if (filter === "all" || card.dataset.category === filter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});

// LIVE SEARCH  //

const searchInput = document.querySelector(".navbar-s2 input");

searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();

    eventCards.forEach(card => {
        const title = card.querySelector("h3").innerText.toLowerCase();

        if (title.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

// SORT BY PRICE //

const sortBtn = document.createElement("button");
sortBtn.innerText = "Sort by Price ↑";
sortBtn.classList.add("filter-btn");
document.querySelector(".events-filter-bar").appendChild(sortBtn);

let ascending = true;

sortBtn.addEventListener("click", () => {
    const container = document.querySelector(".events-grid");
    const cardsArray = Array.from(eventCards);

    cardsArray.sort((a, b) => {
        const priceA = getPrice(a);
        const priceB = getPrice(b);
        return ascending ? priceA - priceB : priceB - priceA;
    });

    container.innerHTML = "";
    cardsArray.forEach(card => container.appendChild(card));

    ascending = !ascending;
    sortBtn.innerText = ascending ? "Sort by Price ↑" : "Sort by Price ↓";
});

function getPrice(card) {
    const priceText = card.querySelector(".event-price").innerText;
    if (priceText.toLowerCase().includes("free")) return 0;
    return parseInt(priceText.replace("₹", ""));
}

// FAVORITE LIKE BUTTON //

eventCards.forEach(card => {
    const heart = document.createElement("span");
    heart.innerHTML = "❤️";
    heart.style.cursor = "pointer";
    heart.style.float = "right";

    card.querySelector(".event-card-body").prepend(heart);

    heart.addEventListener("click", () => {
        heart.classList.toggle("liked");

        if (heart.classList.contains("liked")) {
            heart.innerHTML = "💖";
        } else {
            heart.innerHTML = "❤️";
        }
    });
});

// SCROLL ANIMATION //

function revealCards() {
    eventCards.forEach(card => {
        const rect = card.getBoundingClientRect();

        if (rect.top < window.innerHeight - 50) {
            card.style.opacity = 1;
            card.style.transform = "translateY(0)";
        }
    });
}
window.addEventListener("scroll", revealCards);
window.addEventListener("load", revealCards);
eventCards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = "translateY(50px)";
    card.style.transition = "0.5s ease";
});

// SAVE DATA IN LOCAL STORAGE //

document.querySelectorAll(".event-book-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        const card = e.target.closest(".event-card");
        const title = card.querySelector("h3").innerText;

        localStorage.setItem("selectedEvent", title);
    });
});
document.addEventListener("DOMContentLoaded", () => {

    let visibleCards = [];
    let index = -1;

    function getVisibleCards() {
        return Array.from(document.querySelectorAll(".event-card"))
            .filter(card => card.style.display !== "none");
    }

    function highlightCard() {
        const allCards = document.querySelectorAll(".event-card");

        allCards.forEach(card => {
            card.style.outline = "none";
            card.style.transform = "scale(1)";
        });

        if (index === -1 || visibleCards.length === 0) return;

        const activeCard = visibleCards[index];

        activeCard.style.outline = "3px solid #007bff";
        activeCard.style.transform = "scale(1.05)";

        activeCard.scrollIntoView({
            behavior: "auto",
            inline: "center",
            block: "nearest"
        });
    }
    document.querySelectorAll(".event-card").forEach(card => {
        card.addEventListener("click", () => {
            visibleCards = getVisibleCards();
            index = visibleCards.indexOf(card);
            highlightCard();
        });
    });

    // KEYBOARD NAVIGATION //
    
    document.addEventListener("keydown", (e) => {

        visibleCards = getVisibleCards();

        if (index === -1 || visibleCards.length === 0) return;

        if (e.key === "ArrowRight") {
            index = Math.min(index + 1, visibleCards.length - 1);
            highlightCard();
        }

        if (e.key === "ArrowLeft") {
            index = Math.max(index - 1, 0);
            highlightCard();
        }

    });
});
function togglemenu(){
    document.getElementById("navlinks").classList.classList.toggle("active");

}










