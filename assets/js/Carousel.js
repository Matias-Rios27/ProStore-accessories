document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM completamente cargado');

    document.querySelectorAll('.carousel-container').forEach(container => {
        const prevButton = container.querySelector('.prev');
        const nextButton = container.querySelector('.next');
        const carousel = container.querySelector('.carousel');  
        if (!carousel || !prevButton || !nextButton) {
            return;
        }
        const items = carousel.children;
        const itemsToScroll = 1;
        const itemWidth = 270;
        const maxVisibleItems = 5;
        let scrollAmount = 0;

        function estadoBotones() {
            prevButton.disabled = scrollAmount === 0;
            nextButton.disabled = scrollAmount >= items.length - maxVisibleItems;
        }

        prevButton.addEventListener('click', () => {
            if (scrollAmount > 0) {
                scrollAmount -= itemsToScroll;
                carousel.style.transform = `translateX(-${scrollAmount * itemWidth}px)`;
            }
            estadoBotones();
        });

        nextButton.addEventListener('click', () => {
            if (scrollAmount < items.length - maxVisibleItems) {
                scrollAmount += itemsToScroll;
                carousel.style.transform = `translateX(-${scrollAmount * itemWidth}px)`;
            }
            estadoBotones();
        });

        const autoMove = setInterval(() => {
            if (items.length >= maxVisibleItems) {
                if (scrollAmount < items.length - maxVisibleItems) {
                    scrollAmount += itemsToScroll;
                } else {
                    scrollAmount = 0;
                }
                carousel.style.transform = `translateX(-${scrollAmount * itemWidth}px)`;
            }
            estadoBotones();
        }, 3000);

        estadoBotones();
    });
});
