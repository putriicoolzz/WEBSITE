/* =====================================================
   KAIARA GARDEN
   Main Website JavaScript
===================================================== */


/* =====================================================
   0. CENTRAL CONFIGURATION

   Isi data yang berubah-ubah cukup di sini.
===================================================== */

const KAIARA_CONFIG = {

    /* WhatsApp — gunakan format 62..., tanpa + */
    stayWhatsapp: "628112250138",
    cafeWhatsapp: "6285117195790",
    eventsWhatsapp: "6285117195790",

    /* Contact */
    email: "kaiaragarden@gmail.com",

    /* Instagram */
    instagramHandle: "@kaiara.garden",
    instagramUrl: "",

    /* External links */
    cafeMenuUrl: "",
    mapsDirectionsUrl: "https://maps.app.goo.gl/qaK2VA8FExLWAdjB9",

    /* Café reservation Google Apps Script */
    cafeReservationApi:
        "https://script.google.com/macros/s/AKfycbyBxDhZ95RvNnH5uyNGuvJBu9PlxKEfDy11TY1O6e-qg2VVA1TkNpB2CDa7lCYr2AmPGA/exec",

    /* Event inquiry — belum diisi */
    eventInquiryApi:
        "https://script.google.com/macros/s/AKfycbyBxDhZ95RvNnH5uyNGuvJBu9PlxKEfDy11TY1O6e-qg2VVA1TkNpB2CDa7lCYr2AmPGA/exec"

};


/* =====================================================
   CONFIG HELPERS
===================================================== */

function makeWhatsAppUrl(number, message = "") {

    if (!number) return "#";

    const baseUrl =
        `https://wa.me/${number}`;

    if (!message) {
        return baseUrl;
    }

    return (
        baseUrl +
        "?text=" +
        encodeURIComponent(message)
    );

}


function applyWebsiteConfig() {

    /* -----------------------------------------
       TEXT VALUES
    ----------------------------------------- */

    document
        .querySelectorAll(
            '[data-config="stayWhatsappDisplay"]'
        )
        .forEach(element => {

            element.textContent =
                KAIARA_CONFIG.stayWhatsapp ||
                "🔴 [STAY WHATSAPP]";

        });


    document
        .querySelectorAll(
            '[data-config="cafeWhatsappDisplay"]'
        )
        .forEach(element => {

            element.textContent =
                KAIARA_CONFIG.cafeWhatsapp ||
                "🔴 [CAFÉ WHATSAPP]";

        });


    document
        .querySelectorAll(
            '[data-config="email"]'
        )
        .forEach(element => {

            element.textContent =
                KAIARA_CONFIG.email ||
                "🔴 [EMAIL]";

        });


    document
        .querySelectorAll(
            '[data-config="instagramHandle"]'
        )
        .forEach(element => {

            element.textContent =
                KAIARA_CONFIG.instagramHandle;

        });


    /* -----------------------------------------
       STAY WHATSAPP
    ----------------------------------------- */

    const stayMessage =
        `Hello Kaiara Garden, I would like to check availability for a stay.`;

    document
        .querySelectorAll(
            ".stay-whatsapp-link"
        )
        .forEach(link => {

            link.href =
                makeWhatsAppUrl(
                    KAIARA_CONFIG.stayWhatsapp,
                    stayMessage
                );

        });


    /* -----------------------------------------
       CAFÉ WHATSAPP
    ----------------------------------------- */

    document
        .querySelectorAll(
            ".cafe-whatsapp-link"
        )
        .forEach(link => {

            link.href =
                makeWhatsAppUrl(
                    KAIARA_CONFIG.cafeWhatsapp
                );

        });


    /* -----------------------------------------
       EVENTS WHATSAPP
    ----------------------------------------- */

    document
        .querySelectorAll(
            ".events-whatsapp-link"
        )
        .forEach(link => {

            link.href =
                makeWhatsAppUrl(
                    KAIARA_CONFIG.eventsWhatsapp
                );

        });


    /* -----------------------------------------
       EMAIL
    ----------------------------------------- */

    document
        .querySelectorAll(
            ".email-link"
        )
        .forEach(link => {

            link.href =
                KAIARA_CONFIG.email
                    ? `mailto:${KAIARA_CONFIG.email}`
                    : "#";

        });


    /* -----------------------------------------
       INSTAGRAM
    ----------------------------------------- */

    document
        .querySelectorAll(
            ".instagram-link"
        )
        .forEach(link => {

            link.href =
                KAIARA_CONFIG.instagramUrl || "#";

        });


    /* -----------------------------------------
       CAFÉ MENU
    ----------------------------------------- */

    document
        .querySelectorAll(
            ".cafe-menu-button"
        )
        .forEach(link => {

            link.href =
                KAIARA_CONFIG.cafeMenuUrl || "#";

        });


    /* -----------------------------------------
       GOOGLE MAPS DIRECTIONS
    ----------------------------------------- */

    document
        .querySelectorAll(
            ".maps-directions-link"
        )
        .forEach(link => {

            link.href =
                KAIARA_CONFIG.mapsDirectionsUrl || "#";

        });

}


applyWebsiteConfig();


/* =====================================================
   1. MOBILE MENU
===================================================== */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.querySelector(".nav-menu");


function openMobileMenu() {

    if (!menuToggle || !navMenu) return;

    navMenu.classList.add("active");

    menuToggle.textContent = "×";

    menuToggle.setAttribute(
        "aria-label",
        "Close menu"
    );

    menuToggle.setAttribute(
        "aria-expanded",
        "true"
    );

}


function closeMobileMenu() {

    if (!menuToggle || !navMenu) return;

    navMenu.classList.remove("active");

    menuToggle.textContent = "☰";

    menuToggle.setAttribute(
        "aria-label",
        "Open menu"
    );

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

}


if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            if (
                navMenu.classList.contains(
                    "active"
                )
            ) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        }
    );


    navMenu
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeMobileMenu
            );

        });


    document.addEventListener(
        "click",
        event => {

            if (
                !navMenu.classList.contains(
                    "active"
                )
            ) {
                return;
            }

            if (
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                closeMobileMenu();

            }

        }
    );


    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 850 &&
                navMenu.classList.contains(
                    "active"
                )
            ) {

                closeMobileMenu();

            }

        }
    );

}


/* =====================================================
   2. NAVBAR SCROLL EFFECT

   Desain lama:
   navbar tetap cream.
   Scroll hanya menambahkan shadow.
===================================================== */

const navbar =
    document.querySelector(".navbar");


function updateNavbarShadow() {

    if (!navbar) return;

    if (window.scrollY > 50) {

        navbar.style.boxShadow =
            "0 4px 20px rgba(0,0,0,0.06)";

    } else {

        navbar.style.boxShadow =
            "none";

    }

}


window.addEventListener(
    "scroll",
    updateNavbarShadow
);

updateNavbarShadow();

/* =====================================================
   NAVBAR ACTIVE SECTION
===================================================== */

const navLinks =
    document.querySelectorAll(
        ".nav-link[data-nav]"
    );

const navSections =
    document.querySelectorAll(
        "#about, #stay, #cafe, #experience, #gallery, #location"
    );


function updateActiveNav() {

    let currentSection = "";

    const scrollPosition =
        window.scrollY + 180;


    navSections.forEach(section => {

        if (
            scrollPosition >= section.offsetTop
        ) {

            currentSection =
                section.id;

        }

    });


    navLinks.forEach(link => {

        link.classList.remove(
            "active"
        );

        if (
            link.dataset.nav ===
            currentSection
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav
);

window.addEventListener(
    "resize",
    updateActiveNav
);

updateActiveNav();


/* =====================================================
   3. SMOOTH SCROLL
===================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {

        anchor.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) return;

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
        );

    });


/* =====================================================
   4. REVEAL ANIMATION
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


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }

                    entry.target
                        .classList
                        .add("visible");

                    revealObserver
                        .unobserve(
                            entry.target
                        );

                });

            },

            {
                threshold: 0.12
            }

        );


    revealElements.forEach(
        element => {

            element
                .classList
                .add("reveal");

            revealObserver
                .observe(element);

        }
    );

} else {

    revealElements.forEach(
        element => {

            element
                .classList
                .add("visible");

        }
    );

}


/* =====================================================
   5. CURRENT YEAR
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
   6. FAQ
===================================================== */

const faqQuestions =
    document.querySelectorAll(
        ".faq-question"
    );


faqQuestions.forEach(question => {

    question.addEventListener(
        "click",
        () => {

            const currentItem =
                question.closest(
                    ".faq-item"
                );

            if (!currentItem) return;

            const currentCategory =
                currentItem.closest(
                    ".faq-category"
                );

            if (currentCategory) {

                currentCategory
                    .querySelectorAll(
                        ".faq-item"
                    )
                    .forEach(item => {

                        if (
                            item !==
                            currentItem
                        ) {

                            item.classList
                                .remove(
                                    "active"
                                );

                        }

                    });

            }

            currentItem
                .classList
                .toggle("active");

        }
    );

});


/* =====================================================
   FAQ CATEGORY TABS
===================================================== */

const faqTabs =
    document.querySelectorAll(
        ".faq-tab"
    );

const faqCategories =
    document.querySelectorAll(
        ".faq-category"
    );


faqTabs.forEach(tab => {

    tab.addEventListener(
        "click",
        () => {

            const category =
                tab.dataset.faqCategory;

            faqTabs.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });

            faqCategories.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });

            tab.classList.add(
                "active"
            );

            const selectedCategory =
                document.querySelector(
                    `.faq-category[data-faq-content="${category}"]`
                );

            if (selectedCategory) {

                selectedCategory
                    .classList
                    .add("active");

            }

        }
    );

});


/* =====================================================
   7. PAGE LOADED
===================================================== */

window.addEventListener(
    "load",
    () => {

        document.body
            .classList
            .add("loaded");

    }
);


/* =====================================================
   8. GENERIC ESCAPE — MOBILE MENU
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            navMenu &&
            navMenu.classList.contains(
                "active"
            )
        ) {

            closeMobileMenu();

        }

    }
);


/* =====================================================
   NEXT:
   ROOM DETAIL DATA + ROOM MODAL + FULLSCREEN GALLERY
===================================================== */

/* =====================================================
   9. ROOM DATA

   Homepage card hanya sebagai entry point.
   Detail kamar dikelola dari data di bawah ini.
===================================================== */

const ROOM_DATA = {

    garden: {

        type: "WALNUT ROOM",

        name: "Walnut Garden",

        highlight:
            "A restful room with the garden close by.",

        description:
            "A comfortable room for two with a standing balcony overlooking the garden — an easy place to rest and settle into during your stay.",

        size:
            "Approx. 17.52 m² interior",

        bed:
            "Queen or Twin Beds",

        guests:
            "2 Guests",

        view:
            "Garden View",

        amenities: [
            "Air Conditioning",
            "Wi-Fi",
            "Standing Balcony",
            "Garden View",
            "Private Bathroom"
        ],

        included: [
            "Breakfast for 2 Guests",
            "Access to Shared Guest Facilities",
            "Daily Housekeeping",
            "Wi-Fi"
        ],

        photos: [
            "🔴 [WALNUT GARDEN · PHOTO 1]",
            "🔴 [WALNUT GARDEN · PHOTO 2]",
            "🔴 [WALNUT GARDEN · PHOTO 3]",
            "🔴 [WALNUT GARDEN · PHOTO 4]",
            "🔴 [WALNUT GARDEN · PHOTO 5]",
            "🔴 [WALNUT GARDEN · PHOTO 6]"
        ]

    },


    terrace: {

        type: "WALNUT ROOM",

        name: "Walnut Terrace",

        highlight:
            "A little more room to linger outside.",

        description:
            "A comfortable room for two with its own terrace and outdoor seating — a relaxed extension of the room for an easy morning or quiet afternoon.",

        size:
            "Approx. 24.12 m² including terrace",

        bed:
            "Queen or Twin Beds",

        guests:
            "2 Guests",

        view:
            "Terrace",

        amenities: [
            "Air Conditioning",
            "Wi-Fi",
            "Private Terrace",
            "Outdoor Seating",
            "Private Bathroom"
        ],

        included: [
            "Breakfast for 2 Guests",
            "Access to Shared Guest Facilities",
            "Daily Housekeeping",
            "Wi-Fi"
        ],

        photos: [
            "🔴 [WALNUT TERRACE · PHOTO 1]",
            "🔴 [WALNUT TERRACE · PHOTO 2]",
            "🔴 [WALNUT TERRACE · PHOTO 3]",
            "🔴 [WALNUT TERRACE · PHOTO 4]",
            "🔴 [WALNUT TERRACE · PHOTO 5]",
            "🔴 [WALNUT TERRACE · PHOTO 6]"
        ]

    },


    suite: {

        type: "PINE SUITE",

        name: "Pine Suite",

        highlight:
            "A spacious stay overlooking the pool and main garden.",

        description:
            "A more spacious room for two, with views towards the pool and main garden and a private bathtub for a little more time to unwind.",

        size:
            "🔴 [SIZE TO CONFIRM]",

        bed:
            "King Bed",

        guests:
            "2 Guests",

        view:
            "Pool & Garden View",

        amenities: [
            "King Bed",
            "Air Conditioning",
            "Wi-Fi",
            "Private Bathtub",
            "Television",
            "Pool & Garden View",
            "Private Bathroom"
        ],

        included: [
            "Breakfast for 2 Guests",
            "Access to Shared Guest Facilities",
            "Daily Housekeeping",
            "Wi-Fi"
        ],

        photos: [
            "🔴 [PINE SUITE · PHOTO 1]",
            "🔴 [PINE SUITE · PHOTO 2]",
            "🔴 [PINE SUITE · PHOTO 3]",
            "🔴 [PINE SUITE · PHOTO 4]",
            "🔴 [PINE SUITE · PHOTO 5]",
            "🔴 [PINE SUITE · PHOTO 6]"
        ]

    },


    loft: {

        type: "OAK LOFT",

        name: "Oak Loft",

        highlight:
            "A home-style stay, made for sharing.",

        description:
            "A two-level stay with two bedrooms, shared living and dining spaces, and more room to spend time together — suited to families or small groups.",

        size:
            "🔴 [SIZE TO CONFIRM]",

        bed:
            "1 King Bed + 2 Single Beds",

        guests:
            "4 Guests · Up to 5 by arrangement",

        view:
            "Kaiara Garden",

        amenities: [
            "2 Bedrooms",
            "2 Bathrooms",
            "Living Area",
            "Dining Area",
            "Sofa Bed",
            "Air Conditioning in Main Bedroom",
            "Wi-Fi"
        ],

        included: [
            "Breakfast for 4 Guests",
            "Access to Shared Guest Facilities",
            "Daily Housekeeping",
            "Wi-Fi"
        ],

        photos: [
            "🔴 [OAK LOFT · PHOTO 1]",
            "🔴 [OAK LOFT · PHOTO 2]",
            "🔴 [OAK LOFT · PHOTO 3]",
            "🔴 [OAK LOFT · PHOTO 4]",
            "🔴 [OAK LOFT · PHOTO 5]",
            "🔴 [OAK LOFT · PHOTO 6]"
        ]

    }

};


/* =====================================================
   10. ROOM DETAIL MODAL — ELEMENTS
===================================================== */

const roomModal =
    document.getElementById("roomModal");

const roomModalBackdrop =
    document.querySelector(
        ".room-modal-backdrop"
    );

const roomModalClose =
    document.querySelector(
        ".room-modal-close"
    );


const modalRoomType =
    document.getElementById(
        "modalRoomType"
    );

const modalRoomName =
    document.getElementById(
        "modalRoomName"
    );

const modalRoomHighlight =
    document.getElementById(
        "modalRoomHighlight"
    );

const modalRoomDescription =
    document.getElementById(
        "modalRoomDescription"
    );

const modalRoomSize =
    document.getElementById(
        "modalRoomSize"
    );

const modalBed =
    document.getElementById(
        "modalBed"
    );

const modalGuests =
    document.getElementById(
        "modalGuests"
    );

const modalView =
    document.getElementById(
        "modalView"
    );

const modalAmenities =
    document.getElementById(
        "modalAmenities"
    );

const modalIncluded =
    document.getElementById(
        "modalIncluded"
    );

const modalMainImage =
    document.getElementById(
        "modalMainImage"
    );


let activeRoomKey = null;

let activeRoomPhotos = [];


/* =====================================================
   ROOM — POPULATE SIMPLE LIST
===================================================== */

function populateRoomList(
    container,
    items
) {

    if (!container) return;

    container.innerHTML = "";

    items.forEach(item => {

        const element =
            document.createElement(
                "span"
            );

        element.textContent = item;

        container.appendChild(
            element
        );

    });

}


/* =====================================================
   ROOM — UPDATE STATIC PHOTO GALLERY

   Desktop:
   main image + three thumbnails.

   Mobile:
   CSS hides thumbnails, preserving
   the original responsive behaviour.
===================================================== */

function updateRoomStaticGallery(data) {

    activeRoomPhotos =
        Array.isArray(data.photos)
            ? data.photos
            : [];

    activeGalleryPhotos =
        [...activeRoomPhotos];

    if (modalMainImage) {

        modalMainImage.textContent =
            activeRoomPhotos[0] ||
            "🔴 [ROOM PHOTO]";

    }


    const thumbnails =
        document.querySelectorAll(
            ".room-modal-thumbnail"
        );


    thumbnails.forEach(
        (thumbnail, index) => {

            const photoIndex =
                index + 1;

            const placeholder =
                thumbnail.querySelector(
                    "span"
                );

            if (placeholder) {

                placeholder.textContent =
                    activeRoomPhotos[
                    photoIndex
                    ] ||
                    "🔴 [ROOM PHOTO]";

            }

            thumbnail.dataset.photoIndex =
                String(photoIndex);

        }
    );


    const mainPhoto =
        document.querySelector(
            ".room-modal-main-image"
        );

    if (mainPhoto) {

        mainPhoto.dataset.photoIndex =
            "0";

    }

}


/* =====================================================
   ROOM — OPEN DETAIL
===================================================== */

function openRoomModal(roomKey) {

    if (!roomModal) return;

    const data =
        ROOM_DATA[roomKey];

    if (!data) return;


    activeRoomKey =
        roomKey;


    /* BASIC INFORMATION */

    if (modalRoomType) {

        modalRoomType.textContent =
            data.type;

    }

    if (modalRoomName) {

        modalRoomName.textContent =
            data.name;

    }

    if (modalRoomHighlight) {

        modalRoomHighlight.textContent =
            data.highlight;

    }

    if (modalRoomDescription) {

        modalRoomDescription.textContent =
            data.description;

    }


    /* ROOM DETAILS */

    if (modalRoomSize) {

        modalRoomSize.textContent =
            data.size;

    }

    if (modalBed) {

        modalBed.textContent =
            data.bed;

    }

    if (modalGuests) {

        modalGuests.textContent =
            data.guests;

    }

    if (modalView) {

        modalView.textContent =
            data.view;

    }


    /* AMENITIES */

    populateRoomList(
        modalAmenities,
        data.amenities
    );


    /* INCLUDED */

    populateRoomList(
        modalIncluded,
        data.included
    );


    /* PHOTOS */

    updateRoomStaticGallery(
        data
    );


    /* OPEN */

    roomModal.classList.add(
        "active"
    );

    roomModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "room-modal-open"
    );

}


/* =====================================================
   ROOM — CLOSE DETAIL
===================================================== */

function closeRoomModal() {

    if (!roomModal) return;

    roomModal.classList.remove(
        "active"
    );

    roomModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "room-modal-open"
    );

}


/* =====================================================
   ROOM CARD CLICKS
===================================================== */

document
    .querySelectorAll(
        ".clickable-room[data-room]"
    )
    .forEach(card => {

        card.addEventListener(
            "click",
            event => {

                /*
                   Prevent accidental navigation
                   if the card is an <a>.
                */

                event.preventDefault();

                const roomKey =
                    card.dataset.room;

                openRoomModal(
                    roomKey
                );

            }
        );


        /*
           Keyboard support if card itself
           is not a native button/link.
        */

        card.addEventListener(
            "keydown",
            event => {

                if (
                    event.key !== "Enter" &&
                    event.key !== " "
                ) {
                    return;
                }

                event.preventDefault();

                openRoomModal(
                    card.dataset.room
                );

            }
        );

    });


/* =====================================================
   ROOM DETAIL — CLOSE CONTROLS
===================================================== */

if (roomModalClose) {

    roomModalClose.addEventListener(
        "click",
        closeRoomModal
    );

}


if (roomModalBackdrop) {

    roomModalBackdrop.addEventListener(
        "click",
        closeRoomModal
    );

}


/* =====================================================
   11. ROOM FULLSCREEN GALLERY
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


let activeGalleryPhotos = [];
let currentGalleryIndex = 0;


/* =====================================================
   FULLSCREEN GALLERY — DOTS
===================================================== */

function createGalleryDots() {

    if (!galleryDots) return;

    galleryDots.innerHTML = "";


    activeGalleryPhotos.forEach(
        (photo, index) => {

            const dot =
                document.createElement(
                    "button"
                );

            dot.type = "button";

            dot.className =
                "gallery-dot";

            dot.setAttribute(
                "aria-label",
                `View photo ${index + 1}`
            );


            dot.addEventListener(
                "click",
                () => {

                    currentGalleryIndex =
                        index;

                    updateFullscreenGallery();

                }
            );


            galleryDots.appendChild(
                dot
            );

        }
    );

}


/* =====================================================
   FULLSCREEN GALLERY — UPDATE
===================================================== */

function updateFullscreenGallery() {

    if (
        !galleryImage ||
        activeGalleryPhotos.length === 0
    ) {
        return;
    }



    const currentPhoto = activeGalleryPhotos[currentGalleryIndex];

    if (/\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(currentPhoto)) {
        const img = document.createElement("img");
        img.src = currentPhoto;

        img.onerror = function () {
            galleryImage.textContent = "PHOTO COMING SOON";
            galleryImage.style.display = "flex";
            galleryImage.style.alignItems = "center";
            galleryImage.style.justifyContent = "center";
            galleryImage.style.color = "#777d6d";
            galleryImage.style.fontSize = "13px";
            galleryImage.style.letterSpacing = "2px";
        };

        img.onload = function () {
            galleryImage.style.display = "";
            galleryImage.style.alignItems = "";
            galleryImage.style.justifyContent = "";
        };

        img.alt = "Kaiara Garden gallery photo";
        img.style.cssText =
            "display:block;width:100%;height:100%;max-height:80vh;object-fit:contain;";

        galleryImage.replaceChildren(img);
    } else {
        // Tetap mendukung placeholder Rooms
        galleryImage.textContent = currentPhoto;
    }



    if (galleryCounter) {

        galleryCounter.textContent =
            `${currentGalleryIndex + 1} / ${activeGalleryPhotos.length}`;

    }


    if (galleryDots) {

        const dots =
            galleryDots.querySelectorAll(
                ".gallery-dot"
            );


        dots.forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index ===
                    currentGalleryIndex
                );

            }
        );

    }

}


/* =====================================================
   FULLSCREEN GALLERY — OPEN
===================================================== */

function openFullscreenGallery(
    index = 0
) {

    if (
        !fullscreenGallery ||
        activeGalleryPhotos.length === 0
    ) {
        return;
    }


    currentGalleryIndex =
        Math.max(
            0,
            Math.min(
                index,
                activeGalleryPhotos.length - 1
            )
        );


    createGalleryDots();

    updateFullscreenGallery();


    fullscreenGallery
        .classList
        .add("active");


    fullscreenGallery
        .setAttribute(
            "aria-hidden",
            "false"
        );


    document.body.classList.add(
        "fullscreen-gallery-open"
    );

}


/* =====================================================
   FULLSCREEN GALLERY — CLOSE
===================================================== */

function closeFullscreenGallery() {

    if (!fullscreenGallery) return;


    fullscreenGallery
        .classList
        .remove("active");


    fullscreenGallery
        .setAttribute(
            "aria-hidden",
            "true"
        );


    document.body.classList.remove(
        "fullscreen-gallery-open"
    );

}


/* =====================================================
   FULLSCREEN GALLERY — CHANGE PHOTO
===================================================== */

function showGalleryPhoto(
    newIndex
) {

    if (
        activeGalleryPhotos.length === 0
    ) {
        return;
    }


    currentGalleryIndex =
        (
            newIndex +
            activeGalleryPhotos.length
        ) %
        activeGalleryPhotos.length;


    if (galleryImage) {

        galleryImage.classList.add(
            "gallery-fade"
        );

    }


    window.setTimeout(
        () => {

            updateFullscreenGallery();

            if (galleryImage) {

                galleryImage
                    .classList
                    .remove(
                        "gallery-fade"
                    );

            }

        },
        10
    );

}


function nextGalleryPhoto() {

    showGalleryPhoto(
        currentGalleryIndex + 1
    );

}


function previousGalleryPhoto() {

    showGalleryPhoto(
        currentGalleryIndex - 1
    );

}


/* =====================================================
   GATHERINGS — FULLSCREEN PHOTO GALLERY
===================================================== */

const gatheringGallery = document.getElementById("gatheringGallery");

if (gatheringGallery) {
    const gatheringButtons = [
        ...gatheringGallery.querySelectorAll(
            "[data-gathering-index]"
        )
    ];

    gatheringButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Gunakan foto dari HTML, bukan foto Rooms
            activeGalleryPhotos = gatheringButtons.map(item => {
                return item.querySelector("img").getAttribute("src");
            });

            const index = Number(button.dataset.gatheringIndex) || 0;

            openFullscreenGallery(index);
        });
    });
}


/* =====================================================
   CLICK ROOM PHOTOS → FULLSCREEN
===================================================== */

document.addEventListener(
    "click",
    event => {

        const photo =
            event.target.closest(
                ".gallery-photo"
            );

        if (!photo) return;


        /*
           Only Room Detail gallery should
           trigger this fullscreen viewer.
        */

        if (
            !photo.closest(
                "#roomModal"
            )
        ) {
            return;
        }


        const photoIndex =
            Number(
                photo.dataset.photoIndex
            ) || 0;


        openFullscreenGallery(
            photoIndex
        );

    }
);


/* =====================================================
   FULLSCREEN CONTROLS
===================================================== */

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


/*
   If the fullscreen gallery has a backdrop
   element in HTML, clicking it also closes.
*/

const fullscreenGalleryBackdrop =
    document.querySelector(
        ".fullscreen-gallery-backdrop"
    );


if (fullscreenGalleryBackdrop) {

    fullscreenGalleryBackdrop
        .addEventListener(
            "click",
            closeFullscreenGallery
        );

}


/* =====================================================
   12. ROOM BOOKING CTA
===================================================== */

const roomBookingButton =
    document.querySelector(
        ".room-modal-book-button"
    );


if (roomBookingButton) {

    roomBookingButton.addEventListener(
        "click",
        event => {

            event.preventDefault();


            const room =
                ROOM_DATA[
                activeRoomKey
                ];


            const roomName =
                room
                    ? room.name
                    : "a room";


            const message =
                `Hello Kaiara Garden, I would like to check availability for ${roomName}.`;


            const url =
                makeWhatsAppUrl(
                    KAIARA_CONFIG.stayWhatsapp,
                    message
                );


            /*
               Nomor belum diisi:
               jangan buka wa.me kosong.
            */

            if (url === "#") {

                console.warn(
                    "Stay WhatsApp number has not been added to KAIARA_CONFIG yet."
                );

                return;

            }


            window.open(
                url,
                "_blank",
                "noopener"
            );

        }
    );

}


/* =====================================================
   13. ROOM / GALLERY KEYBOARD CONTROL
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        /*
           FULLSCREEN GALLERY gets priority.
        */

        if (
            fullscreenGallery &&
            fullscreenGallery
                .classList
                .contains("active")
        ) {

            if (
                event.key ===
                "ArrowRight"
            ) {

                nextGalleryPhoto();

            }


            if (
                event.key ===
                "ArrowLeft"
            ) {

                previousGalleryPhoto();

            }


            if (
                event.key ===
                "Escape"
            ) {

                closeFullscreenGallery();

            }


            return;

        }


        /*
           ROOM DETAIL
        */

        if (
            event.key === "Escape" &&
            roomModal &&
            roomModal
                .classList
                .contains("active")
        ) {

            closeRoomModal();

        }

    }
);


/* =====================================================
   NEXT:
   FACILITIES
   Garden / Pool / Jacuzzi / Mini Gym
   + Good to Know
   + Guidelines
===================================================== */

/* =====================================================
   14. FACILITY DETAIL MODAL
===================================================== */

const facilityModal =
    document.getElementById(
        "facilityModal"
    );

const facilityModalBackdrop =
    document.querySelector(
        ".facility-modal-backdrop"
    );

const facilityModalClose =
    document.querySelector(
        ".facility-modal-close"
    );

const facilityModalName =
    document.getElementById(
        "facilityModalName"
    );

const facilityModalImage =
    document.getElementById(
        "facilityModalImage"
    );

const facilityModalHighlight =
    document.getElementById(
        "facilityModalHighlight"
    );

const facilityModalDescription =
    document.getElementById(
        "facilityModalDescription"
    );

const facilityModalDetails =
    document.getElementById(
        "facilityModalDetails"
    );


/* =====================================================
   FACILITY GUIDELINE ELEMENTS
===================================================== */

const facilityGuidelines =
    document.getElementById(
        "facilityGuidelines"
    );

const facilityGuidelinesToggle =
    document.getElementById(
        "facilityGuidelinesToggle"
    );

const facilityGuidelinesToggleText =
    document.getElementById(
        "facilityGuidelinesToggleText"
    );

const facilityGuidelinesContent =
    document.getElementById(
        "facilityGuidelinesContent"
    );

const facilityGuidelinesList =
    document.getElementById(
        "facilityGuidelinesList"
    );

const facilityGuidelinesNote =
    document.getElementById(
        "facilityGuidelinesNote"
    );


/* =====================================================
   15. FACILITY DATA

   Garden:
   Good to Know only.

   Pool / Jacuzzi / Mini Gym:
   Good to Know + Guidelines.
===================================================== */

const FACILITY_DATA = {

    garden: {

        name:
            "Garden",

        photos: [
            "🔴 [GARDEN · PHOTO 1]",
            "🔴 [GARDEN · PHOTO 2]",
            "🔴 [GARDEN · PHOTO 3]",
            "🔴 [GARDEN · PHOTO 4]"
        ],

        highlight:
            "Green spaces woven throughout Kaiara.",

        description:
            "Thoughtfully landscaped spaces surround Kaiara, creating quiet corners for fresh air, slow walks, and unhurried moments throughout your stay.",

        details: [

            {
                label:
                    "Access",

                value:
                    "Available throughout your stay"
            },

            {
                label:
                    "Garden Areas",

                value:
                    "Landscaped green spaces across the property"
            },

            {
                label:
                    "A Gentle Reminder",

                value:
                    "Please enjoy the garden with consideration for other guests"
            }

        ],

        guidelinesTitle:
            null,

        guidelines:
            [],

        guidelinesNote:
            ""

    },


    pool: {

        name:
            "Swimming Pool",

        photos: [
            "🔴 [SWIMMING POOL · PHOTO 1]",
            "🔴 [SWIMMING POOL · PHOTO 2]",
            "🔴 [SWIMMING POOL · PHOTO 3]",
            "🔴 [SWIMMING POOL · PHOTO 4]"
        ],

        highlight:
            "An easy pause surrounded by greenery.",

        description:
            "Set within Kaiara’s garden surroundings, our swimming pool is a refreshing place to cool down, slow the pace, and enjoy an easy afternoon.",

        details: [

            {
                label:
                    "Opening Hours",

                value:
                    "07:00 – 20:00"
            },

            {
                label:
                    "Access",

                value:
                    "Registered staying guests"
            },

            {
                label:
                    "Swimwear",

                value:
                    "Proper swimwear required"
            },

            {
                label:
                    "Child Supervision",

                value:
                    "Adult supervision required"
            },

            {
                label:
                    "Event Use",

                value:
                    "Available as part of selected event arrangements"
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

        name:
            "Jacuzzi",

        photos: [
            "🔴 [JACUZZI · PHOTO 1]",
            "🔴 [JACUZZI · PHOTO 2]",

        ],

        highlight:
            "A warm corner made for slowing down.",

        description:
            "Settle in and unwind with a warm, relaxing soak — a quiet moment to slow down during your stay at Kaiara.",

        details: [

            {
                label:
                    "Available Hours",

                value:
                    "08:00 – 21:00"
            },

            {
                label:
                    "Access",

                value:
                    "Registered staying guests"
            },

            {
                label:
                    "Reservation",

                value:
                    "Advance reservation required"
            },

            {
                label:
                    "Recommended Session",

                value:
                    "15–20 minutes"
            },

            {
                label:
                    "Swimwear",

                value:
                    "Proper swimwear required"
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

        name:
            "Mini Gym",

        photos: [
            "🔴 [MINI GYM · PHOTO 1]",
            "🔴 [MINI GYM · PHOTO 2]",
            "🔴 [MINI GYM · PHOTO 3]",
            "🔴 [MINI GYM · PHOTO 4]"
        ],

        highlight:
            "A simple space to keep moving during your stay.",

        description:
            "Our mini gym offers a convenient space for a light workout, making it easy to stay active while enjoying a slower stay at Kaiara.",

        details: [

            {
                label:
                    "Opening Hours",

                value:
                    "07:00 – 21:00"
            },

            {
                label:
                    "Access",

                value:
                    "Registered staying guests"
            },

            {
                label:
                    "Attire",

                value:
                    "Proper sportswear and athletic footwear required"
            },

            {
                label:
                    "After Use",

                value:
                    "Please sanitize and return equipment"
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


/* =====================================================
   16. FACILITY — GOOD TO KNOW
===================================================== */

function populateFacilityDetails(
    details
) {

    if (!facilityModalDetails) {
        return;
    }


    facilityModalDetails.innerHTML =
        "";


    details.forEach(detail => {

        const item =
            document.createElement(
                "div"
            );

        item.className =
            "facility-detail-item";


        const label =
            document.createElement(
                "span"
            );

        label.className =
            "facility-detail-label";

        label.textContent =
            detail.label;


        const value =
            document.createElement(
                "span"
            );

        value.className =
            "facility-detail-value";

        value.textContent =
            detail.value;


        item.appendChild(
            label
        );

        item.appendChild(
            value
        );


        facilityModalDetails
            .appendChild(item);

    });

}


/* =====================================================
   17. FACILITY — RESET GUIDELINES
===================================================== */

function resetFacilityGuidelines() {

    if (
        facilityGuidelinesToggle
    ) {

        facilityGuidelinesToggle
            .setAttribute(
                "aria-expanded",
                "false"
            );

    }


    if (
        facilityGuidelinesContent
    ) {

        facilityGuidelinesContent
            .classList
            .remove("active");

    }


    const arrow =
        facilityGuidelinesToggle
            ? facilityGuidelinesToggle
                .querySelector(
                    ".facility-guidelines-arrow"
                )
            : null;


    if (arrow) {

        arrow.textContent =
            "↓";

    }

}


/* =====================================================
   18. FACILITY — POPULATE GUIDELINES
===================================================== */

function populateFacilityGuidelines(
    data
) {

    resetFacilityGuidelines();


    const hasGuidelines =
        Array.isArray(
            data.guidelines
        ) &&
        data.guidelines.length > 0;


    /*
       GARDEN:
       hide the whole Guidelines block.
    */

    if (!hasGuidelines) {

        if (facilityGuidelines) {

            facilityGuidelines.hidden =
                true;

        }

        if (
            facilityGuidelinesList
        ) {

            facilityGuidelinesList
                .innerHTML = "";

        }

        if (
            facilityGuidelinesNote
        ) {

            facilityGuidelinesNote
                .textContent = "";

        }

        return;

    }


    /*
       POOL / JACUZZI / MINI GYM:
       show Guidelines.
    */

    if (facilityGuidelines) {

        facilityGuidelines.hidden =
            false;

    }


    if (
        facilityGuidelinesToggleText
    ) {

        facilityGuidelinesToggleText
            .textContent =
            data.guidelinesTitle;

    }


    if (
        facilityGuidelinesList
    ) {

        facilityGuidelinesList
            .innerHTML = "";


        data.guidelines.forEach(
            guideline => {

                const item =
                    document.createElement(
                        "li"
                    );

                item.textContent =
                    guideline;


                facilityGuidelinesList
                    .appendChild(
                        item
                    );

            }
        );

    }


    if (
        facilityGuidelinesNote
    ) {

        facilityGuidelinesNote
            .textContent =
            data.guidelinesNote || "";

    }

}


/* =====================================================
   19. OPEN FACILITY DETAIL
===================================================== */

function openFacilityModal(
    facilityKey
) {

    if (!facilityModal) return;


    const data =
        FACILITY_DATA[
        facilityKey
        ];


    if (!data) return;


    /* NAME */

    if (facilityModalName) {

        facilityModalName
            .textContent =
            data.name;

    }


    /* PHOTO GALLERY */

    activeGalleryPhotos =
        Array.isArray(data.photos)
            ? [...data.photos]
            : data.image
                ? [data.image]
                : [];


    if (facilityModalImage) {

        facilityModalImage
            .textContent =
            activeGalleryPhotos[0] ||
            "🔴 [FACILITY PHOTO]";

    }

    /* HIGHLIGHT */

    if (
        facilityModalHighlight
    ) {

        facilityModalHighlight
            .textContent =
            data.highlight;

    }


    /* DESCRIPTION */

    if (
        facilityModalDescription
    ) {

        facilityModalDescription
            .textContent =
            data.description;

    }


    /* GOOD TO KNOW */

    populateFacilityDetails(
        data.details
    );


    /* GUIDELINES */

    populateFacilityGuidelines(
        data
    );


    /* OPEN MODAL */

    facilityModal
        .classList
        .add("active");


    facilityModal
        .setAttribute(
            "aria-hidden",
            "false"
        );


    document.body
        .classList
        .add(
            "facility-modal-open"
        );

}


/* =====================================================
   20. CLOSE FACILITY DETAIL
===================================================== */

function closeFacilityModal() {

    if (!facilityModal) return;


    facilityModal
        .classList
        .remove("active");


    facilityModal
        .setAttribute(
            "aria-hidden",
            "true"
        );


    document.body
        .classList
        .remove(
            "facility-modal-open"
        );


    resetFacilityGuidelines();

}


/* =====================================================
   21. FACILITY CARD CLICKS

   Mendukung dua struktur:
   1. data-facility="pool"
   2. href="#pool" dari HTML lama
===================================================== */

document
    .querySelectorAll(
        ".facility"
    )
    .forEach(card => {

        card.addEventListener(
            "click",
            event => {

                let facilityKey =
                    card.dataset.facility;


                if (!facilityKey) {

                    const href =
                        card.getAttribute(
                            "href"
                        );


                    if (
                        href &&
                        [
                            "#garden",
                            "#pool",
                            "#jacuzzi",
                            "#mini-gym"
                        ].includes(href)
                    ) {

                        facilityKey =
                            href.substring(1);

                    }

                }


                if (
                    !facilityKey ||
                    !FACILITY_DATA[
                    facilityKey
                    ]
                ) {
                    return;
                }


                event.preventDefault();


                openFacilityModal(
                    facilityKey
                );

            }
        );

    });

/* =====================================================
   FACILITY PHOTO → FULLSCREEN GALLERY
===================================================== */

const facilityModalPhoto =
    document.querySelector(
        ".facility-modal-image"
    );


if (facilityModalPhoto) {

    facilityModalPhoto.addEventListener(
        "click",
        () => {

            if (
                activeGalleryPhotos.length === 0
            ) {
                return;
            }

            openFullscreenGallery(0);

        }
    );

}

/* =====================================================
   22. FACILITY CLOSE CONTROLS
===================================================== */

if (facilityModalClose) {

    facilityModalClose
        .addEventListener(
            "click",
            closeFacilityModal
        );

}


if (facilityModalBackdrop) {

    facilityModalBackdrop
        .addEventListener(
            "click",
            closeFacilityModal
        );

}


/* =====================================================
   23. GUIDELINES ACCORDION
===================================================== */

if (
    facilityGuidelinesToggle &&
    facilityGuidelinesContent
) {

    facilityGuidelinesToggle
        .addEventListener(
            "click",
            () => {

                const isOpen =
                    facilityGuidelinesToggle
                        .getAttribute(
                            "aria-expanded"
                        ) === "true";


                const willOpen =
                    !isOpen;


                facilityGuidelinesToggle
                    .setAttribute(
                        "aria-expanded",
                        String(
                            willOpen
                        )
                    );


                facilityGuidelinesContent
                    .classList
                    .toggle(
                        "active",
                        willOpen
                    );


                const arrow =
                    facilityGuidelinesToggle
                        .querySelector(
                            ".facility-guidelines-arrow"
                        );


                if (arrow) {

                    arrow.textContent =
                        willOpen
                            ? "↑"
                            : "↓";

                }

            }
        );

}


/* =====================================================
   24. FACILITY KEYBOARD CONTROL
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        if (
            facilityModal &&
            facilityModal
                .classList
                .contains("active")
        ) {

            closeFacilityModal();

        }

    }
);

/* =====================================================
   25. KAIARA CAFÉ DETAIL MODAL
===================================================== */

const CAFE_PHOTOS = [
    "🔴 [KAIARA CAFÉ · PHOTO 1]",
    "🔴 [KAIARA CAFÉ · PHOTO 2]",
    "🔴 [KAIARA CAFÉ · PHOTO 3]",
    "🔴 [KAIARA CAFÉ · PHOTO 4]",
    "🔴 [KAIARA CAFÉ · PHOTO 5]",
    "🔴 [KAIARA CAFÉ · PHOTO 6]"
];

const cafeModalImage =
    document.getElementById(
        "cafeModalImage"
    );

const cafeModal =
    document.getElementById(
        "cafeModal"
    );

const openCafeModalButton =
    document.getElementById(
        "openCafeModal"
    );

const cafeModalClose =
    document.querySelector(
        ".cafe-modal-close"
    );

const cafeModalBackdrop =
    document.querySelector(
        ".cafe-modal-backdrop"
    );


/* =====================================================
   OPEN CAFÉ DETAIL
===================================================== */

function openCafeModal() {

    if (!cafeModal) return;

    activeGalleryPhotos =
        [...CAFE_PHOTOS];

    if (cafeModalImage) {
        cafeModalImage.textContent =
            activeGalleryPhotos[0];
    }

    cafeModal
        .classList
        .add("active");


    cafeModal
        .setAttribute(
            "aria-hidden",
            "false"
        );


    document.body
        .classList
        .add(
            "cafe-modal-open"
        );

}

/* =====================================================
   CAFÉ PHOTO → FULLSCREEN GALLERY
===================================================== */

const cafePhoto =
    document.querySelector(
        "#cafeModal .cafe-modal-image"
    );

if (cafePhoto) {

    cafePhoto.onclick = function () {

        activeGalleryPhotos =
            [...CAFE_PHOTOS];

        openFullscreenGallery(0);

    };

}

/* =====================================================
   CLOSE CAFÉ DETAIL
===================================================== */

function closeCafeModal() {

    if (!cafeModal) return;


    cafeModal
        .classList
        .remove("active");


    cafeModal
        .setAttribute(
            "aria-hidden",
            "true"
        );


    document.body
        .classList
        .remove(
            "cafe-modal-open"
        );

}


/* =====================================================
   CAFÉ HOMEPAGE → DETAIL
===================================================== */

if (openCafeModalButton) {

    openCafeModalButton
        .addEventListener(
            "click",
            event => {

                event.preventDefault();

                openCafeModal();

            }
        );

}

const cafeHomepageImage =
    document.querySelector(
        "#cafe .cafe-image"
    );

if (cafeHomepageImage) {

    cafeHomepageImage.addEventListener(
        "click",
        () => {

            openCafeModal();

        }
    );

}

/* =====================================================
   CAFÉ DETAIL — CLOSE
===================================================== */

if (cafeModalClose) {

    cafeModalClose
        .addEventListener(
            "click",
            closeCafeModal
        );

}


if (cafeModalBackdrop) {

    cafeModalBackdrop
        .addEventListener(
            "click",
            closeCafeModal
        );

}


/* =====================================================
   26. CAFÉ MENU
===================================================== */

document
    .querySelectorAll(
        ".cafe-menu-button"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            event => {

                /*
                   Link menu belum diisi:
                   jangan buka halaman kosong.
                */

                if (
                    !KAIARA_CONFIG
                        .cafeMenuUrl
                ) {

                    event.preventDefault();

                    console.warn(
                        "Café menu URL has not been added to KAIARA_CONFIG yet."
                    );

                    return;

                }


                button.href =
                    KAIARA_CONFIG
                        .cafeMenuUrl;

                button.target =
                    "_blank";

                button.rel =
                    "noopener";

            }
        );

    });


/* =====================================================
   27. CAFÉ TABLE RESERVATION
===================================================== */

const cafeReservationModal =
    document.getElementById(
        "cafeReservationModal"
    );

const cafeReservationForm =
    document.getElementById(
        "cafeReservationForm"
    );

const cafeReservationClose =
    document.querySelector(
        ".cafe-reservation-close"
    );

const cafeReservationBackdrop =
    document.querySelector(
        ".cafe-reservation-backdrop"
    );

const cafeReservationBack =
    document.getElementById(
        "cafeReservationBack"
    );


/*
   Semua tombol Reserve a Table
   boleh memakai class yang sama.
*/

const cafeReservationButtons =
    document.querySelectorAll(
        ".cafe-reservation-link"
    );


/* =====================================================
   OPEN CAFÉ RESERVATION
===================================================== */

function openCafeReservation() {

    if (
        !cafeReservationModal
    ) {
        return;
    }


    /*
       Kalau dibuka dari Café Detail,
       tutup detail terlebih dahulu.
    */

    closeCafeModal();


    cafeReservationModal
        .classList
        .add("active");


    cafeReservationModal
        .setAttribute(
            "aria-hidden",
            "false"
        );


    document.body
        .classList
        .add(
            "cafe-reservation-open"
        );

}


/* =====================================================
   CLOSE CAFÉ RESERVATION
===================================================== */

function closeCafeReservation() {

    if (
        !cafeReservationModal
    ) {
        return;
    }


    cafeReservationModal
        .classList
        .remove("active");


    cafeReservationModal
        .setAttribute(
            "aria-hidden",
            "true"
        );


    document.body
        .classList
        .remove(
            "cafe-reservation-open"
        );

}


/* =====================================================
   RESERVE A TABLE BUTTONS
===================================================== */

cafeReservationButtons
    .forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                openCafeReservation();

            }
        );

    });


/*
   Bottom CTA may use its own ID.
*/

const openCafeReservationBottom =
    document.getElementById(
        "openCafeReservationBottom"
    );


if (openCafeReservationBottom) {

    openCafeReservationBottom
        .addEventListener(
            "click",
            event => {

                event.preventDefault();

                openCafeModal();

            }
        );

}


/* =====================================================
   RESERVATION — CLOSE
===================================================== */

if (cafeReservationClose) {

    cafeReservationClose
        .addEventListener(
            "click",
            closeCafeReservation
        );

}


if (cafeReservationBackdrop) {

    cafeReservationBackdrop
        .addEventListener(
            "click",
            closeCafeReservation
        );

}


/* =====================================================
   RESERVATION → BACK TO CAFÉ DETAIL
===================================================== */

if (cafeReservationBack) {

    cafeReservationBack
        .addEventListener(
            "click",
            event => {

                event.preventDefault();


                closeCafeReservation();


                /*
                   Slight delay prevents
                   both modal transitions
                   happening simultaneously.
                */

                window.setTimeout(
                    openCafeModal,
                    80
                );

            }
        );

}


/* =====================================================
   28. CAFÉ RESERVATION DATE

   Prevent selection of dates in the past.
===================================================== */

const cafeReservationDate =
    document.getElementById(
        "cafeReservationDate"
    );


function setCafeMinimumDate() {

    if (!cafeReservationDate) {
        return;
    }


    const today =
        new Date();


    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(
            2,
            "0"
        );

    const day =
        String(
            today.getDate()
        ).padStart(
            2,
            "0"
        );


    cafeReservationDate.min =
        `${year}-${month}-${day}`;

}


setCafeMinimumDate();


/* =====================================================
   29. CAFÉ RESERVATION — FORM SUBMIT
===================================================== */

if (cafeReservationForm) {

    cafeReservationForm
        .addEventListener(
            "submit",
            async event => {

                event.preventDefault();


                const submitButton =
                    cafeReservationForm
                        .querySelector(
                            'button[type="submit"]'
                        );


                const nameField =
                    document.getElementById(
                        "cafeGuestName"
                    );

                const phoneField =
                    document.getElementById(
                        "cafeGuestPhone"
                    );

                const dateField =
                    document.getElementById(
                        "cafeReservationDate"
                    );

                const timeField =
                    document.getElementById(
                        "cafeReservationTime"
                    );

                const guestField =
                    document.getElementById(
                        "cafeGuestCount"
                    );

                const notesField =
                    document.getElementById(
                        "cafeReservationNotes"
                    );


                /*
                   Safety check:
                   form HTML must match JS.
                */

                if (
                    !nameField ||
                    !phoneField ||
                    !dateField ||
                    !timeField ||
                    !guestField
                ) {

                    console.error(
                        "Café reservation form fields are incomplete."
                    );

                    return;

                }


                const reservationData = {

                    name:
                        nameField
                            .value
                            .trim(),

                    whatsapp:
                        phoneField
                            .value
                            .trim(),

                    date:
                        dateField.value,

                    time:
                        timeField.value,

                    guests:
                        guestField.value,

                    notes:
                        notesField
                            ? notesField
                                .value
                                .trim()
                            : ""

                };


                /* -----------------------------------------
                   BASIC VALIDATION
                ----------------------------------------- */

                if (
                    !reservationData.name ||
                    !reservationData.whatsapp ||
                    !reservationData.date ||
                    !reservationData.time ||
                    !reservationData.guests
                ) {

                    alert(
                        "Please complete all required reservation details."
                    );

                    return;

                }


                /* -----------------------------------------
                   DISPLAY DATE
                ----------------------------------------- */

                const selectedDate =
                    new Date(
                        reservationData.date +
                        "T00:00:00"
                    );


                const formattedDate =
                    selectedDate
                        .toLocaleDateString(
                            "en-GB",
                            {

                                day:
                                    "numeric",

                                month:
                                    "long",

                                year:
                                    "numeric"

                            }
                        );


                /* -----------------------------------------
                   WHATSAPP MESSAGE
                ----------------------------------------- */

                let whatsappMessage =
                    `Hello Kaiara Café, I would like to make a table reservation.

Name: ${reservationData.name}
WhatsApp: ${reservationData.whatsapp}
Date: ${formattedDate}
Time: ${reservationData.time}
Guests: ${reservationData.guests}`;


                if (
                    reservationData.notes
                ) {

                    whatsappMessage +=
                        `\nNotes: ${reservationData.notes}`;

                }


                whatsappMessage +=
                    `\n\nThank you.`;


                /* -----------------------------------------
                   SUBMIT STATE
                ----------------------------------------- */

                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.textContent =
                        "Sending...";

                }


                try {

                    /* -------------------------------------
                       SAVE TO GOOGLE SHEET
                    ------------------------------------- */

                    if (
                        KAIARA_CONFIG
                            .cafeReservationApi
                    ) {

                        await fetch(

                            KAIARA_CONFIG
                                .cafeReservationApi,

                            {

                                method:
                                    "POST",

                                mode:
                                    "no-cors",

                                headers: {

                                    "Content-Type":
                                        "text/plain;charset=utf-8"

                                },

                                body:
                                    JSON.stringify(
                                        reservationData
                                    )

                            }

                        );

                    }


                    /* -------------------------------------
                       CONTINUE TO WHATSAPP
                    ------------------------------------- */

                    if (
                        KAIARA_CONFIG
                            .cafeWhatsapp
                    ) {

                        const whatsappUrl =
                            makeWhatsAppUrl(

                                KAIARA_CONFIG
                                    .cafeWhatsapp,

                                whatsappMessage

                            );


                        window.open(
                            whatsappUrl,
                            "_blank",
                            "noopener"
                        );

                    } else {

                        /*
                           Data may already have reached
                           Google Sheet.

                           Do NOT create wa.me/ with an
                           empty phone number.
                        */

                        console.warn(
                            "Café WhatsApp number has not been added to KAIARA_CONFIG yet."
                        );

                        alert(
                            "Your reservation details have been submitted. WhatsApp confirmation will be available once the café contact number is connected."
                        );

                    }


                    cafeReservationForm
                        .reset();


                    setCafeMinimumDate();


                } catch (error) {

                    console.error(
                        "Café reservation error:",
                        error
                    );


                    alert(
                        "We couldn't continue your reservation. Please try again."
                    );

                } finally {

                    if (submitButton) {

                        submitButton.disabled =
                            false;

                        submitButton.textContent =
                            "Continue via WhatsApp";

                    }

                }

            }
        );

}


/* =====================================================
   30. CAFÉ KEYBOARD CONTROL
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        /*
           Reservation sits above
           Café Detail, so it gets priority.
        */

        if (
            cafeReservationModal &&
            cafeReservationModal
                .classList
                .contains("active")
        ) {

            closeCafeReservation();

            return;

        }


        if (
            cafeModal &&
            cafeModal
                .classList
                .contains("active")
        ) {

            closeCafeModal();

        }

    }
);


/* =====================================================
   NEXT:
   GATHERINGS

   Homepage
   → Explore Gatherings
   → Gathering Detail
   → Type + Duration
   → Plan a Gathering
   → Event Inquiry
===================================================== */

/* =====================================================
   31. GATHERINGS — STAGE 2
===================================================== */

const gatheringModal =
    document.getElementById(
        "gatheringModal"
    );

const gatheringModalBackdrop =
    document.querySelector(
        ".gathering-modal-backdrop"
    );

const gatheringModalClose =
    document.querySelector(
        ".gathering-modal-close"
    );


/*
   Homepage button:
   Explore Gatherings →
*/

const openGatheringModalButton =
    document.getElementById(
        "openGatheringModal"
    );


/* =====================================================
   GATHERING SELECTION STATE
===================================================== */

let selectedGatheringType = "";

let selectedGatheringDuration = "";


/* =====================================================
   OPEN GATHERINGS DETAIL
===================================================== */

function openGatheringModal() {

    if (!gatheringModal) return;


    gatheringModal
        .classList
        .add("active");


    gatheringModal
        .setAttribute(
            "aria-hidden",
            "false"
        );


    document.body
        .classList
        .add(
            "gathering-modal-open"
        );

}


/* =====================================================
   CLOSE GATHERINGS DETAIL
===================================================== */

function closeGatheringModal() {

    if (!gatheringModal) return;


    gatheringModal
        .classList
        .remove("active");


    gatheringModal
        .setAttribute(
            "aria-hidden",
            "true"
        );


    document.body
        .classList
        .remove(
            "gathering-modal-open"
        );

}


/* =====================================================
   HOMEPAGE → EXPLORE GATHERINGS
===================================================== */

if (openGatheringModalButton) {

    openGatheringModalButton
        .addEventListener(
            "click",
            event => {

                event.preventDefault();

                openGatheringModal();

            }
        );

}


/*
   Compatibility:
   if the HTML button uses
   .experience-explore instead of the ID.
*/

document
    .querySelectorAll(
        ".experience-explore"
    )
    .forEach(button => {

        if (
            button ===
            openGatheringModalButton
        ) {
            return;
        }


        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                openGatheringModal();

            }
        );

    });


/* =====================================================
   GATHERINGS DETAIL — CLOSE
===================================================== */

if (gatheringModalClose) {

    gatheringModalClose
        .addEventListener(
            "click",
            closeGatheringModal
        );

}


if (gatheringModalBackdrop) {

    gatheringModalBackdrop
        .addEventListener(
            "click",
            closeGatheringModal
        );

}


/* =====================================================
   32. GATHERING TYPE

   Expected options:
   Private Celebrations
   Workshops
   Wellness
   Community
   Corporate
   Group Stays
===================================================== */

const gatheringChoices =
    document.querySelectorAll(
        ".gathering-choice"
    );


gatheringChoices.forEach(
    choice => {

        choice.addEventListener(
            "click",
            () => {

                gatheringChoices
                    .forEach(item => {

                        item.classList
                            .remove(
                                "active"
                            );

                        item.setAttribute(
                            "aria-pressed",
                            "false"
                        );

                    });


                choice.classList.add(
                    "active"
                );


                choice.setAttribute(
                    "aria-pressed",
                    "true"
                );


                selectedGatheringType =
                    choice.dataset.eventType ||
                    choice.dataset.type ||
                    choice.querySelector("strong")
                        ?.textContent
                        .trim() ||
                    "";

            }
        );

    }
);


/* =====================================================
   33. GATHERING DURATION

   Expected:
   A Few Hours
   Half Day
   Full Day
   Stay & Gather
===================================================== */

const gatheringDurations =
    document.querySelectorAll(
        ".gathering-duration"
    );


gatheringDurations.forEach(
    duration => {

        duration.addEventListener(
            "click",
            () => {

                gatheringDurations
                    .forEach(item => {

                        item.classList
                            .remove(
                                "active"
                            );

                        item.setAttribute(
                            "aria-pressed",
                            "false"
                        );

                    });


                duration.classList.add(
                    "active"
                );


                duration.setAttribute(
                    "aria-pressed",
                    "true"
                );


                selectedGatheringDuration =
                    duration.dataset.duration ||
                    duration
                        .querySelector(
                            "strong"
                        )
                        ?.textContent
                        .trim() ||
                    "";

            }
        );

    }
);


/* =====================================================
   34. EVENT INQUIRY MODAL
===================================================== */

const eventModal =
    document.getElementById(
        "eventInquiryModal"
    );

const eventModalBackdrop =
    document.querySelector(
        ".event-modal-backdrop"
    );

const eventModalClose =
    document.querySelector(
        ".event-modal-close"
    );

const eventForm =
    document.getElementById(
        "eventForm"
    );


/*
   Stage 2:
   Plan a Gathering →
*/

const openEventInquiryButton =
    document.getElementById(
        "openEventInquiry"
    );


/*
   Bottom CTA:
   Plan a Gathering →
*/

const openEventFormBottom =
    document.getElementById(
        "openEventFormBottom"
    );


/* =====================================================
   EVENT FORM FIELD HELPERS
===================================================== */

function findEventField(
    ...possibleIds
) {

    for (
        const id of possibleIds
    ) {

        const field =
            document.getElementById(
                id
            );

        if (field) {
            return field;
        }

    }

    return null;

}


/*
   Supports the IDs used in the current
   Event Inquiry markup as well as
   reasonable earlier naming variants.
*/

const eventNameField =
    findEventField(
        "eventName",
        "eventGuestName",
        "eventContactName"
    );

const eventPhoneField =
    findEventField(
        "eventWhatsapp",
        "eventWhatsApp",
        "eventPhone",
        "eventGuestPhone"
    );

const eventEmailField =
    findEventField(
        "eventEmail"
    );

const eventDateField =
    findEventField(
        "eventDate"
    );

const eventGuestField =
    findEventField(
        "eventGuests",
        "eventGuestCount"
    );

const eventTypeField =
    findEventField(
        "eventType"
    );

const eventDurationField =
    findEventField(
        "eventDuration"
    );

const eventNotesField =
    findEventField(
        "eventNotes",
        "eventMessage"
    );


/* =====================================================
   SYNC STAGE 2 → EVENT FORM
===================================================== */

function syncGatheringSelectionToForm() {

    if (
        eventTypeField &&
        selectedGatheringType
    ) {

        eventTypeField.value =
            selectedGatheringType;

    }


    if (
        eventDurationField &&
        selectedGatheringDuration
    ) {

        eventDurationField.value =
            selectedGatheringDuration;

    }

}


/* =====================================================
   OPEN EVENT INQUIRY
===================================================== */

function openEventInquiry(
    preserveSelection = true
) {

    if (!eventModal) return;


    if (preserveSelection) {

        syncGatheringSelectionToForm();

    }


    /*
       Stage 2 closes before Stage 3 opens.
    */

    closeGatheringModal();


    eventModal
        .classList
        .add("active");


    eventModal
        .setAttribute(
            "aria-hidden",
            "false"
        );


    document.body
        .classList
        .add(
            "event-modal-open"
        );

}


/* =====================================================
   CLOSE EVENT INQUIRY
===================================================== */

function closeEventInquiry() {

    if (!eventModal) return;


    eventModal
        .classList
        .remove("active");


    eventModal
        .setAttribute(
            "aria-hidden",
            "true"
        );


    document.body
        .classList
        .remove(
            "event-modal-open"
        );

}


/* =====================================================
   STAGE 2 → PLAN A GATHERING
===================================================== */

if (openEventInquiryButton) {

    openEventInquiryButton
        .addEventListener(
            "click",
            event => {

                event.preventDefault();


                /*
                   Type/duration help the enquiry,
                   but we don't block the guest if
                   they haven't selected both yet.
                   They can complete them in form.
                */

                openEventInquiry(
                    true
                );

            }
        );

}


/* =====================================================
   BOTTOM CTA → EVENT INQUIRY

   Bottom CTA can go directly to the enquiry,
   because the guest intentionally clicked
   "Plan a Gathering".
===================================================== */

if (openEventFormBottom) {

    openEventFormBottom
        .addEventListener(
            "click",
            event => {

                event.preventDefault();

                openEventInquiry(
                    false
                );

            }
        );

}


/* =====================================================
   EVENT MODAL — CLOSE
===================================================== */

if (eventModalClose) {

    eventModalClose
        .addEventListener(
            "click",
            closeEventInquiry
        );

}


if (eventModalBackdrop) {

    eventModalBackdrop
        .addEventListener(
            "click",
            closeEventInquiry
        );

}


/* =====================================================
   35. EVENT DATE
===================================================== */

function setEventMinimumDate() {

    if (!eventDateField) return;


    const today =
        new Date();


    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(
            2,
            "0"
        );

    const day =
        String(
            today.getDate()
        ).padStart(
            2,
            "0"
        );


    eventDateField.min =
        `${year}-${month}-${day}`;

}


setEventMinimumDate();


/* =====================================================
   36. EVENT INTERESTS
===================================================== */

function getEventInterests() {

    if (!eventForm) {
        return [];
    }


    return Array
        .from(
            eventForm.querySelectorAll(
                'input[type="checkbox"]:checked'
            )
        )
        .map(input => {

            return (
                input.value ||
                input
                    .closest("label")
                    ?.textContent
                    .trim() ||
                ""
            );

        })
        .filter(Boolean);

}


/* =====================================================
   37. EVENT INQUIRY SUBMIT
===================================================== */

if (eventForm) {

    eventForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const submitButton =
                eventForm
                    .querySelector(
                        'button[type="submit"]'
                    );


            /*
               Read again on submit in case
               the fields are select elements
               edited by the guest.
            */

            const inquiryData = {
                type: "eventInquiry",

                name:
                    eventNameField
                        ? eventNameField
                            .value
                            .trim()
                        : "",

                whatsapp:
                    eventPhoneField
                        ? eventPhoneField
                            .value
                            .trim()
                        : "",

                email:
                    eventEmailField
                        ? eventEmailField
                            .value
                            .trim()
                        : "",

                date:
                    eventDateField
                        ? eventDateField.value
                        : "",

                guests:
                    eventGuestField
                        ? eventGuestField.value
                        : "",

                eventType:
                    eventTypeField
                        ? eventTypeField.value
                        : selectedGatheringType,

                duration:
                    eventDurationField
                        ? eventDurationField.value
                        : selectedGatheringDuration,

                interests:
                    getEventInterests(),

                notes:
                    eventNotesField
                        ? eventNotesField
                            .value
                            .trim()
                        : ""

            };


            /* -----------------------------------------
               REQUIRED BASICS
            ----------------------------------------- */

            if (
                !inquiryData.name ||
                !inquiryData.whatsapp
            ) {

                alert(
                    "Please complete your name and WhatsApp number."
                );

                return;

            }


            /* -----------------------------------------
               FORMAT DATE
            ----------------------------------------- */

            let formattedDate =
                "To be discussed";


            if (inquiryData.date) {

                const selectedDate =
                    new Date(
                        inquiryData.date +
                        "T00:00:00"
                    );


                formattedDate =
                    selectedDate
                        .toLocaleDateString(
                            "en-GB",
                            {

                                day:
                                    "numeric",

                                month:
                                    "long",

                                year:
                                    "numeric"

                            }
                        );

            }


            /* -----------------------------------------
               WHATSAPP MESSAGE
            ----------------------------------------- */

            let whatsappMessage =
                `Hello Kaiara Garden, I would like to enquire about a gathering.

Name: ${inquiryData.name}
WhatsApp: ${inquiryData.whatsapp}`;


            if (inquiryData.email) {

                whatsappMessage +=
                    `\nEmail: ${inquiryData.email}`;

            }


            whatsappMessage +=
                `\nPreferred Date: ${formattedDate}`;


            if (inquiryData.guests) {

                whatsappMessage +=
                    `\nEstimated Guests: ${inquiryData.guests}`;

            }


            if (inquiryData.eventType) {
                whatsappMessage +=
                    `\nGathering Type: ${inquiryData.eventType}`;
            }


            if (inquiryData.duration) {

                whatsappMessage +=
                    `\nDuration: ${inquiryData.duration}`;

            }


            if (
                inquiryData
                    .interests
                    .length > 0
            ) {

                whatsappMessage +=
                    `\nInterested In: ${inquiryData.interests.join(", ")}`;

            }


            if (inquiryData.notes) {

                whatsappMessage +=
                    `\nNotes: ${inquiryData.notes}`;

            }


            whatsappMessage +=
                `\n\nThank you.`;


            /* -----------------------------------------
               SUBMIT STATE
            ----------------------------------------- */

            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "Sending...";

            }


            try {

                /* -------------------------------------
                   EVENT API

                   Currently optional because the
                   endpoint has not been confirmed.
                ------------------------------------- */

                if (
                    KAIARA_CONFIG
                        .eventInquiryApi
                ) {

                    await fetch(

                        KAIARA_CONFIG
                            .eventInquiryApi,

                        {

                            method:
                                "POST",

                            mode:
                                "no-cors",

                            headers: {

                                "Content-Type":
                                    "text/plain;charset=utf-8"

                            },

                            body:
                                JSON.stringify(
                                    inquiryData
                                )

                        }

                    );

                }


                /* -------------------------------------
                   CONTINUE VIA WHATSAPP
                ------------------------------------- */

                if (
                    KAIARA_CONFIG
                        .eventsWhatsapp
                ) {

                    const whatsappUrl =
                        makeWhatsAppUrl(

                            KAIARA_CONFIG
                                .eventsWhatsapp,

                            whatsappMessage

                        );


                    window.open(
                        whatsappUrl,
                        "_blank",
                        "noopener"
                    );


                    eventForm.reset();

                    selectedGatheringType =
                        "";

                    selectedGatheringDuration =
                        "";


                    gatheringChoices
                        .forEach(item => {

                            item.classList
                                .remove(
                                    "active"
                                );

                            item.setAttribute(
                                "aria-pressed",
                                "false"
                            );

                        });


                    gatheringDurations
                        .forEach(item => {

                            item.classList
                                .remove(
                                    "active"
                                );

                            item.setAttribute(
                                "aria-pressed",
                                "false"
                            );

                        });


                    setEventMinimumDate();

                } else {

                    /*
                       Don't pretend the enquiry
                       was sent when neither a
                       WhatsApp destination nor a
                       confirmed event API exists.
                    */

                    if (
                        KAIARA_CONFIG
                            .eventInquiryApi
                    ) {

                        alert(
                            "Your event enquiry has been submitted. Our team will follow up with you."
                        );

                        eventForm.reset();

                    } else {

                        alert(
                            "Event enquiries are not connected yet. Please add the Events WhatsApp number in KAIARA_CONFIG before publishing this form."
                        );

                    }

                }

            } catch (error) {

                console.error(
                    "Event inquiry error:",
                    error
                );


                alert(
                    "We couldn't continue your enquiry. Please try again."
                );

            } finally {

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        "Continue via WhatsApp";

                }

            }

        }
    );

}


/* =====================================================
   38. GATHERINGS / EVENT KEYBOARD CONTROL
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        /*
           Event Inquiry is the upper layer.
        */

        if (
            eventModal &&
            eventModal
                .classList
                .contains("active")
        ) {

            closeEventInquiry();

            return;

        }


        if (
            gatheringModal &&
            gatheringModal
                .classList
                .contains("active")
        ) {

            closeGatheringModal();

        }

    }
);


/* =====================================================
   NEXT:
   FINAL WEBSITE CONTROLS

   About / Our Story
   Bottom CTA
   Contact safety
   External links
   Modal cleanup
===================================================== */

/* =====================================================
   39. ABOUT / OUR STORY MODAL
===================================================== */

const aboutModal =
    document.getElementById(
        "aboutModal"
    );

const aboutModalBackdrop =
    document.querySelector(
        ".about-modal-backdrop"
    );

const aboutModalClose =
    document.querySelector(
        ".about-modal-close"
    );


/*
   Main trigger.
   Current HTML may use an ID,
   while older structure may use
   .about-link / data-open-about.
*/

const aboutTriggers =
    document.querySelectorAll(
        "#openAboutModal, .about-link, [data-open-about]"
    );


/* =====================================================
   OPEN ABOUT
===================================================== */

function openAboutModal() {

    if (!aboutModal) return;


    aboutModal
        .classList
        .add("active");


    aboutModal
        .setAttribute(
            "aria-hidden",
            "false"
        );


    document.body
        .classList
        .add(
            "about-modal-open"
        );

}


/* =====================================================
   CLOSE ABOUT
===================================================== */

function closeAboutModal() {

    if (!aboutModal) return;


    aboutModal
        .classList
        .remove("active");


    aboutModal
        .setAttribute(
            "aria-hidden",
            "true"
        );


    document.body
        .classList
        .remove(
            "about-modal-open"
        );

}


/* =====================================================
   ABOUT TRIGGERS
===================================================== */

aboutTriggers.forEach(
    trigger => {

        trigger.addEventListener(
            "click",
            event => {

                event.preventDefault();

                openAboutModal();

            }
        );

    }
);


/* =====================================================
   ABOUT CLOSE CONTROLS
===================================================== */

if (aboutModalClose) {

    aboutModalClose
        .addEventListener(
            "click",
            closeAboutModal
        );

}


if (aboutModalBackdrop) {

    aboutModalBackdrop
        .addEventListener(
            "click",
            closeAboutModal
        );

}


/* =====================================================
   40. BOTTOM CTA — STAY

   Café + Gatherings are handled
   in Parts 4 and 5.
===================================================== */

const bottomStayButtons =
    document.querySelectorAll(
        ".booking-stay-button, [data-booking='stay']"
    );


bottomStayButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            event => {

                if (
                    !KAIARA_CONFIG
                        .stayWhatsapp
                ) {

                    event.preventDefault();

                    console.warn(
                        "Stay WhatsApp number has not been added to KAIARA_CONFIG yet."
                    );

                    return;

                }


                const message =
                    "Hello Kaiara Garden, I would like to check room availability for a stay.";


                const url =
                    makeWhatsAppUrl(
                        KAIARA_CONFIG
                            .stayWhatsapp,
                        message
                    );


                event.preventDefault();


                window.open(
                    url,
                    "_blank",
                    "noopener"
                );

            }
        );

    }
);


/* =====================================================
   41. GENERIC STAY WHATSAPP LINKS

   Footer/contact links can open a
   simple conversation without
   duplicating booking behaviour.
===================================================== */

document
    .querySelectorAll(
        ".stay-whatsapp-link"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                if (
                    !KAIARA_CONFIG
                        .stayWhatsapp
                ) {

                    event.preventDefault();

                    console.warn(
                        "Stay WhatsApp number has not been added yet."
                    );

                    return;

                }


                const message =
                    "Hello Kaiara Garden, I would like to ask about staying at Kaiara.";


                event.preventDefault();


                window.open(
                    makeWhatsAppUrl(
                        KAIARA_CONFIG
                            .stayWhatsapp,
                        message
                    ),
                    "_blank",
                    "noopener"
                );

            }
        );

    });


/* =====================================================
   42. GENERIC CAFÉ WHATSAPP LINKS
===================================================== */

document
    .querySelectorAll(
        ".cafe-whatsapp-link"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                if (
                    !KAIARA_CONFIG
                        .cafeWhatsapp
                ) {

                    event.preventDefault();

                    console.warn(
                        "Café WhatsApp number has not been added yet."
                    );

                    return;

                }


                const message =
                    "Hello Kaiara Café, I would like to ask about the café.";


                event.preventDefault();


                window.open(
                    makeWhatsAppUrl(
                        KAIARA_CONFIG
                            .cafeWhatsapp,
                        message
                    ),
                    "_blank",
                    "noopener"
                );

            }
        );

    });


/* =====================================================
   43. GENERIC EVENTS WHATSAPP LINKS
===================================================== */

document
    .querySelectorAll(
        ".events-whatsapp-link"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                if (
                    !KAIARA_CONFIG
                        .eventsWhatsapp
                ) {

                    event.preventDefault();

                    console.warn(
                        "Events WhatsApp number has not been added yet."
                    );

                    return;

                }


                const message =
                    "Hello Kaiara Garden, I would like to ask about gatherings and events.";


                event.preventDefault();


                window.open(
                    makeWhatsAppUrl(
                        KAIARA_CONFIG
                            .eventsWhatsapp,
                        message
                    ),
                    "_blank",
                    "noopener"
                );

            }
        );

    });


/* =====================================================
   44. EMAIL LINKS
===================================================== */

document
    .querySelectorAll(
        ".email-link"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                if (
                    !KAIARA_CONFIG.email
                ) {

                    event.preventDefault();

                    console.warn(
                        "Kaiara email address has not been added yet."
                    );

                    return;

                }


                link.href =
                    `mailto:${KAIARA_CONFIG.email}`;

            }
        );

    });


/* =====================================================
   45. INSTAGRAM LINKS
===================================================== */

document
    .querySelectorAll(
        ".instagram-link"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                if (
                    !KAIARA_CONFIG
                        .instagramUrl
                ) {

                    event.preventDefault();

                    console.warn(
                        "Kaiara Instagram URL has not been added yet."
                    );

                    return;

                }


                link.href =
                    KAIARA_CONFIG
                        .instagramUrl;

                link.target =
                    "_blank";

                link.rel =
                    "noopener";

            }
        );

    });


/* =====================================================
   46. MAP DIRECTIONS
===================================================== */

document
    .querySelectorAll(
        ".maps-directions-link"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                if (
                    !KAIARA_CONFIG
                        .mapsDirectionsUrl
                ) {

                    event.preventDefault();

                    console.warn(
                        "Google Maps directions URL has not been added yet."
                    );

                    return;

                }


                link.href =
                    KAIARA_CONFIG
                        .mapsDirectionsUrl;

                link.target =
                    "_blank";

                link.rel =
                    "noopener";

            }
        );

    });


/* =====================================================
   47. MODAL STATE HELPER
===================================================== */

function anyKaiaraModalOpen() {

    const selectors = [

        "#roomModal",
        "#fullscreenGallery",
        "#facilityModal",
        "#cafeModal",
        "#cafeReservationModal",
        "#gatheringModal",
        "#eventInquiryModal",
        "#eventModal",
        "#aboutModal"

    ];


    return selectors.some(
        selector => {

            const element =
                document.querySelector(
                    selector
                );


            return (
                element &&
                element.classList
                    .contains("active")
            );

        }
    );

}


/* =====================================================
   48. BODY SCROLL SAFETY

   Existing modal-specific classes remain
   untouched.

   This simply adds one common class
   whenever a modal is active.
===================================================== */

function syncGlobalModalState() {

    document.body
        .classList
        .toggle(
            "kaiara-modal-open",
            anyKaiaraModalOpen()
        );

}


/*
   Observe modal class changes rather than
   replacing any of the old modal behaviour.
*/

const modalElementsToObserve =
    [

        roomModal,
        fullscreenGallery,
        facilityModal,
        cafeModal,
        cafeReservationModal,
        gatheringModal,
        eventModal,
        aboutModal

    ].filter(Boolean);


if (
    modalElementsToObserve.length > 0
) {

    const modalObserver =
        new MutationObserver(
            syncGlobalModalState
        );


    modalElementsToObserve
        .forEach(modal => {

            modalObserver.observe(
                modal,
                {
                    attributes:
                        true,

                    attributeFilter:
                        ["class"]
                }
            );

        }
        );

}


/* =====================================================
   49. ABOUT — ESCAPE

   Other modals already have their own
   Escape handling in previous parts.
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key !== "Escape"
        ) {
            return;
        }


        /*
           Don't close About underneath
           another active modal.
        */

        const anotherModalOpen = [

            roomModal,
            fullscreenGallery,
            facilityModal,
            cafeModal,
            cafeReservationModal,
            gatheringModal,
            eventModal

        ]
            .filter(Boolean)
            .some(modal => {

                return modal
                    .classList
                    .contains("active");

            });


        if (
            anotherModalOpen
        ) {
            return;
        }


        if (
            aboutModal &&
            aboutModal
                .classList
                .contains("active")
        ) {

            closeAboutModal();

        }

    }
);


/* =====================================================
   50. EXTERNAL LINK SAFETY
===================================================== */

document
    .querySelectorAll(
        'a[target="_blank"]'
    )
    .forEach(link => {

        const currentRel =
            link.getAttribute(
                "rel"
            ) || "";


        const relValues =
            new Set(
                currentRel
                    .split(/\s+/)
                    .filter(Boolean)
            );


        relValues.add(
            "noopener"
        );

        relValues.add(
            "noreferrer"
        );


        link.setAttribute(
            "rel",
            Array
                .from(relValues)
                .join(" ")
        );

    });

/* =====================================================
HERO PHOTO SLIDESHOW
===================================================== */

const heroSlides =
    document.querySelectorAll(
        ".hero-slide"
    );

let currentHeroSlide = 0;


if (heroSlides.length > 1) {

    setInterval(() => {

        heroSlides[currentHeroSlide]
            .classList.remove("active");

        currentHeroSlide =
            (currentHeroSlide + 1) %
            heroSlides.length;

        heroSlides[currentHeroSlide]
            .classList.add("active");

    }, 7000);

}


/* GATHERINGS — TAMPILKAN FOTO SAAT SUDAH TERSEDIA */

document.querySelectorAll("#gatheringGallery img").forEach(img => {
    const showImage = () => img.classList.add("is-loaded");

    if (img.complete && img.naturalWidth > 0) {
        showImage();
    } else {
        img.addEventListener("load", showImage);
    }
});


/* =====================================================
   51. INITIAL STATE
===================================================== */

syncGlobalModalState();


/* =====================================================
   KAIARA GARDEN WEBSITE
   JAVASCRIPT COMPLETE
===================================================== */