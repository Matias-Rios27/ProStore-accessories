document.addEventListener('DOMContentLoaded', function () {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const carousel = document.querySelector('#carouselProductos .carousel'); 
    const items = carousel.children; 
    const itemsToScroll = 1; 
    const itemWidth = 270; 
    const maxVisibleItems = 5;
    let scrollAmount = 0;

    function estadoBotones() {
        if (scrollAmount === 0) {
            prevButton.disabled = true; 
        } else {
            prevButton.disabled = false;
        }

        if (scrollAmount >= items.length - itemsToScroll) {
            nextButton.disabled = true; 
        } else {
            nextButton.disabled = false;
        }
    }

    prevButton.addEventListener('click', () => {
        if (scrollAmount > 0) {
            scrollAmount -= itemsToScroll;
            carousel.style.transform = `translateX(-${scrollAmount * itemWidth}px)`;
        }
        estadoBotones(); 
    });

    const autoMove = setInterval(() => {
        if (items.length >= maxVisibleItems) {
            if (scrollAmount < items.length - maxVisibleItems) {
                scrollAmount += itemsToScroll;
                carousel.style.transform = `translateX(-${scrollAmount * itemWidth}px)`;
            } else {
                scrollAmount = 0;
                carousel.style.transform = `translateX(0px)`;
            }
        } else {
            scrollAmount = 0;
            carousel.style.transform = `translateX(0px)`;
        }
        estadoBotones(); 
    }, 3000); 
    estadoBotones();
});
