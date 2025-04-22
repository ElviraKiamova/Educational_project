const burgerElement = document.querySelector('.header__burger');
const containerElement = document.querySelector('.header__container');
const popupElement = document.querySelector('.popup-application');
const formPopupElement = popupElement.querySelector('.form');
const formFeedbackElement = document.querySelector('.form_feedback');
const closePopupButtonElement = formPopupElement.querySelector('.form__close');
const prevButtonElement = document.querySelector('.about__button--prev');
const nextButtonElement = document.querySelector('.about__button--next');
const dotElements = document.querySelectorAll('.about__dot');
const imgElement = document.querySelector('.about__picture img');
const sourceElement = document.querySelector('.about__picture source');
const selectHeaderElement = document.querySelector('.header__select');
const itemSelectRuElement = document.querySelector('.header__select-item_ru');
const itemSelectEnElement = document.querySelector('.header__select-item_en');
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

function toggleActive(form) {
  form.querySelectorAll('.form__input, .form__textarea').forEach(element => {
    element.addEventListener('click', function(evt) {
      evt.preventDefault();
      this.classList.toggle('active');
    });
  });
}

toggleActive(formPopupElement);
toggleActive(formFeedbackElement);


selectHeaderElement.addEventListener('click', (evt) => {
  evt.stopPropagation();
  selectHeaderElement.classList.toggle('active');
});

itemSelectEnElement.addEventListener('click', (evt) => {
  evt.stopPropagation();
  const contentRu = itemSelectRuElement.textContent;
  itemSelectRuElement.textContent = itemSelectEnElement.textContent;
  itemSelectEnElement.textContent = contentRu;
  selectHeaderElement.classList.remove('active');
});

document.addEventListener('click', () => {
  selectHeaderElement.classList.remove('active');
});


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
    document.body.classList.add('no-scroll');
  } 
});

console.log(closePopupButtonElement);
closePopupButtonElement.addEventListener('click', (evt) => {
  console.log(evt.target);
  popupElement.style.display = 'none';
  document.body.classList.remove('no-scroll');
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    popupElement.style.display = 'none';
    document.body.classList.remove('no-scroll');
  }
});