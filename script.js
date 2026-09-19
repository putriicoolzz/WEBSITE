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

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const currentItem = question.parentElement;

        // Close other FAQ items

        document
            .querySelectorAll(".faq-item")
            .forEach(item => {

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

    if (!navbar) return;

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

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");

                if (targetId === "#") return;

                const target =
                    document.querySelector(targetId);

                if (target) {

                    event.preventDefault();

                    const navbarHeight =
                        navbar
                            ? navbar.offsetHeight
                            : 0;

                    const targetPosition =
                        target
                            .getBoundingClientRect()
                            .top +
                        window.scrollY -
                        navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });

                }

            }
        );

    });


/* =====================================================
   5. SIMPLE REVEAL ANIMATION
===================================================== */

const revealElements =
    document.querySelectorAll(
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

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target
                        .classList
                        .add("visible");

                    revealObserver
                        .unobserve(entry.target);

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

const yearElement =
    document.querySelector(
        ".footer-bottom span"
    );

if (yearElement) {

    const currentYear =
        new Date().getFullYear();

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
    document.querySelectorAll(
        'a[href*="wa.me"]'
    );

bookingButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            console.log(
                "Kaiara Garden booking button clicked."
            );

        }
    );

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


/* =====================================================
   9. ROOM FULLSCREEN GALLERY
===================================================== */

const fullscreenGallery =
    document.getElementById(
        "fullscreenGallery"
    );

const galleryImage =
    document.getElementById(
        "galleryImage"
    );

const galleryClose =
    document.getElementById(
        "galleryClose"
    );

const galleryPrev =
    document.getElementById(
        "galleryPrev"
    );

const galleryNext =
    document.getElementById(
        "galleryNext"
    );

const galleryCounter =
    document.getElementById(
        "galleryCounter"
    );

const galleryDots =
    document.getElementById(
        "galleryDots"
    );


/* -----------------------------------------
   TEMPORARY PHOTO DATA

   Nanti bagian ini diganti dengan
   file foto asli.

   Jumlah foto boleh lebih dari 4.
----------------------------------------- */

const roomGalleryPhotos = [

    "🔴 [ISI FOTO KAMAR 1]",
    "🔴 [ISI FOTO KAMAR 2]",
    "🔴 [ISI FOTO KAMAR 3]",
    "🔴 [ISI FOTO KAMAR 4]",
    "🔴 [ISI FOTO KAMAR 5]",
    "🔴 [ISI FOTO KAMAR 6]"

];


let currentGalleryIndex = 0;


/* -----------------------------------------
   CREATE DOTS
----------------------------------------- */

function createGalleryDots() {

    if (!galleryDots) return;

    galleryDots.innerHTML = "";

    roomGalleryPhotos.forEach(
        (photo, index) => {

            const dot =
                document.createElement(
                    "button"
                );

            dot.classList.add(
                "gallery-dot"
            );

            dot.setAttribute(
                "type",
                "button"
            );

            dot.setAttribute(
                "aria-label",
                `View photo ${index + 1}`
            );

            dot.addEventListener(
                "click",
                () => {

                    currentGalleryIndex =
                        index;

                    updateGallery();

                }
            );

            galleryDots.appendChild(dot);

        }
    );

}


/* -----------------------------------------
   UPDATE PHOTO
----------------------------------------- */

function updateGallery() {

    if (
        !galleryImage ||
        !galleryCounter ||
        !galleryDots
    ) {
        return;
    }

    galleryImage.textContent =
        roomGalleryPhotos[
            currentGalleryIndex
        ];

    galleryCounter.textContent =
        `${currentGalleryIndex + 1} / ${roomGalleryPhotos.length}`;

    const dots =
        galleryDots.querySelectorAll(
            ".gallery-dot"
        );

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentGalleryIndex
        );

    });

}


/* -----------------------------------------
   CHANGE GALLERY PHOTO
   Desktop: soft fade
----------------------------------------- */

function changeGalleryPhoto(direction) {

    if (!galleryImage) return;

    galleryImage.classList.add(
        "gallery-fade"
    );

    setTimeout(() => {

        if (direction === "next") {

            currentGalleryIndex++;

            if (
                currentGalleryIndex >=
                roomGalleryPhotos.length
            ) {

                currentGalleryIndex = 0;

            }

        } else {

            currentGalleryIndex--;

            if (
                currentGalleryIndex < 0
            ) {

                currentGalleryIndex =
                    roomGalleryPhotos.length - 1;

            }

        }

        updateGallery();

        galleryImage.classList.remove(
            "gallery-fade"
        );

    }, 180);

}


/* -----------------------------------------
   OPEN GALLERY
----------------------------------------- */

function openFullscreenGallery(
    index = 0
) {

    if (!fullscreenGallery) return;

    currentGalleryIndex = index;

    createGalleryDots();

    updateGallery();

    fullscreenGallery
        .classList
        .add("active");

    fullscreenGallery.setAttribute(
        "aria-hidden",
        "false"
    );

}


/* -----------------------------------------
   CLOSE GALLERY
----------------------------------------- */

function closeFullscreenGallery() {

    if (!fullscreenGallery) return;

    fullscreenGallery
        .classList
        .remove("active");

    fullscreenGallery.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* -----------------------------------------
   NEXT PHOTO
----------------------------------------- */

function nextGalleryPhoto() {

    changeGalleryPhoto("next");

}


/* -----------------------------------------
   PREVIOUS PHOTO
----------------------------------------- */

function previousGalleryPhoto() {

    changeGalleryPhoto("previous");

}


/* -----------------------------------------
   CLICK STATIC ROOM PHOTOS
----------------------------------------- */

document.addEventListener(
    "click",
    function (event) {

        const photo =
            event.target.closest(
                ".gallery-photo"
            );

        if (!photo) return;

        const index =
            Number(
                photo.dataset.photoIndex
            ) || 0;

        openFullscreenGallery(index);

    }
);


/* -----------------------------------------
   GALLERY CONTROLS
----------------------------------------- */

if (galleryNext) {

    galleryNext.addEventListener(
        "click",
        nextGalleryPhoto
    );

}

if (galleryPrev) {

    galleryPrev.addEventListener(
        "click",
        previousGalleryPhoto
    );

}

if (galleryClose) {

    galleryClose.addEventListener(
        "click",
        closeFullscreenGallery
    );

}


/* -----------------------------------------
   KEYBOARD CONTROLS
----------------------------------------- */

document.addEventListener(
    "keydown",
    event => {

        if (
            !fullscreenGallery ||
            !fullscreenGallery
                .classList
                .contains("active")
        ) {
            return;
        }

        if (
            event.key === "ArrowRight"
        ) {

            nextGalleryPhoto();

        }

        if (
            event.key === "ArrowLeft"
        ) {

            previousGalleryPhoto();

        }

        if (
            event.key === "Escape"
        ) {

            closeFullscreenGallery();

        }

    }
);