const burgerElement = document.querySelector('.header__burger');
const containerElement = document.querySelector('.header__container');
const popup = document.querySelector('.popup-application');
const popupElement = document.querySelector('.popup-application');
const closePopupButtonElement = document.querySelector('.popup-application__close');
const prevButtonElement = document.querySelector('.about__button--prev');
const nextButtonElement = document.querySelector('.about__button--next');
const dotElements = document.querySelectorAll('.about__dot');
const imgElement = document.querySelector('.about__picture img');
const sourceElement = document.querySelector('.about__picture source');
let currentSlide = 0;
const desktopImages = [
    './assets/about-desktop-image1.jpg',
    './assets/about-desktop-image2.jpg',
    './assets/about-desktop-image3.jpg'
];
const mobileImages = [
    './assets/about-mobile-image1.jpg',
    './assets/about-mobile-image2.jpg',
    './assets/about-mobile-image3.jpg'
];



function updateSlide(index) {
    imgElement.src = desktopImages[index];
    sourceElement.srcset = mobileImages[index];
    dotElements.forEach(dot => dot.classList.remove('about__dot_active'));
    dotElements[index].classList.add('about__dot_active');
    currentSlide = index;
}

prevButtonElement.addEventListener('click', () => {
    let newIndex = currentSlide - 1;
    if (newIndex < 0) newIndex = desktopImages.length - 1;
    updateSlide(newIndex);
});

nextButtonElement.addEventListener('click', () => {
    let newIndex = currentSlide + 1;
    if (newIndex >= desktopImages.length) newIndex = 0;
    updateSlide(newIndex);
});

dotElements.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        updateSlide(index);
    });
});





burgerElement.addEventListener('click', () => {
  containerElement.classList.toggle('header__container_active');
  burgerElement.classList.toggle('active');
});

document.addEventListener('click', (evt) => {
  if (!containerElement.contains(evt.target) && !burgerElement.contains(evt.target)) {
    containerElement.classList.remove('header__container_active');
    burgerElement.classList.remove('active');
  }
});

document.addEventListener('click', (evt) => {
  if (evt.target.closest('.header__button') || evt.target.closest('.about__button') || evt.target.closest('.services__button')) {
    popupElement.style.display = 'flex';
  } 
});

closePopupButtonElement.addEventListener('click', () => {
    popupElement.style.display = 'none';
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    popupElement.style.display = 'none';
  }
});