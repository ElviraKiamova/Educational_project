const burgerElement = document.querySelector('.header__burger');
const containerElement = document.querySelector('.header__container');
const popup = document.querySelector('.popup-application');
const popupElement = document.querySelector('.popup-application');
const closePopupButtonElement = document.querySelector('.popup-application__close');

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