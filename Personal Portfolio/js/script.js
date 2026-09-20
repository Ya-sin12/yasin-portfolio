/* ===================================
   Sticky Header
=================================== */

const header = document.querySelector("#header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("sticky");

    } else {

        header.classList.remove("sticky");

    }

});

/* ===================================
   Active Navigation
=================================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        if (pageYOffset >= sectionTop) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {

            link.classList.add("active");

        }

    });

});
/* ===================================
   Smooth Scroll
=================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth"

            });

        }

    });

});

/* ===================================
   Mobile Menu Auto Close
=================================== */

const mobileLinks = document.querySelectorAll("#mobileMenu .nav-link");

mobileLinks.forEach(link => {

    link.addEventListener("click", () => {

        const offcanvasElement = document.getElementById("mobileMenu");

        const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);

        if (offcanvas) {

            offcanvas.hide();

        }

    });

});

/* ===================================
   Back To Top
=================================== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

// ================================
// EmailJS Contact Form
// ================================

// Initialize EmailJS
emailjs.init("xZ9M7egFEMBffv4nl");

// Select Form
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const submitBtn = contactForm.querySelector("button");

    submitBtn.innerHTML = "Sending...";
    submitBtn.disabled = true;

    emailjs.sendForm(
        "service_1ok3lxh",
        "template_mich42i",
        this
    )
    .then(() => {

        alert("✅ Message Sent Successfully!");

        contactForm.reset();

    })
    .catch((error) => {

        alert("❌ Failed to send message.");

        console.log(error);

    })
    .finally(() => {

        submitBtn.innerHTML = "Send Message";

        submitBtn.disabled = false;

    });

});


/* ===================================
   Portfolio Auto Slider
=================================== */

const portfolioSlider = document.querySelector(".portfolio-slider");
const portfolioSlides = portfolioSlider?.querySelectorAll(":scope > div");

let portfolioIndex = 0;

if (portfolioSlider && portfolioSlides.length > 1) {

    setInterval(() => {

        portfolioIndex++;

        if (portfolioIndex >= portfolioSlides.length) {
            portfolioIndex = 0;
        }

        portfolioSlider.scrollTo({
            left: portfolioSlider.clientWidth * portfolioIndex,
            behavior: "smooth"
        });

    }, 3000);

}

/* ===================================
   Portfolio Slider Navigation Dots
=================================== */

const portfolioDots = document.querySelectorAll(".portfolio-dot");

portfolioDots.forEach((dot) => {

    dot.addEventListener("click", () => {

        portfolioIndex = Number(dot.dataset.slide);

        portfolioSlider.scrollTo({
            left: portfolioSlider.clientWidth * portfolioIndex,
            behavior: "smooth"
        });

        portfolioDots.forEach((item) => {
            item.classList.remove("active");
        });

        dot.classList.add("active");

    });

});


/* ===================================
   Auto Update Portfolio Dots
=================================== */

portfolioSlider.addEventListener("scroll", () => {

    const currentSlide = Math.round(
        portfolioSlider.scrollLeft / portfolioSlider.clientWidth
    );

    portfolioDots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
    });

});

/* ===================================
   Portfolio Slider Arrows
=================================== */

const portfolioPrev = document.querySelector(".portfolio-prev");
const portfolioNext = document.querySelector(".portfolio-next");

portfolioPrev.addEventListener("click", () => {

    portfolioIndex--;

    if (portfolioIndex < 0) {
        portfolioIndex = portfolioSlides.length - 1;
    }

    portfolioSlider.scrollTo({
        left: portfolioSlider.clientWidth * portfolioIndex,
        behavior: "smooth"
    });

});

portfolioNext.addEventListener("click", () => {

    portfolioIndex++;

    if (portfolioIndex >= portfolioSlides.length) {
        portfolioIndex = 0;
    }

    portfolioSlider.scrollTo({
        left: portfolioSlider.clientWidth * portfolioIndex,
        behavior: "smooth"
    });

});