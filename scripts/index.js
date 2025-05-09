const burgerElement = document.querySelector('.header__burger');
const containerElement = document.querySelector('.header__container');
const popupElement = document.querySelector('.popup-application');
const formPopupElement = popupElement.querySelector('.form');
const formFeedbackElement = document.querySelector('.form_feedback');
const prevButtonElement = document.querySelector('.about__button--prev');
const nextButtonElement = document.querySelector('.about__button--next');
const dotElements = document.querySelectorAll('.about__dot');
const imgElement = document.querySelector('.about__picture-img');
const selectHeaderElement = document.querySelector('.header__select');
const itemSelectRuElement = document.querySelector('.header__select-item_ru');
const itemSelectEnElement = document.querySelector('.header__select-item_en');
const openReplyElements = document.querySelectorAll('.questions__faq-switch');
const itemElements = document.querySelectorAll('.cards.cards-products .cards__item');
const carouselCompanyElement = document.querySelector('.company__carousel');
const buttonSwitchCompanyElement = document.querySelector('.company__switch-carousel button');
const cardsCompanyElements = document.querySelectorAll('.company__img-carousel'); 
const popupApplicationElement = document.querySelector('.popup-application');
const closeButtonElements = document.querySelectorAll('.form__close');

let currentSlide = 0;
const desktopImages = [
    './assets/about-desktop-image1.webp',
    './assets/about-desktop-image2.webp',
    './assets/about-desktop-image3.webp'
];
const mobileImages = [
    './assets/about-mobile-image1.webp',
    './assets/about-mobile-image2.webp',
    './assets/about-mobile-image3.webp'
];



// Отзывчивость в форме для инпутов

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



// Переключение языка сайта в шапке проекта
selectHeaderElement.addEventListener('click', (evt) => {
  evt.stopPropagation();
  selectHeaderElement.classList.toggle('active');
});

itemSelectEnElement.addEventListener('click', (evt) => {
  // evt.stopPropagation();
  const contentRu = itemSelectRuElement.textContent;
  itemSelectRuElement.textContent = itemSelectEnElement.textContent;
  itemSelectEnElement.textContent = contentRu;
  selectHeaderElement.classList.remove('active');
});

document.addEventListener('click', () => {
  selectHeaderElement.classList.remove('active');
});




// Карусель в секции about 
function updateSlide(index) {
  imgElement.src = desktopImages[index];
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



// Открытие/закрытие бургер-меню
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

document.querySelectorAll('.header__nav-link').forEach(link => {
  link.addEventListener('click', (evt) => {
    containerElement.classList.remove('header__container_active');
    burgerElement.classList.remove('active');
  });
});




// замена изображений на мобильных устройствах
function updateCardImages() {
  const cardImage = document.querySelector('.offset');
  const reviewImage = document.querySelector('.domstroy');
  const footerImage = document.querySelector('.footer__map-img');
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const isMobileFooter = window.matchMedia('(max-width: 376px)').matches;

  if (isMobile) {
    cardImage.src = './assets/portfolio1-mobile.webp';
    reviewImage.src = './assets/reviews-img-luk.webp';
  } else {
    cardImage.src = './assets/portfolio1.webp';
    reviewImage.src = './assets/reviews-carousel-img.webp';
  }

  if (isMobileFooter) {
    footerImage.src = './assets/footer-img-mobile.png';
  } else {
    footerImage.src = './assets/footer-img.webp';
  }
}
document.addEventListener('DOMContentLoaded', updateCardImages);
window.addEventListener('resize', updateCardImages);




// аккардеон в секции Вопрос-Ответ
document.querySelectorAll('.questions__faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.parentElement;
    const switchIcon = question.querySelector('.questions__faq-switch');
    const isOpen = faqItem.classList.contains('active');

    document.querySelectorAll('.questions__faq-item').forEach(item => {
      item.classList.remove('active');
      const itemSwitch = item.querySelector('.questions__faq-switch');
      if (itemSwitch) {
        itemSwitch.classList.remove('questions__faq-switch_minus');
        itemSwitch.classList.add('questions__faq-switch_plus');
      }
    });

    if (!isOpen) {
      faqItem.classList.add('active');
      if (switchIcon) {
        switchIcon.classList.remove('questions__faq-switch_plus');
        switchIcon.classList.add('questions__faq-switch_minus');
      }
    }
  });
});


// Переключение изображений в секции products
itemElements.forEach(item => {
  const leftButton = item.querySelector('.cards__item-button_left');
  const rightButton = item.querySelector('.cards__item-button_right');
  const img = item.querySelector('.cards__item-img');

  leftButton.addEventListener('click', () => {
    img.classList.remove('mirrored');
    leftButton.classList.add('active');
    leftButton.classList.remove('inactive');
    rightButton.classList.add('inactive');
    rightButton.classList.remove('active');
  });

  rightButton.addEventListener('click', () => {
    img.classList.add('mirrored');
    rightButton.classList.add('active');
    rightButton.classList.remove('inactive');
    leftButton.classList.add('inactive');
    leftButton.classList.remove('active');
  });
});



// прокрутка карусели в секции Company
const totalCards = cardsCompanyElements.length;
const cardWidths = Array.from(cardsCompanyElements).map(card => card.offsetWidth + 20);
const totalWidth = cardWidths.reduce((sum, width) => sum + width, 0);

for (let i = 0; i < totalCards * 2; i++) {
  const clone = cardsCompanyElements[i % totalCards].cloneNode(true);
  carouselCompanyElement.appendChild(clone);
}

let translateX = 0;
let isAnimating = false;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;

function updateCarousel() {
  carouselCompanyElement.style.transform = `translateX(${translateX}px)`;
}

function handleInfiniteScroll() {
  while (Math.abs(translateX) >= totalWidth) {
    const firstCard = carouselCompanyElement.firstElementChild;
    carouselCompanyElement.appendChild(firstCard);
    translateX += cardWidths[0];
    carouselCompanyElement.style.transition = 'none';
    updateCarousel();
    cardWidths.push(cardWidths.shift());
  }
  while (translateX > 0) {
    const lastCard = carouselCompanyElement.lastElementChild;
    carouselCompanyElement.insertBefore(lastCard, carouselCompanyElement.firstElementChild);
    translateX -= cardWidths[cardWidths.length - 1];
    carouselCompanyElement.style.transition = 'none';
    updateCarousel();
    cardWidths.unshift(cardWidths.pop());
  }
}

buttonSwitchCompanyElement.addEventListener('click', () => {
  if (isAnimating || isDragging) return;
  isAnimating = true;

  const nextIndex = carouselCompanyElement.children.length % totalCards || 0;
  translateX -= cardWidths[nextIndex];

  carouselCompanyElement.style.transition = 'transform 0.5s ease';
  updateCarousel();

  setTimeout(() => {
    if (Math.abs(translateX) >= totalWidth) {
      const firstCard = carouselCompanyElement.firstElementChild;
      carouselCompanyElement.appendChild(firstCard);
      translateX += cardWidths[0];
      carouselCompanyElement.style.transition = 'none';
      updateCarousel();
      cardWidths.push(cardWidths.shift());
    }
    isAnimating = false;
  }, 500);
});

carouselCompanyElement.addEventListener('mousedown', (e) => {
  if (isAnimating) return;
  isDragging = true;
  startX = e.pageX;
  currentTranslate = translateX;
  carouselCompanyElement.classList.add('dragging');
  e.preventDefault();
});

carouselCompanyElement.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const deltaX = e.pageX - startX;
  translateX = currentTranslate + deltaX;
  carouselCompanyElement.style.transition = 'none';
  updateCarousel();
});

carouselCompanyElement.addEventListener('mouseup', () => {
  if (!isDragging) return;
  isDragging = false;
  carouselCompanyElement.classList.remove('dragging');
  handleInfiniteScroll();
});

carouselCompanyElement.addEventListener('mouseleave', () => {
  if (!isDragging) return;
  isDragging = false;
  carouselCompanyElement.classList.remove('dragging');
  handleInfiniteScroll();
});

carouselCompanyElement.addEventListener('touchstart', (e) => {
  if (isAnimating) return;
  isDragging = true;
  startX = e.touches[0].pageX;
  currentTranslate = translateX;
  carouselCompanyElement.classList.add('dragging');
}, { passive: true });

carouselCompanyElement.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const deltaX = e.touches[0].pageX - startX;
  translateX = currentTranslate + deltaX;
  carouselCompanyElement.style.transition = 'none';
  updateCarousel();
}, { passive: true });

carouselCompanyElement.addEventListener('touchend', () => {
  if (!isDragging) return;
  isDragging = false;
  carouselCompanyElement.classList.remove('dragging');
  handleInfiniteScroll();
}, { passive: true });
updateCarousel();





// Подключение каруселей в секциииях portfolio и reviews

function initCarousel(config) {
  const { containerSelector, itemsSelector, backButtonSelector, forwardButtonSelector, parentContainerSelector, visibleItems } = config;
  const container = document.querySelector(containerSelector);
  const parentContainer = document.querySelector(parentContainerSelector);
  const isReviewsCarousel = containerSelector === '.reviews__carousel';
  let swiper = null;

  if (!container || !parentContainer) return;

  function initSwiper() {
    if (!isReviewsCarousel || window.innerWidth > 768) return;
    
    swiper = new Swiper('.reviews__swiper', {
      slidesPerView: 'auto',
      freeMode: true,
      loop: true,
      loopAdditionalSlides: 4,
      centeredSlidesBounds: true,
      resistanceRatio: 0,
      slideToClickedSlide: true,
      initialSlide: 0,
      slidesOffsetBefore: 20,
      spaceBetween: 104,
      breakpoints: {
        768: {
          spaceBetween: 25
        }, 
        320: {
          spaceBetween: 25
        }
      }
    });

    setTimeout(() => swiper.slideTo(0, 0), 100);
  }

  function initDesktopCarousel() {
    const items = document.querySelectorAll(`${containerSelector} ${itemsSelector}`);
    let currentIndex = 0;
    const itemsPerView = visibleItems || 1;

    function updateCarousel() {
      const itemWidth = items[0]?.offsetWidth || 0;
      const gap = parseFloat(getComputedStyle(container).gap) || 0;
      const parentWidth = parentContainer.offsetWidth;
      const maxIndex = Math.max(0, items.length - itemsPerView);
      
      currentIndex = Math.min(Math.max(currentIndex, 0), maxIndex);
      const translateX = -currentIndex * (itemWidth + gap);
      
      container.style.transform = `translateX(${translateX}px)`;
      
      if (backButtonSelector && forwardButtonSelector) {
        const backButton = document.querySelector(backButtonSelector);
        const forwardButton = document.querySelector(forwardButtonSelector);
        
        backButton.classList.toggle('active', currentIndex > 0);
        forwardButton.classList.toggle('active', currentIndex < maxIndex);
      }
    }

    if (backButtonSelector) {
      document.querySelector(backButtonSelector).addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
        }
      });
    }

    if (forwardButtonSelector) {
      document.querySelector(forwardButtonSelector).addEventListener('click', () => {
        const maxIndex = Math.max(0, items.length - itemsPerView);
        if (currentIndex < maxIndex) {
          currentIndex++;
          updateCarousel();
        }
      });
    }

    updateCarousel();
    window.addEventListener('resize', updateCarousel);
    return () => window.removeEventListener('resize', updateCarousel);
  }

  function handleResize() {
    if (isReviewsCarousel) {
      if (window.innerWidth <= 768 && !swiper) {
        initSwiper();
      } else if (window.innerWidth > 768 && swiper) {
        swiper.destroy();
        swiper = null;
        container.style.transform = 'translateX(0)';
      }
    }
  }

  if (isReviewsCarousel && window.innerWidth <= 768) {
    initSwiper();
  } else {
    const cleanup = initDesktopCarousel();
  }

  window.addEventListener('resize', handleResize);
  return () => {
    if (swiper) swiper.destroy();
    window.removeEventListener('resize', handleResize);
  };
}
document.addEventListener('DOMContentLoaded', () => {
  initCarousel({
    containerSelector: '.cards-portfolio',
    itemsSelector: '.cards__item',
    backButtonSelector: '.portfolio .switch__button.back',
    forwardButtonSelector: '.portfolio .switch__button.forward',
    parentContainerSelector: '.portfolio__container',
    visibleItems: 3
  });

  initCarousel({
    containerSelector: '.reviews__carousel',
    itemsSelector: '.reviews__item-carousel',
    backButtonSelector: '.reviews .switch__button.back',
    forwardButtonSelector: '.reviews .switch__button.forward',
    parentContainerSelector: '.reviews__container',
    visibleItems: 4
  });
});








// Всплывающее окно с логотипом компании при открытии сайта
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.querySelector('.popup-logo');
  const page = document.querySelector('.page');
  const hasSeenPopup = localStorage.getItem('hasSeenPopup');

  if (popup && !hasSeenPopup) {
    popup.classList.add('active');

    setTimeout(() => {
      popup.classList.remove('active');
      if (page) {
        page.classList.add('visible');
      }
      localStorage.setItem('hasSeenPopup', 'true');
    }, 2000);
  } else if (page) {
    page.classList.add('visible');
  }
});




//  Карусель секции partners
document.addEventListener('DOMContentLoaded', function() {
  const partnersSwiper = new Swiper('.partners__box', {
    slidesPerView: 'auto',
    spaceBetween: 104,
    loop: true,
    freeMode: true,
    grabCursor: true,
    initialSlide: 0,

    breakpoints: {
      320: {
        spaceBetween: 25,
        freeMode: false
      },
      768: {
        spaceBetween: 104,
      },
    },
    
    resistance: true,
    resistanceRatio: 0.5,
    on: {
      init: function() {
        this.slideTo(0, 0);
      }
    },
    navigation: false,
    pagination: false,
    scrollbar: false
  });

  window.addEventListener('resize', function() {
    partnersSwiper.update();
  });
});




// Открытие большого изображания в секции reviews
document.addEventListener('DOMContentLoaded', function() {
  Fancybox.bind("[data-fancybox]", {
    Thumbs: false,
    Toolbar: true,
  });
});


// Попап секции products
document.addEventListener('DOMContentLoaded', function() {
  let formData = {};
  Fancybox.bind("[data-fancybox]", {
    dragToClose: false,
    closeButton: false,
    mainClass: "fancybox-custom",
    animated: true,
    animationDuration: 100,
    transitionEffect: "fade",
    height: "auto",
    protect: true,
    on: {
      done: (fancybox, slide) => {
        const trigger = slide.triggerEl;
        if (!trigger) return;

        const productNameEl = document.querySelector('#product-popup .product-name');
        const productInputEl = document.querySelector('#product-popup input[name="product"]');
        const firstInputEl = document.querySelector('#product-popup .form__input');

        if (!productNameEl || !productInputEl || !firstInputEl) {
            return;
        }

        const productName = trigger.dataset.product || '';
        productNameEl.textContent = productName;
        productInputEl.value = productName;

        setTimeout(() => firstInputEl.focus(), 100);
        initFormInputs();
      },
      closing: () => {
        const form = document.querySelector('#product-popup form');
        if (form) {
          form.reset();
        }

        const inputs = document.querySelectorAll('#product-popup .form__input, #product-popup textarea');
        inputs.forEach(input => {
            input.classList.remove('active');
        });

        formData = {};
      }
    }
  });

  const form = document.querySelector('#product-popup form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      form.reset();
      const inputs = document.querySelectorAll('#product-popup .form__input, #product-popup textarea');
      inputs.forEach(input => {
        input.classList.remove('active');
      });
      formData = {};
      const gratitudePopup = document.querySelector('#gratitude-popup');
      if (gratitudePopup) {
        try {
          Fancybox.close();
          setTimeout(() => {
            Fancybox.show([{ src: "#gratitude-popup", type: "inline" }], {
              dragToClose: false,
              closeButton: false,
              mainClass: "fancybox-custom",
              animated: true,
              animationDuration: 100,
              transitionEffect: "fade",
              height: "auto",
              protect: true,
              hideOnClose: false,
              on: {
                init: (fancybox, slide) => {
                  gratitudePopup.classList.add('active');
                }
              }
            });
          }, 200);
        } catch (error) {
          console.error(error);
        }
      }
    });
  }

  const initFormInputs = () => {
    const inputs = document.querySelectorAll('.form__input, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.classList.add('active');
        this.removeAttribute('readonly');
        this.style.caretColor = '';
      });

      input.addEventListener('blur', function() {
        if (!this.value) {
          this.classList.remove('active');
        }
      });
      if (input.value) {
        input.classList.add('active');
      }
    });
  };
});


// Попап отправки заявки 
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.popup').forEach(popup => {
    popup.style.display = 'none';
    popup.classList.remove('active');
  });

  const clearForm = (formSelector, inputSelector) => {
    const form = document.querySelector(formSelector);
    if (form) {
      form.reset();
      const inputs = document.querySelectorAll(inputSelector);
      inputs.forEach(input => {
        input.classList.remove('active');
      });
    }
  };

  Fancybox.bind("[data-src='#application-popup']", {
    dragToClose: false,
    closeButton: false,
    mainClass: "fancybox-custom",
    animated: true,
    animationDuration: 100,
    transitionEffect: "fade",
    height: "auto",
    protect: true,
    hideOnClose: false,
    on: {
      done: (fancybox, slide) => {
        const firstInputEl = document.querySelector('#application-popup .form__input');
        if (firstInputEl) {
          setTimeout(() => firstInputEl.focus(), 100);
        }
      },
      closing: () => {
          clearForm('#application-popup form', '#application-popup .form__input, #application-popup textarea');
      }
    }
  });

  Fancybox.bind("[data-src='#gratitude-popup']", {
    dragToClose: false,
    closeButton: false,
    mainClass: "fancybox-custom",
    animated: true,
    animationDuration: 100,
    transitionEffect: "fade",
    height: "auto",
    protect: true,
    hideOnClose: false,
  });

  const applicationForm = document.querySelector('#application-popup form');
  if (applicationForm) {
    applicationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const gratitudePopup = document.querySelector('#gratitude-popup');
      if (gratitudePopup) {
          try {
            Fancybox.close();
            setTimeout(() => {
              Fancybox.show([{ src: "#gratitude-popup", type: "inline" }], {
                dragToClose: false,
                closeButton: false,
                mainClass: "fancybox-custom",
                animated: true,
                animationDuration: 100,
                transitionEffect: "fade"
              });
            }, 200);
          } catch (error) {
            console.error(error);
          }
      }
      const inputs = document.querySelectorAll('#application-popup .form__input, #application-popup textarea');
        inputs.forEach(input => {
          input.classList.remove('active');
        });
      clearForm('#application-popup form', '#application-popup .form__input, #application-popup textarea');
    });
  }

  const formFeedback = document.querySelector('.form_feedback');
  if (formFeedback) {
    formFeedback.addEventListener('submit', function(e) {
      e.preventDefault();
      const gratitudePopup = document.querySelector('#gratitude-popup');
      if (gratitudePopup) {
        try {
          Fancybox.close();
          setTimeout(() => {
            Fancybox.show([{ src: "#gratitude-popup", type: "inline" }], {
              dragToClose: false,
              closeButton: false,
              mainClass: "fancybox-custom",
              animated: true,
              animationDuration: 100,
              transitionEffect: "fade"
            });
          }, 200);
        } catch (error) {
          console.error(error);
        }
      }
      clearForm('.form_feedback', '.form_feedback .form__input, .form_feedback textarea');
    });
  }

  const gratitudeBtn = document.querySelector('.popup-gratitude__button');
  if (gratitudeBtn) {
    gratitudeBtn.addEventListener('click', () => {
      Fancybox.close();
      history.replaceState(null, '', window.location.pathname);
    });
  }

  const gratitudePopup = document.querySelector('#gratitude-popup');
  if (gratitudePopup) {
    gratitudePopup.addEventListener('click', (e) => {
      if (e.target === gratitudePopup) {
        Fancybox.close();
        history.replaceState(null, '', window.location.pathname);
      }
    });
  }


  const initFormInputs = () => {
    const forms = [
      { formSelector: '#application-popup form', inputSelector: '#application-popup .form__input, #application-popup textarea' },
      { formSelector: '.form_feedback', inputSelector: '.form_feedback .form__input, .form_feedback textarea' }
    ];

    forms.forEach(({ formSelector, inputSelector }) => {
      const inputs = document.querySelectorAll(inputSelector);
      inputs.forEach(input => {
        input.removeEventListener('focus', handleFocus);
        input.removeEventListener('blur', handleBlur);
        input.addEventListener('focus', handleFocus);
        input.addEventListener('blur', handleBlur);

        if (input.value) {
          input.classList.add('active');
        } else {
          input.classList.remove('active');
        }
      });
    });
  };

  function handleFocus() {
    const form = this.closest('form');
    if (form) {
      const inputs = form.querySelectorAll('.form__input, .form__textarea');
      inputs.forEach(input => {
        if (input !== this) {
          input.classList.remove('active');
        }
      });
    }
    this.classList.add('active');
    this.removeAttribute('readonly');
    this.style.caretColor = '';
  }

  function handleBlur() {
    if (!this.value) {
      this.classList.remove('active');
    }
  }

  initFormInputs();

  document.addEventListener('keydown', ({ key }) => {
    if (key === 'Escape') {
      clearForm('#application-popup form', '#application-popup .form__input, #application-popup textarea');
      clearForm('.form_feedback', '.form_feedback .form__input, .form_feedback textarea');
      Fancybox.close();
      history.replaceState(null, '', window.location.pathname);
    }
  });
});