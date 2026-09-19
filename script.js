/* =====================================================
   KAIARA GARDEN
   Main Website JavaScript
===================================================== */


/* =====================================================
   1. MOBILE MENU
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");

        if (navMenu.classList.contains("active")) {
            menuToggle.textContent = "×";
        } else {
            menuToggle.textContent = "☰";
        }
    });


    // Close menu when a navigation link is clicked

    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("active");
            menuToggle.textContent = "☰";

        });

    });

}


/* =====================================================
   2. FAQ ACCORDION
===================================================== */

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const currentItem = question.parentElement;

        // Close other FAQ items

        document.querySelectorAll(".faq-item").forEach(item => {

            if (item !== currentItem) {
                item.classList.remove("active");
            }

        });

        // Toggle current FAQ

        currentItem.classList.toggle("active");

    });

});


/* =====================================================
   3. NAVBAR SCROLL EFFECT
===================================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.boxShadow =
            "0 4px 20px rgba(0,0,0,0.06)";

    } else {

        navbar.style.boxShadow = "none";

    }

});


/* =====================================================
   4. SMOOTH SCROLL
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            const navbarHeight = navbar
                ? navbar.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        }

    });

});


/* =====================================================
   5. SIMPLE REVEAL ANIMATION
===================================================== */

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".intro-grid, " +
    ".room-card, " +
    ".facility, " +
    ".experience-content, " +
    ".cafe-content, " +
    ".gallery-item, " +
    ".location-grid, " +
    ".faq-container"
);

const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);

revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* =====================================================
   6. CURRENT YEAR
===================================================== */

const yearElement = document.querySelector(".footer-bottom span");

if (yearElement) {

    const currentYear = new Date().getFullYear();

    yearElement.textContent =
        `© ${currentYear} Kaiara Garden`;

}


/* =====================================================
   7. WHATSAPP BOOKING
===================================================== */

/*
   🔴 [ISI NOMOR WHATSAPP]

   Nanti nomor WhatsApp cukup dimasukkan
   di index.html pada bagian:

   https://wa.me/XXXXXXXXXXX

   Contoh format:
   https://wa.me/628123456789
*/


const bookingButtons =
    document.querySelectorAll('a[href*="wa.me"]');

bookingButtons.forEach(button => {

    button.addEventListener("click", () => {

        console.log(
            "Kaiara Garden booking button clicked."
        );

    });

});


/* =====================================================
   8. PAGE LOADED
===================================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

    console.log(
        "Kaiara Garden website loaded successfully."
    );

});