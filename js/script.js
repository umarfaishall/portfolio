function initServiceSliders() {
    const sliders = document.querySelectorAll('.service-slider');

    sliders.forEach(slider => {
        const container = slider.querySelector('.service-slider-container');
        let items = Array.from(slider.querySelectorAll('.service-item'));
        const originalItems = [...items];
        const visibleItems = 4; // Number of items visible at once
        const itemWidth = container.offsetWidth / visibleItems;

        // Clone items for infinite loop
        for (let i = 0; i < visibleItems; i++) {
            const cloneStart = originalItems[i].cloneNode(true);
            cloneStart.classList.add('clone');
            const cloneEnd = originalItems[originalItems.length - 1 - i].cloneNode(true);
            cloneEnd.classList.add('clone');
            container.appendChild(cloneStart);
            container.insertBefore(cloneEnd, container.firstChild);
        }

        items = Array.from(container.querySelectorAll('.service-item'));
        const totalItems = items.length;
        let currentIndex = visibleItems; // Start at the first original item
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let dragStartTime = 0;

        container.style.cursor = 'grab';
        container.style.transition = 'transform 0.3s ease-out';

        function updateSlider() {
            const translateX = -currentIndex * itemWidth;
            container.style.transform = `translate3d(${translateX}px, 0, 0)`;
            currentTranslate = translateX;
            prevTranslate = translateX;
        }

        function setPositionByIndex() {
            currentTranslate = -currentIndex * itemWidth;
            prevTranslate = currentTranslate;
            container.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
        }

        function repositionSlider() {
            container.style.transition = 'none';
            if (currentIndex >= totalItems - visibleItems) {
                currentIndex = visibleItems;
            } else if (currentIndex <= visibleItems - 1) {
                currentIndex = totalItems - visibleItems - 1;
            }
            setPositionByIndex();
            setTimeout(() => {
                container.style.transition = 'transform 0.3s ease-out';
            }, 10);
        }

        function touchStart(event) {
            isDragging = true;
            startX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
            dragStartTime = Date.now();
            container.style.cursor = 'grabbing';
            container.style.transition = 'none';
            container.style.willChange = 'transform';
        }

        function touchMove(event) {
            if (!isDragging) return;
            const currentX = event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
            const deltaX = currentX - startX;
            currentTranslate = prevTranslate + deltaX;
            container.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
            if (event.type === 'touchmove') {
                event.preventDefault();
            }
        }

        function touchEnd() {
            if (!isDragging) return;
            isDragging = false;
            container.style.cursor = 'grab';
            container.style.transition = 'transform 0.3s ease-out';
            container.style.willChange = 'auto';
            const movedBy = currentTranslate - prevTranslate;
            const dragDuration = Date.now() - dragStartTime;
            const velocity = Math.abs(movedBy) / dragDuration;

            if (velocity > 0.5 || Math.abs(movedBy) > itemWidth / 2) {
                if (movedBy < -itemWidth / 2) {
                    currentIndex++;
                } else if (movedBy > itemWidth / 2) {
                    currentIndex--;
                }
            }

            // Check if need to reposition for infinite loop
            if (currentIndex >= totalItems - visibleItems || currentIndex <= visibleItems - 1) {
                setTimeout(repositionSlider, 300); // After transition
            }

            setPositionByIndex();
        }

        container.addEventListener('mousedown', touchStart);
        container.addEventListener('touchstart', touchStart);
        container.addEventListener('mousemove', touchMove);
        container.addEventListener('touchmove', touchMove);
        container.addEventListener('mouseup', touchEnd);
        container.addEventListener('touchend', touchEnd);
        container.addEventListener('mouseleave', touchEnd);

        // Button event listeners
        const prevBtn = slider.querySelector('.slider-prev');
        const nextBtn = slider.querySelector('.slider-next');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex--;
                setPositionByIndex();
                if (currentIndex <= visibleItems - 1) {
                    setTimeout(repositionSlider, 300);
                }
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex++;
                setPositionByIndex();
                if (currentIndex >= totalItems - visibleItems) {
                    setTimeout(repositionSlider, 300);
                }
            });
        }

        updateSlider();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const navTogler = document.querySelector('.aside .nav-togler');
    const aside = document.querySelector('.aside');
    const mainContent = document.querySelector('.main-content');

    if (navTogler && aside && mainContent) {
        navTogler.addEventListener('click', function () {
            aside.classList.toggle('open');
            if (aside.classList.contains('open')) {
                mainContent.style.paddingLeft = aside.offsetWidth + 'px';
            } else {
                mainContent.style.paddingLeft = '0';
            }
        });
    }

    // Initialize service sliders on DOMContentLoaded
    initServiceSliders();
});

window.initServiceSliders = initServiceSliders;


// typing animation
var typed = new Typed(".typing",{
    strings:["QA Manual", "QA Engineer", "QA Analyst", "QA Tester"],
    typeSpeed:100,
    BackSpeed:60,
    loop:true
})

// Smooth scrolling for all anchor links to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
