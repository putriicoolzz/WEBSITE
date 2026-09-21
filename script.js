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
        ".experience-grid, " +
        ".cafe-grid, " +
        ".gallery-item, " +
        ".location-grid, " +
        ".faq-container, " +
        ".booking-content"
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

/* =====================================================
   10. FACILITY DETAIL MODAL
===================================================== */

const facilityModal =
    document.getElementById("facilityModal");

const facilityModalBackdrop =
    document.querySelector(".facility-modal-backdrop");

const facilityModalClose =
    document.querySelector(".facility-modal-close");

const facilityModalName =
    document.getElementById("facilityModalName");

const facilityModalImage =
    document.getElementById("facilityModalImage");

const facilityModalHighlight =
    document.getElementById("facilityModalHighlight");

const facilityModalDescription =
    document.getElementById("facilityModalDescription");

const facilityModalDetails =
    document.getElementById("facilityModalDetails");


const facilityData = {

    garden: {
        name: "Garden",

        image:
            "🔴 [ISI FOTO GARDEN]",

        highlight:
            "Green spaces woven throughout Kaiara.",

        description:
            "Thoughtfully landscaped spaces surround Kaiara, creating quiet corners for fresh air, slow walks, and unhurried moments throughout your stay.",

        details: [
        {
            label: "Access",
            value: "Available throughout your stay"
        },
        {
            label: "Garden Areas",
            value: "Landscaped green spaces across the property"
        },
        {
            label: "A Gentle Reminder",
            value: "Please enjoy the garden with consideration for other guests"
         }
        ],

        guidelinesTitle: null,
        guidelines: [],
        guidelinesNote: ""
    },


    pool: {
        name: "Swimming Pool",

        image:
            "🔴 [ISI FOTO SWIMMING POOL]",

        highlight:
            "An easy pause surrounded by greenery.",

        description:
            "Set within Kaiara’s garden surroundings, our swimming pool is a refreshing place to cool down, slow the pace, and enjoy an easy afternoon.",

        details: [
        {
            label: "Opening Hours",
            value: "07:00 – 20:00"
        },
        {
            label: "Access",
            value: "Registered staying guests"
        },
        {
            label: "Swimwear",
            value: "Proper swimwear required"
        },
        {
            label: "Child Supervision",
            value: "Adult supervision required"
        },
        {
            label: "Event Use",
            value: "Available as part of selected event arrangements"           
        }
        ],

        guidelinesTitle:
            "View Pool Guidelines",

        guidelines: [
            "Please shower before entering the pool.",
            "Appropriate swimwear must be worn at all times.",
            "Children must be accompanied and supervised by an adult at all times.",
            "Running, diving, and rough play are not permitted.",
            "Food, beverages, and glassware are not permitted in the pool area.",
            "Please keep noise at a considerate level for the comfort of other guests.",
            "Guests with open wounds or infectious conditions should refrain from using the pool.",
            "Use of the pool while under the influence of alcohol or drugs is not permitted.",
            "Please use the pool responsibly and follow any additional guidance provided by the Kaiara team."
        ],

        guidelinesNote:
            "Thank you for helping us keep the pool safe and enjoyable for everyone."
    },


    jacuzzi: {
        name: "Jacuzzi",

        image:
            "🔴 [ISI FOTO JACUZZI]",

        highlight:
            "A warm corner made for slowing down.",

        description:
            "Settle in and unwind with a warm, relaxing soak — a quiet moment to slow down during your stay at Kaiara.",

        details: [
        {
            label: "Available Hours",
            value: "08:00 – 21:00"
        },
        {
            label: "Access",
            value: "Registered staying guests"
        },
        {
            label: "Reservation",
            value: "Advance reservation required"
        },
        {
            label: "Recommended Session",
            value: "15–20 minutes"
        },
        {
            label: "Swimwear",
            value: "Proper swimwear required"
        }
        ],

        guidelinesTitle:
            "View Jacuzzi Guidelines",

        guidelines: [
            "Please shower before entering the jacuzzi.",
            "Appropriate swimwear must be worn at all times.",
            "We recommend limiting each session to 15–20 minutes.",
            "Children must be accompanied and closely supervised by an adult at all times.",
            "Guests with medical conditions or other health concerns are advised to consult a healthcare professional before use.",
            "Use of the jacuzzi while under the influence of alcohol or drugs is not permitted.",
            "Food, beverages, and glassware are not permitted in the jacuzzi area.",
            "Please respect your reserved session time for the comfort of other guests.",
            "Please switch off the jacuzzi after use, unless otherwise instructed by our team.",
            "Please follow any additional guidance provided by the Kaiara team."
        ],

        guidelinesNote:
            "Thank you for helping us keep the jacuzzi safe, relaxing, and enjoyable for everyone."
    },


    "mini-gym": {
        name: "Mini Gym",

        image:
            "🔴 [ISI FOTO MINI GYM]",

        highlight:
            "A simple space to keep moving during your stay.",

        description:
            "Our mini gym offers a convenient space for a light workout, making it easy to stay active while enjoying a slower stay at Kaiara.",

        details: [
        {
            label: "Opening Hours",
            value: "07:00 – 21:00"
        },
        {
            label: "Access",
            value: "Registered staying guests"
        },
        {
            label: "Attire",
            value: "Proper sportswear and athletic footwear required"
        },
        {
            label: "After Use",
            value: "Please sanitize and return equipment"
        }
        ],

        guidelinesTitle:
            "View Gym Guidelines",

        guidelines: [
            "Proper sportswear and athletic footwear must be worn while using the gym.",
            "Please use all equipment responsibly and only for its intended purpose.",
            "Equipment should be sanitized before and after use using the cleaning materials provided.",
            "Please use a towel when using benches and mats.",
            "Guests under 16 years of age must be accompanied and supervised by an adult.",
            "Guests with medical conditions, injuries, or other health concerns are advised to consult a healthcare professional before exercising.",
            "Use of the gym while under the influence of alcohol or drugs is not permitted.",
            "Please return all equipment to its designated place after use.",
            "Please keep noise at a considerate level for the comfort of other guests.",
            "Stop exercising immediately if you feel unwell or experience discomfort."
        ],

        guidelinesNote:
            "Thank you for helping us keep the space clean, safe, and comfortable for everyone."
    }

};


/* -----------------------------------------
   OPEN FACILITY MODAL
----------------------------------------- */

function openFacilityModal(facilityKey) {

    if (!facilityModal) return;

    const data =
        facilityData[facilityKey];

    if (!data) return;


    /* BASIC INFORMATION */

    if (facilityModalName) {
        facilityModalName.textContent =
            data.name;
    }

    if (facilityModalImage) {
        facilityModalImage.textContent =
            data.image;
    }

    if (facilityModalHighlight) {
        facilityModalHighlight.textContent =
            data.highlight;
    }

    if (facilityModalDescription) {
        facilityModalDescription.textContent =
            data.description;
    }


    /* GOOD TO KNOW */
if (facilityModalDetails) {

    facilityModalDetails.innerHTML = "";

    data.details.forEach(detail => {

        const item =
            document.createElement("div");

        item.className =
            "facility-detail-item";


        const label =
            document.createElement("span");

        label.className =
            "facility-detail-label";

        label.textContent =
            detail.label;


        const value =
            document.createElement("span");

        value.className =
            "facility-detail-value";

        value.textContent =
            detail.value;


        item.appendChild(label);
        item.appendChild(value);

        facilityModalDetails.appendChild(item);

    });

}


    /* FACILITY GUIDELINES */

    const guidelinesContainer =
        document.getElementById(
            "facilityGuidelines"
        );

    const guidelinesToggle =
        document.getElementById(
            "facilityGuidelinesToggle"
        );

    const guidelinesToggleText =
        document.getElementById(
            "facilityGuidelinesToggleText"
        );

    const guidelinesContent =
        document.getElementById(
            "facilityGuidelinesContent"
        );

    const guidelinesList =
        document.getElementById(
            "facilityGuidelinesList"
        );

    const guidelinesNote =
        document.getElementById(
            "facilityGuidelinesNote"
        );


    /* Reset accordion every time modal opens */

   if (guidelinesToggle) {

    guidelinesToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    const guidelinesArrow =
        guidelinesToggle.querySelector(
            ".facility-guidelines-arrow"
        );

    if (guidelinesArrow) {
        guidelinesArrow.textContent = "↓";
    }

}

if (guidelinesContent) {

    guidelinesContent.classList.remove(
        "active"
    );

}

    /* Show guidelines only when available */

    if (
        guidelinesContainer &&
        data.guidelines &&
        data.guidelines.length > 0
    ) {

        guidelinesContainer.hidden = false;

        if (guidelinesToggleText) {
            guidelinesToggleText.textContent =
                data.guidelinesTitle;
        }

        if (guidelinesList) {

            guidelinesList.innerHTML = "";

            data.guidelines.forEach(
                guideline => {

                    const item =
                        document.createElement(
                            "li"
                        );

                    item.textContent =
                        guideline;

                    guidelinesList
                        .appendChild(item);

                }
            );

        }

        if (guidelinesNote) {
            guidelinesNote.textContent =
                data.guidelinesNote;
        }

    } else if (guidelinesContainer) {

        guidelinesContainer.hidden = true;

    }


    /* OPEN MODAL */

    facilityModal
        .classList
        .add("active");

    facilityModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body
        .classList
        .add("facility-modal-open");

}


/* -----------------------------------------
   CLOSE FACILITY MODAL
----------------------------------------- */

function closeFacilityModal() {

    if (!facilityModal) return;

    facilityModal
        .classList
        .remove("active");

    facilityModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body
        .classList
        .remove("facility-modal-open");

}


/* -----------------------------------------
   FACILITY CARD CLICKS

   Garden
   Swimming Pool
   Jacuzzi
   Mini Gym

   Café + Gatherings remain normal links.
----------------------------------------- */

document
    .querySelectorAll(
        '.facility[href="#garden"], ' +
        '.facility[href="#pool"], ' +
        '.facility[href="#jacuzzi"], ' +
        '.facility[href="#mini-gym"]'
    )
    .forEach(card => {

        card.addEventListener(
            "click",
            event => {

                event.preventDefault();

                const facilityKey =
                    card
                        .getAttribute("href")
                        .replace("#", "");

                openFacilityModal(
                    facilityKey
                );

            }
        );

    });


/* -----------------------------------------
   CLOSE BUTTON
----------------------------------------- */

if (facilityModalClose) {

    facilityModalClose.addEventListener(
        "click",
        closeFacilityModal
    );

}


/* -----------------------------------------
   CLICK BACKDROP TO CLOSE
----------------------------------------- */

if (facilityModalBackdrop) {

    facilityModalBackdrop.addEventListener(
        "click",
        closeFacilityModal
    );

}


/* -----------------------------------------
   ESC KEY TO CLOSE
----------------------------------------- */

document.addEventListener(
    "keydown",
    event => {

        if (
            !facilityModal ||
            !facilityModal
                .classList
                .contains("active")
        ) {
            return;
        }

        if (event.key === "Escape") {
            closeFacilityModal();
        }

    }
);

/* -----------------------------------------
   FACILITY GUIDELINES ACCORDION
----------------------------------------- */

const facilityGuidelinesToggle =
    document.getElementById(
        "facilityGuidelinesToggle"
    );

const facilityGuidelinesContent =
    document.getElementById(
        "facilityGuidelinesContent"
    );

if (
    facilityGuidelinesToggle &&
    facilityGuidelinesContent
) {

    facilityGuidelinesToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                facilityGuidelinesToggle
                    .getAttribute(
                        "aria-expanded"
                    ) === "true";


            facilityGuidelinesToggle
                .setAttribute(
                    "aria-expanded",
                    String(!isOpen)
                );


            facilityGuidelinesContent
                .classList.toggle(
                    "active",
                    !isOpen
                );


            const arrow =
                facilityGuidelinesToggle
                    .querySelector(
                        ".facility-guidelines-arrow"
                    );

            if (arrow) {
                arrow.textContent =
                    isOpen ? "↓" : "↑";
            }

        }
    );

}

/* =====================================================
   11. KAIARA CAFE DETAIL MODAL
===================================================== */

const cafeModal =
    document.getElementById("cafeModal");

const openCafeModalButton =
    document.getElementById("openCafeModal");

const cafeModalClose =
    document.querySelector(".cafe-modal-close");

const cafeModalBackdrop =
    document.querySelector(".cafe-modal-backdrop");


/* -----------------------------------------
   OPEN CAFE MODAL
----------------------------------------- */

function openCafeModal() {

    if (!cafeModal) return;

    cafeModal.classList.add("active");

    cafeModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "cafe-modal-open"
    );

}


/* -----------------------------------------
   CLOSE CAFE MODAL
----------------------------------------- */

function closeCafeModal() {

    if (!cafeModal) return;

    cafeModal.classList.remove("active");

    cafeModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "cafe-modal-open"
    );

}


/* -----------------------------------------
   OPEN CAFE MODAL BUTTON
----------------------------------------- */

if (openCafeModalButton) {

    openCafeModalButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            openCafeModal();

        }
    );

}


/* -----------------------------------------
   CLOSE BUTTON
----------------------------------------- */

if (cafeModalClose) {

    cafeModalClose.addEventListener(
        "click",
        closeCafeModal
    );

}


/* -----------------------------------------
   CLICK BACKDROP TO CLOSE
----------------------------------------- */

if (cafeModalBackdrop) {

    cafeModalBackdrop.addEventListener(
        "click",
        closeCafeModal
    );

}


/* -----------------------------------------
   ESC KEY TO CLOSE
----------------------------------------- */

document.addEventListener(
    "keydown",
    event => {

        if (
            !cafeModal ||
            !cafeModal
                .classList
                .contains("active")
        ) {
            return;
        }

        if (event.key === "Escape") {

            closeCafeModal();

        }

    }
);

/* =====================================================
   12. CAFE TABLE RESERVATION
===================================================== */

const CAFE_RESERVATION_API =
    "https://script.google.com/macros/s/AKfycbyBxDhZ95RvNnH5uyNGuvJBu9PlxKEfDy11TY1O6e-qg2VVA1TkNpB2CDa7lCYr2AmPGA/exec";

const cafeReservationForm =
    document.getElementById("cafeReservationForm");

const cafeReservationModal =
    document.getElementById("cafeReservationModal");

const cafeReservationButton =
    document.querySelector(".cafe-reservation-link");

const cafeReservationClose =
    document.querySelector(".cafe-reservation-close");

const cafeReservationBackdrop =
    document.querySelector(".cafe-reservation-backdrop");

const cafeReservationBack =
    document.getElementById("cafeReservationBack");

/* -----------------------------------------
   OPEN RESERVATION FORM
----------------------------------------- */

function openCafeReservation() {

    if (!cafeReservationModal) return;

    /* Close Café Detail Modal first */

    closeCafeModal();

    /* Open Reservation Modal */

    cafeReservationModal.classList.add(
        "active"
    );

    cafeReservationModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "cafe-reservation-open"
    );

}


/* -----------------------------------------
   CLOSE RESERVATION FORM
----------------------------------------- */

function closeCafeReservation() {

    if (!cafeReservationModal) return;

    cafeReservationModal.classList.remove(
        "active"
    );

    cafeReservationModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "cafe-reservation-open"
    );

}


/* -----------------------------------------
   RESERVE A TABLE BUTTON
----------------------------------------- */

if (cafeReservationButton) {

    cafeReservationButton.addEventListener(
        "click",
        event => {

            event.preventDefault();

            openCafeReservation();

        }
    );

}


/* -----------------------------------------
   CLOSE BUTTON
----------------------------------------- */

if (cafeReservationClose) {

    cafeReservationClose.addEventListener(
        "click",
        closeCafeReservation
    );

}


/* -----------------------------------------
   CLICK BACKDROP TO CLOSE
----------------------------------------- */

if (cafeReservationBackdrop) {

    cafeReservationBackdrop.addEventListener(
        "click",
        closeCafeReservation
    );

}


/* -----------------------------------------
   ESC KEY TO CLOSE
----------------------------------------- */

document.addEventListener(
    "keydown",
    event => {

        if (
            !cafeReservationModal ||
            !cafeReservationModal
                .classList
                .contains("active")
        ) {
            return;
        }

        if (event.key === "Escape") {

            closeCafeReservation();

        }

    }
);

/* -----------------------------------------
   BACK TO CAFE DETAIL
----------------------------------------- */

if (cafeReservationBack) {

    cafeReservationBack.addEventListener(
        "click",
        () => {

            closeCafeReservation();

            openCafeModal();

        }
    );

}

/* -----------------------------------------
   SUBMIT CAFE RESERVATION
----------------------------------------- */

if (cafeReservationForm) {

    cafeReservationForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            const submitButton =
                cafeReservationForm.querySelector(
                    'button[type="submit"]'
                );

            const reservationData = {

                name:
                    document.getElementById(
                        "cafeGuestName"
                    ).value,

                whatsapp:
                    document.getElementById(
                        "cafeGuestPhone"
                    ).value,

                date:
                    document.getElementById(
                        "cafeReservationDate"
                    ).value,

                time:
                    document.getElementById(
                        "cafeReservationTime"
                    ).value,

                guests:
                    document.getElementById(
                        "cafeGuestCount"
                    ).value,

                notes:
                    document.getElementById(
                        "cafeReservationNotes"
                    ).value

            };

            try {

                submitButton.disabled = true;
                submitButton.textContent =
                    "Sending...";

                const response =
                    await fetch(
                        CAFE_RESERVATION_API,
                        {
                            method: "POST",
                            body: JSON.stringify(
                                reservationData
                            )
                        }
                    );

                const result =
                    await response.json();

                if (!result.success) {
                    throw new Error(
                        "Reservation could not be saved."
                    );
                }

                alert(
                    "Test reservation saved successfully.\n\n" +
                    "Reservation ID: " +
                    result.reservationId
                );

            }

            catch (error) {

                console.error(
                    "Reservation error:",
                    error
                );

                alert(
                    "We couldn't save the reservation. " +
                    "Please try again."
                );

            }

            finally {

                submitButton.disabled = false;
                submitButton.textContent =
                    "Continue via WhatsApp";

            }

        }
    );

}