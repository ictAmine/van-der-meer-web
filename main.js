document.addEventListener("DOMContentLoaded", function() {
    // 1. INYECCIÓN DEL LIGHTBOX
    if (!document.getElementById("pro-lightbox")) {
        const lightboxHTML = `
            <div id="pro-lightbox">
                <span class="lightbox-close">&times;</span>
                <span class="lightbox-counter">1 / 1</span>
                <button class="lightbox-arrow lightbox-prev">&#10094;</button>
                <img id="lightbox-img" src="" alt="Zoom preview">
                <button class="lightbox-arrow lightbox-next">&#10095;</button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    }

    // 2. LÓGICA DEL LIGHTBOX
    const lightbox = document.getElementById("pro-lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox-close");
    const prevBtn = document.querySelector(".lightbox-prev");
    const nextBtn = document.querySelector(".lightbox-next");
    const counter = document.querySelector(".lightbox-counter");

    const images = Array.from(document.querySelectorAll(".masonry-grid img, .project-img-grid img, .project-case-study img, .blueprint-section img, img.zoomable"));
    let currentIndex = 0;

    function showImage(index) {
        if (images.length === 0) return;
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        currentIndex = index;
        lightboxImg.src = images[currentIndex].src;
        counter.innerText = `${currentIndex + 1} / ${images.length}`;
    }

    images.forEach((img, index) => {
        if (!img.classList.contains("zoomable")) img.classList.add("zoomable");
        img.addEventListener("click", function() {
            lightbox.classList.add("active");
            showImage(index);
        });
    });

    function closeLightbox() {
        lightbox.classList.remove("active");
    }

    if(closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if(prevBtn) prevBtn.addEventListener("click", (e) => { e.stopPropagation(); showImage(currentIndex - 1); });
    if(nextBtn) nextBtn.addEventListener("click", (e) => { e.stopPropagation(); showImage(currentIndex + 1); });

    if(lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // 3. GESTOS TÁCTILES (SWIPE)
        let touchStartX = 0;
        let touchEndX = 0;

        lightbox.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const threshold = 50;
            if (touchStartX - touchEndX > threshold) showImage(currentIndex + 1);
            if (touchEndX - touchStartX > threshold) showImage(currentIndex - 1);
        }
    }

    document.addEventListener("keydown", (e) => {
        if (lightbox && !lightbox.classList.contains("active")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") showImage(currentIndex - 1);
        if (e.key === "ArrowRight") showImage(currentIndex + 1);
    });

    // 4. ANIMACIONES SCROLL REVEAL
    if ('IntersectionObserver' in window) {
        const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-up, .service-card, .review-card, .timeline-step').forEach(el => {
            observer.observe(el);
        });
    }

    // 5. LÓGICA DEL MENÚ HAMBURGUESA
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.center-nav');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.center-nav a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

/* Header compacto al hacer scroll (móvil) */
(function () {
    const header = document.querySelector('.header');
    if (!header) return;
    let ticking = false;
    const onScroll = () => {
        if (window.scrollY > 30) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
        ticking = false;
    };
    window.addEventListener('scroll', () => {
        if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
    }, { passive: true });
    onScroll();
})();
