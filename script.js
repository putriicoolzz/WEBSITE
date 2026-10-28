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
    instagramUrl: "https://www.instagram.com/kaiara.garden?stkn=MWJjaTJ4YWpjZmJlYQ%3D%3D&utm_source=qr",

    /* External links */
    cafeMenuUrl: "",
    mapsDirectionsUrl: "https://maps.app.goo.gl/qaK2VA8FExLWAdjB9",

    /* Café reservation Google Apps Script */
    cafeReservationApi:
        "https://script.google.com/macros/s/AKfycbyBxDhZ95RvNnH5uyNGuvJBu9PlxKEfDy11TY1O6e-qg2VVA1TkNpB2CDa7lCYr2AmPGA/exec",

    /* Event inquiry — belum diisi */
    eventInquiryApi:
        "https://script.google.com/macros/s/AKfycbyBxDhZ95RvNnH5uyNGuvJBu9PlxKEfDy11TY1O6e-qg2VVA1TkNpB2CDa7lCYr2AmPGA/exec",

    /* Stay booking */
    airbnbUrl: "abc",

    /* Stay Reservation API */
    stayReservationApi:
        "https://script.google.com/macros/s/AKfycbzt8VySMS90A2tMjrLiBY70A5dPD3-VvChFL2gbV-Xa-PI5bcDhvtacnsDoKJACbCRVkA/exec"

};


/* =====================================================
   KAIARA GARDEN — CENTRAL PHOTO LIBRARY

   Semua path foto dikelola dari sini.

   CARA MENGGANTI FOTO:
   1. Masukkan file ke folder images/
   2. Sesuaikan nilai src di bawah.
   3. Gunakan ID foto untuk menampilkannya
      di berbagai section website.

   CATATAN:
   - galleryOrder menentukan urutan fullscreen.
   - homepage: true berarti foto termasuk 5 pilihan.
   - building adalah label internal, bukan nama
     bangunan resmi.
   - Foto yang belum tersedia akan menggunakan
     placeholder saat gallery dihubungkan nanti.
===================================================== */

const KAIARA_PHOTOS = {

    // 01 — Foto utama yang menunjukkan keseluruhan
    // karakter properti, idealnya beberapa bangunan.
    propertyOverview: {
        src: "images/gallery-01.jpg",
        alt: "Kaiara Garden property overview",
        category: "architecture",
        building: "multiple",
        homepage: true,
        galleryOrder: 1
    },

    // 02 — Bangunan atau area akomodasi pertama.
    // Foto eksterior, bukan close-up kamar.
    accommodationExterior: {
        src: "images/gallery-02.jpg",
        alt: "Accommodation building at Kaiara Garden",
        category: "architecture",
        building: "accommodation",
        homepage: true,
        galleryOrder: 2
    },

    // 03 — Suasana kamar dengan cahaya alami.
    bedroom: {
        src: "images/gallery-03.jpg",
        alt: "Comfortable guest room at Kaiara Garden",
        category: "stay",
        building: "accommodation",
        homepage: false,
        galleryOrder: 3
    },

    // 04 — Bangunan atau area café.
    // Memperlihatkan identitas bangunan yang berbeda.
    cafeExterior: {
        src: "images/gallery-04.jpg",
        alt: "Cafe building at Kaiara Garden",
        category: "cafe",
        building: "cafe",
        homepage: true,
        galleryOrder: 4
    },

    // 05 — Suasana café dengan makanan/minuman.
    cafeAmbience: {
        src: "images/gallery-05.jpg",
        alt: "Dining and coffee experience",
        category: "cafe",
        building: "cafe",
        homepage: false,
        galleryOrder: 5
    },

    // 06 — Kolam renang dan area sekitarnya.
    swimmingPool: {
        src: "images/gallery-06.jpg",
        alt: "Swimming pool at Kaiara Garden",
        category: "facilities",
        building: "outdoor",
        homepage: true,
        galleryOrder: 6
    },

    // 07 — Bangunan atau sudut arsitektur lainnya.
    // Pilih angle berbeda dari foto 01 dan 02.
    additionalBuilding: {
        src: "images/gallery-07.jpg",
        alt: "Another architectural view of Kaiara Garden",
        category: "architecture",
        building: "other",
        homepage: false,
        galleryOrder: 7
    },

    // 08 — Taman, courtyard, atau lounge outdoor.
    gardenLounge: {
        src: "images/gallery-08.jpg",
        alt: "Garden and outdoor lounge",
        category: "outdoor",
        building: "outdoor",
        homepage: false,
        galleryOrder: 8
    },

    // 09 — Sauna atau fasilitas wellness.
    wellness: {
        src: "images/gallery-09.jpg",
        alt: "Wellness experience at Kaiara Garden",
        category: "wellness",
        building: "facilities",
        homepage: false,
        galleryOrder: 9
    },

    // 10 — Dokumentasi aktivitas atau gathering.
    gathering: {
        src: "images/gallery-10.jpg",
        alt: "Gathering experience at Kaiara Garden",
        category: "experience",
        building: "outdoor",
        homepage: true,
        galleryOrder: 10
    },

    // 11 — Suasana sore atau malam dengan
    // pencahayaan hangat pada bangunan/properti.
    eveningAmbience: {
        src: "images/gallery-11.jpg",
        alt: "Evening ambience at Kaiara Garden",
        category: "atmosphere",
        building: "multiple",
        homepage: false,
        galleryOrder: 11
    }
};

/* Ambil satu foto berdasarkan ID.
   Contoh: getKaiaraPhoto("swimmingPool") */
function getKaiaraPhoto(photoId) {
    return KAIARA_PHOTOS[photoId] || null;
}

/* Ambil semua foto sesuai urutan fullscreen. */
function getKaiaraGalleryPhotos() {
    return Object.values(KAIARA_PHOTOS)
        .sort((a, b) => a.galleryOrder - b.galleryOrder);
}

/* Ambil hanya foto pilihan homepage. */
function getKaiaraHomepagePhotos() {
    return getKaiaraGalleryPhotos()
        .filter(photo => photo.homepage);
}


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


/* =========================================
   FULLSCREEN GALLERY — MOBILE SWIPE
   ========================================= */

if (fullscreenGallery) {
    let touchStartX = 0;
    let touchStartY = 0;

    fullscreenGallery.addEventListener("touchstart", (event) => {
        if (event.touches.length !== 1) return;

        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    }, { passive: true });

    fullscreenGallery.addEventListener("touchend", (event) => {
        if (!fullscreenGallery.classList.contains("active")) return;
        if (event.changedTouches.length !== 1) return;

        const deltaX = event.changedTouches[0].clientX - touchStartX;
        const deltaY = event.changedTouches[0].clientY - touchStartY;

        // Abaikan gerakan vertikal dan sentuhan terlalu pendek.
        if (Math.abs(deltaX) < 50) return;
        if (Math.abs(deltaX) < Math.abs(deltaY)) return;

        if (deltaX < 0) {
            // Swipe kiri: foto berikutnya.
            showGalleryPhoto(currentGalleryIndex + 1);
        } else {
            // Swipe kanan: foto sebelumnya.
            showGalleryPhoto(currentGalleryIndex - 1);
        }
    }, { passive: true });
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
   GATHERING — MOBILE SWIPE COUNTER
===================================================== */

if (gatheringGallery) {

    const current = document.getElementById("gatheringGalleryCurrent");
    const total = document.getElementById("gatheringGalleryTotal");

    const photos = [
        ...gatheringGallery.querySelectorAll("[data-gathering-index]")
    ];

    if (current && total && photos.length) {

        total.textContent = photos.length;

        function updateGatheringCounter() {

            const galleryRect = gatheringGallery.getBoundingClientRect();
            const galleryCenter = galleryRect.left + galleryRect.width / 2;

            let activeIndex = 0;
            let closestDistance = Infinity;

            photos.forEach((photo, index) => {

                const rect = photo.getBoundingClientRect();
                const photoCenter = rect.left + rect.width / 2;
                const distance = Math.abs(photoCenter - galleryCenter);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    activeIndex = index;
                }
            });

            current.textContent = activeIndex + 1;
        }

        gatheringGallery.addEventListener(
            "scroll",
            updateGatheringCounter,
            { passive: true }
        );

        window.addEventListener("resize", updateGatheringCounter);

        updateGatheringCounter();
    }
}

/* =====================================================
   MAIN GALLERY — HOMEPAGE + FULLSCREEN

   Homepage menampilkan 5 foto pilihan.
   Fullscreen menampilkan seluruh 11 foto.

   Semua sumber foto berasal dari KAIARA_PHOTOS.
   Foto yang belum tersedia memakai placeholder.

   Reusable: foto bisa digunakan di section lain
   melalui getKaiaraPhoto("photoId").
===================================================== */

const mainGallery = document.getElementById("mainGallery");

if (mainGallery) {

    const allMainPhotos = getKaiaraGalleryPhotos();

    const photoEntries = Object.entries(KAIARA_PHOTOS);

    mainGallery.querySelectorAll("[data-photo-id]")
        .forEach(button => {

            const photoId = button.dataset.photoId;
            const photo = getKaiaraPhoto(photoId);

            if (!photo) return;

            // Simpan deskripsi foto untuk accessibility.
            button.setAttribute("aria-label", photo.alt);

            // Tampilkan foto jika file tersedia.
            const img = new Image();
            img.alt = photo.alt;

            img.onload = () => {
                button.replaceChildren(img);
                img.classList.add("main-gallery-image");
            };

            img.onerror = () => {
                // Placeholder HTML tetap terlihat.
            };

            img.src = photo.src;

            // Klik foto homepage → buka fullscreen 11 foto.
            button.addEventListener("click", () => {

                activeGalleryPhotos = allMainPhotos.map(
                    item => item.src
                );

                const selectedIndex = allMainPhotos.findIndex(
                    item => item === photo
                );

                openFullscreenGallery(
                    selectedIndex >= 0 ? selectedIndex : 0
                );
            });

        });
}


/* =========================================
   MOBILE GALLERY — 11 PHOTOS + SWIPE COUNTER
   ========================================= */

const mobileGallery = document.getElementById("mobileGallery");
const mobileGalleryCurrent = document.getElementById("mobileGalleryCurrent");
const mobileGalleryTotal = document.getElementById("mobileGalleryTotal");

if (mobileGallery) {

    const mobilePhotos = getKaiaraGalleryPhotos();

    if (mobileGalleryTotal) {
        mobileGalleryTotal.textContent = mobilePhotos.length;
    }

    mobilePhotos.forEach((photo, index) => {

        const button = document.createElement("button");
        button.type = "button";
        button.className = "mobile-gallery-item";
        button.setAttribute("aria-label", photo.alt);

        const placeholder = document.createElement("span");
        placeholder.textContent = "PHOTO COMING SOON";
        button.appendChild(placeholder);

        const img = new Image();
        img.alt = photo.alt;

        img.onload = () => {
            button.replaceChildren(img);
        };

        img.src = photo.src;

        button.addEventListener("click", () => {
            activeGalleryPhotos = mobilePhotos.map(item => item.src);
            openFullscreenGallery(index);
        });

        mobileGallery.appendChild(button);
    });

    function updateMobileGalleryCounter() {
        const firstPhoto = mobileGallery.querySelector(".mobile-gallery-item");
        if (!firstPhoto || !mobileGalleryCurrent) return;

        const step = firstPhoto.getBoundingClientRect().width
            + parseFloat(getComputedStyle(mobileGallery).columnGap || 0);

        if (!step) return;

        const index = Math.round(mobileGallery.scrollLeft / step);

        mobileGalleryCurrent.textContent =
            Math.min(Math.max(index + 1, 1), mobilePhotos.length);
    }

    mobileGallery.addEventListener("scroll", updateMobileGalleryCounter, {
        passive: true
    });

    window.addEventListener("resize", updateMobileGalleryCounter);
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
   12. ROOM BOOKING CTA — SCROLL TO BOOKING
===================================================== */

const roomBookingButton =
    document.querySelector(".room-modal-book-button");

if (roomBookingButton) {

    roomBookingButton.addEventListener("click", event => {

        event.preventDefault();

        const selectedRoom = activeRoomKey;

        if (typeof closeRoomModal === "function") {
            closeRoomModal();
        }

        const bookingSection =
            document.getElementById("booking");

        if (bookingSection) {
            bookingSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

        if (selectedRoom) {
            const roomSelect =
                document.querySelector(
                    '#stayBookingForm select[name="room"]'
                );

            const roomNames = {
                garden: "Walnut Garden",
                terrace: "Walnut Terrace",
                suite: "Pine Suite",
                loft: "Oak Loft"
            };

            if (roomSelect) {
                roomSelect.value =
                    roomNames[selectedRoom] || "No preference";
            }
        }
    });
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
    "images/cafe-01.jpg",
    "images/cafe-02.jpg",
    "images/cafe-03.jpg",
    "images/cafe-04.jpg",
    "images/cafe-05.jpg"
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

        const photoSrc = CAFE_PHOTOS[0];

        cafeModalImage.textContent = "KAIARA GARDEN";

        const img = new Image();
        img.alt = "Kaiara Café ambience";

        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        img.style.display = "block";

        img.onload = () => {
            cafeModalImage.replaceChildren(img);
        };

        img.src = photoSrc;
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
                            "We're unable to open WhatsApp at the moment. Please contact Kaiara directly to confirm your reservation."
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
   Open booking options instead of WhatsApp
===================================================== */

const bottomStayButtons =
    document.querySelectorAll(
        ".booking-stay-button, [data-booking='stay']"
    );

bottomStayButtons.forEach(button => {
    button.addEventListener("click", event => {
        event.preventDefault();

        const bookingSection =
            document.getElementById("booking");

        if (!bookingSection) return;

        bookingSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        if (typeof showStayBookingOptions === "function") {
            showStayBookingOptions();
        }
    });
});

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
   CAFÉ — TAMPILKAN FOTO SAAT SUDAH TERSEDIA
===================================================== */

document.querySelectorAll("#cafeGallery img").forEach(img => {

    const showImage = () => {
        img.classList.add("is-loaded");
    };

    if (img.complete && img.naturalWidth > 0) {
        showImage();
    } else {
        img.addEventListener("load", showImage);
    }

});

/* =====================================================
   CAFÉ — MOBILE SWIPE COUNTER
===================================================== */

const cafeGallery = document.getElementById("cafeGallery");

if (cafeGallery) {

    const current = document.getElementById("cafeGalleryCurrent");
    const total = document.getElementById("cafeGalleryTotal");

    const photos = [
        ...cafeGallery.querySelectorAll(".cafe-gallery-item")
    ];

    if (current && total && photos.length) {

        total.textContent = photos.length;

        function updateCafeCounter() {

            const galleryRect = cafeGallery.getBoundingClientRect();
            const galleryCenter = galleryRect.left + galleryRect.width / 2;

            let activeIndex = 0;
            let closestDistance = Infinity;

            photos.forEach((photo, index) => {

                const rect = photo.getBoundingClientRect();
                const photoCenter = rect.left + rect.width / 2;
                const distance = Math.abs(photoCenter - galleryCenter);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    activeIndex = index;
                }
            });

            current.textContent = activeIndex + 1;
        }

        cafeGallery.addEventListener(
            "scroll",
            updateCafeCounter,
            { passive: true }
        );

        window.addEventListener("resize", updateCafeCounter);

        updateCafeCounter();
    }
}

/* =====================================================
   CAFÉ — FULLSCREEN PHOTO GALLERY
===================================================== */

if (cafeGallery) {

    const cafePhotos = [
        ...cafeGallery.querySelectorAll(".cafe-gallery-item img")
    ];

    cafePhotos.forEach((img, index) => {

        img.parentElement.style.cursor = "pointer";

        img.parentElement.addEventListener("click", () => {

            activeGalleryPhotos = cafePhotos.map(photo => {
                return photo.getAttribute("src");
            });

            openFullscreenGallery(index);

        });

    });

}

/* =========================================
   FOOTER — DISPLAY CONTACT NUMBERS
========================================= */

function formatFooterWhatsapp(number) {
    const digits = String(number || "").replace(/\D/g, "");

    if (!digits) return "";

    return "+" + digits;
}

const footerStayNumber =
    document.getElementById("footerStayNumber");

const footerCafeNumber =
    document.getElementById("footerCafeNumber");

if (footerStayNumber) {
    footerStayNumber.textContent =
        formatFooterWhatsapp(KAIARA_CONFIG.stayWhatsapp);
}

if (footerCafeNumber) {
    footerCafeNumber.textContent =
        formatFooterWhatsapp(KAIARA_CONFIG.cafeWhatsapp);
}

const footerEmail =
    document.getElementById("footerEmail");

if (footerEmail && KAIARA_CONFIG.email) {
    footerEmail.textContent = KAIARA_CONFIG.email;
    footerEmail.href = `mailto:${KAIARA_CONFIG.email}`;
}

/* =====================================================
   43. STAY BOOKING — DIRECT & AIRBNB
===================================================== */

const stayBookingToggle =
    document.getElementById("showStayBooking");

const stayBookingOptions =
    document.getElementById("stayBookingOptions");

const stayBookingForm =
    document.getElementById("stayBookingForm");

const stayAirbnbLink =
    document.getElementById("stayAirbnbLink");


/* OPEN BOOKING OPTIONS */

function showStayBookingOptions() {

    if (!stayBookingOptions) return;

    const isCurrentlyOpen = !stayBookingOptions.hidden;

    stayBookingOptions.hidden = isCurrentlyOpen;

    if (!isCurrentlyOpen) {
        stayBookingOptions.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

if (stayBookingToggle) {
    stayBookingToggle.addEventListener("click", event => {
        event.preventDefault();
        showStayBookingOptions();
    });
}


/* AIRBNB LINK */

if (stayAirbnbLink) {

    const airbnbUrl = KAIARA_CONFIG.airbnbUrl;

    if (airbnbUrl && /^https:\/\/(www\.)?airbnb\.[^/]+\/rooms\//i.test(airbnbUrl)) {
        stayAirbnbLink.href = airbnbUrl;
    } else {
        stayAirbnbLink.removeAttribute("href");
        stayAirbnbLink.setAttribute("aria-disabled", "true");
        stayAirbnbLink.textContent = "Airbnb listing coming soon";
    }
}

/* =========================================
   STAY — WIB DATE VALIDATION
========================================= */

const stayCheckin =
    document.getElementById("stayCheckin");

const stayCheckout =
    document.getElementById("stayCheckout");

/* CURRENT DATE IN BANDUNG (WIB) */

function getStayWIBToday() {
    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Jakarta",
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).formatToParts(new Date());

    const values = Object.fromEntries(
        parts
            .filter(part => part.type !== "literal")
            .map(part => [part.type, part.value])
    );

    return `${values.year}-${values.month}-${values.day}`;
}

/* NEXT CALENDAR DAY */

function getStayNextDay(dateString) {
    const date = new Date(`${dateString}T12:00:00Z`);
    date.setUTCDate(date.getUTCDate() + 1);
    return date.toISOString().slice(0, 10);
}

/* UPDATE CHECK-IN & CHECK-OUT LIMITS */

function refreshStayDateLimits() {
    if (!stayCheckin || !stayCheckout) return;

    const todayWIB = getStayWIBToday();

    stayCheckin.min = todayWIB;

    if (stayCheckin.value && stayCheckin.value < todayWIB) {
        stayCheckin.value = "";
        stayCheckout.value = "";
    }

    if (stayCheckin.value) {
        stayCheckout.min = getStayNextDay(stayCheckin.value);
    } else {
        stayCheckout.min = todayWIB;
    }

    if (
        stayCheckout.value &&
        stayCheckout.value < stayCheckout.min
    ) {
        stayCheckout.value = "";
    }
}


/* REFRESH WHEN CHECK-IN IS FINISHED */

if (stayCheckin && stayCheckout) {
    stayCheckin.addEventListener("blur", () => {
        refreshStayDateLimits();
    });

    stayCheckin.addEventListener("change", () => {
        if (document.activeElement !== stayCheckin) {
            refreshStayDateLimits();
        }
    });
}


/* REFRESH WHEN RETURNING TO WEBSITE */

document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        refreshStayDateLimits();
    }
});

window.addEventListener(
    "focus",
    refreshStayDateLimits
);

/* INITIAL VALIDATION */

refreshStayDateLimits();


/* =========================================
   STAY INQUIRY — GOOGLE SHEETS TRANSPORT
========================================= */

function sendStayInquiryToSheets(payload) {
    const apiUrl = KAIARA_CONFIG.stayReservationApi;

    if (!apiUrl) {
        return Promise.reject(
            new Error("Stay Inquiry API is not configured.")
        );
    }

    return fetch(apiUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "text/plain;charset=UTF-8"
        },
        body: JSON.stringify(payload)
    });
}

/* STAY DIRECT BOOKING FORM - DIRECT & AIRBNB */

stayBookingForm.addEventListener("submit", async event => {

    event.preventDefault();

    refreshStayDateLimits();

    if (!stayBookingForm.reportValidity()) return;

    const data = new FormData(stayBookingForm);


    const checkin = data.get("checkin");
    const checkout = data.get("checkout");

    const currentDateWIB = getStayWIBToday();

    if (checkin < currentDateWIB) {
        alert("Check-in date cannot be in the past (WIB).");
        return;
    }

    if (checkout <= checkin) {
        alert("Check-out must be after check-in.");
        return;
    }

    /* VALIDATE STAY DATA BEFORE API SUBMISSION */

    const guestName = String(data.get("guestName") || "").trim();
    const guestPhone = String(data.get("guestPhone") || "").trim();
    const guestCount = Number(data.get("guests"));

    if (!guestName || guestName.length > 120) {
        alert("Please enter a valid guest name.");
        return;
    }

    if (!/^\+?[0-9 ()-]{8,22}$/.test(guestPhone)) {
        alert("Please enter a valid WhatsApp number.");
        return;
    }

    if (
        !Number.isInteger(guestCount) ||
        guestCount < 1 ||
        guestCount > 20
    ) {
        alert("Please enter a valid number of guests (1–20).");
        return;
    }

    const isRealDate = value => {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

        const parsed = new Date(value + "T00:00:00Z");

        return (
            !Number.isNaN(parsed.getTime()) &&
            parsed.toISOString().slice(0, 10) === value
        );
    };

    if (!isRealDate(checkin) || !isRealDate(checkout)) {
        alert("Please enter valid check-in and check-out dates.");
        return;
    }

    if (
        String(data.get("room") || "").length > 120 ||
        String(data.get("occasion") || "").length > 120 ||
        String(data.get("notes") || "").length > 1000
    ) {
        alert("Booking information is too long.");
        return;
    }


    /* PREPARE GOOGLE SHEETS INQUIRY */

    const requestId =
        "KAI-ST-" +
        crypto.randomUUID()
            .replace(/-/g, "")
            .slice(0, 8)
            .toUpperCase();

    const stayInquiryPayload = {
        requestId: requestId,
        guestName: data.get("guestName"),
        guestPhone: data.get("guestPhone"),
        checkin: checkin,
        checkout: checkout,
        guests: Number(data.get("guests")),
        room: data.get("room"),
        occasion: data.get("occasion") || "",
        notes: data.get("notes") || ""
    };

    const message = [
        "Hello Kaiara Garden!",
        "",
        "I'd like to enquire about a stay.",
        "",
        `Name: ${data.get("guestName")}`,
        `WhatsApp: ${data.get("guestPhone")}`,
        `Check-in: ${checkin}`,
        `Check-out: ${checkout}`,
        `Guests: ${data.get("guests")}`,
        `Preferred Room: ${data.get("room")}`,
        `Occasion: ${data.get("occasion") || "-"}`,
        `Special Requests: ${data.get("notes") || "-"}`,
        "",
        "Could you please help me check availability and rates?",
        "",
        "Thank you!"
    ].join("\n");

    const url = makeWhatsAppUrl(
        KAIARA_CONFIG.stayWhatsapp,
        message
    );

    if (url === "#") {
        alert("Our reservation contact is not available yet.");
        return;
    }

    /* OPEN WHATSAPP FIRST */

    window.open(url, "_blank", "noopener");

    /* SEND INQUIRY TO GOOGLE SHEETS */

    try {
        await sendStayInquiryToSheets(stayInquiryPayload);

        console.log(
            "Stay inquiry sent to API (storage not verified):",
            stayInquiryPayload.requestId
        );

    } catch (error) {
        console.error(
            "Unable to send stay inquiry:",
            error
        );
    }
});

/* =========================================
   STAY BOOKING — UNIFIED NAVIGATION
========================================= */

document.querySelectorAll(
    'a[href="#booking"], a[href="#stayBookingOptions"]'
).forEach(link => {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const bookingSection =
            document.getElementById("booking");

        if (!bookingSection) return;

        bookingSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});

/* =====================================================
   51. INITIAL STATE
===================================================== */

syncGlobalModalState();

/* =========================================
   CAFE & EVENTS — WIB DATE & TIME VALIDATION
========================================= */

(function () {
    const cafeDate = document.getElementById("cafeReservationDate");
    const cafeTime = document.getElementById("cafeReservationTime");
    const cafeForm = document.getElementById("cafeReservationForm");

    const eventDate = document.getElementById("eventDate");
    const eventForm = document.getElementById("eventForm");

    function getWIBNow() {
        const parts = new Intl.DateTimeFormat("en-GB", {
            timeZone: "Asia/Jakarta",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23"
        }).formatToParts(new Date());

        const values = Object.fromEntries(
            parts.filter(part => part.type !== "literal")
                .map(part => [part.type, part.value])
        );

        return {
            date: `${values.year}-${values.month}-${values.day}`,
            minutes: Number(values.hour) * 60 + Number(values.minute)
        };
    }

    function updateBookingLimits() {
        const wib = getWIBNow();

        if (cafeDate) {
            if (cafeDate.min !== wib.date) {
                cafeDate.min = wib.date;
            }

            const maxDate = `${Number(wib.date.slice(0, 4)) + 2}-12-31`;

            if (cafeDate.max !== maxDate) {
                cafeDate.max = maxDate;
            }
        }

        if (eventDate) {
            if (eventDate.min !== wib.date) {
                eventDate.min = wib.date;
            }

            const maxDate = `${Number(wib.date.slice(0, 4)) + 2}-12-31`;

            if (eventDate.max !== maxDate) {
                eventDate.max = maxDate;
            }
        }

        if (cafeDate && cafeTime) {
            const isToday = cafeDate.value === wib.date;

            Array.from(cafeTime.options).forEach(option => {
                if (!option.value) return;

                const [hours, minutes] = option.value.split(":").map(Number);
                const optionMinutes = hours * 60 + minutes;

                option.disabled = isToday && optionMinutes <= wib.minutes;
            });

            if (cafeTime.selectedOptions[0]?.disabled) {
                cafeTime.value = "";
            }
        }
    }

    function isValidBookingDate(input) {
        if (!input || !input.value) return false;

        const wib = getWIBNow();
        const year = Number(input.value.slice(0, 4));
        const maxYear = Number(wib.date.slice(0, 4)) + 2;

        return (
            /^\d{4}-\d{2}-\d{2}$/.test(input.value) &&
            year <= maxYear &&
            input.value >= wib.date &&
            input.validity.valid
        );
    }

    cafeDate?.addEventListener("change", updateBookingLimits);
    cafeTime?.addEventListener("focus", updateBookingLimits);

    cafeForm?.addEventListener("submit", function (event) {
        updateBookingLimits();

        const wib = getWIBNow();
        const selectedTime = cafeTime?.value || "";
        const selectedMinutes = selectedTime
            ? selectedTime.split(":").map(Number).reduce(
                (hours, minutes) => hours * 60 + minutes
            )
            : -1;

        if (
            !isValidBookingDate(cafeDate) ||
            !selectedTime ||
            (cafeDate.value === wib.date && selectedMinutes <= wib.minutes)
        ) {
            event.preventDefault();
            event.stopImmediatePropagation();
            alert("Please select a valid future reservation date and time (WIB).");
        }
    }, true);

    eventForm?.addEventListener("submit", function (event) {
        updateBookingLimits();

        if (!isValidBookingDate(eventDate)) {
            event.preventDefault();
            event.stopImmediatePropagation();
            alert("Please select a valid event date (WIB).");
        }
    }, true);

    document.addEventListener("visibilitychange", function () {
        if (!document.hidden) updateBookingLimits();
    });

    window.addEventListener("focus", updateBookingLimits);

    updateBookingLimits();
})();

/* =====================================================
   KAIARA GARDEN WEBSITE
   JAVASCRIPT COMPLETE
===================================================== */