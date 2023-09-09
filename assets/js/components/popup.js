export function popup(data) {
    const popup = document.querySelector('.popup');
    const popupCloseButton = document.querySelector('.popup__close-button');

    let scrollPosition = 0
        
    function blockScroll() {
        scrollPosition = window.pageYOffset
        const mainPage = document.querySelector('.page-container')
        mainPage.style.top = `-${scrollPosition}px`
        document.documentElement.classList.add('overlay-scroll-block')
    }
    
    function unblockScroll() {
        document.documentElement.classList.remove('overlay-scroll-block')
        window.scrollTo({
            left: 0,
            top: scrollPosition,
            behavior: 'instant'
        })
        const mainPage = document.querySelector('.page-container')
        mainPage.style.top = ""
    }

    popup.classList.add('popup_opened');
    blockScroll();
    popupCloseButton.addEventListener('click', () => {
        popup.classList.remove('popup_opened');
        unblockScroll();
    })

    popup.addEventListener('click', (e) => {
        if (!e.target.classList.contains('popup__container')) {
            popup.classList.remove('popup_opened');
            unblockScroll();
        }
    });
}