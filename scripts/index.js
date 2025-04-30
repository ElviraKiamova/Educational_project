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
const popupModelElement = document.querySelector('.popup-model');
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
  // evt.stopPropagation();
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








// подключение каруселей в секцииях portfolio и reviews

function initCarousel({
  containerSelector,
  itemsSelector,
  backButtonSelector,
  forwardButtonSelector,
  parentContainerSelector,
  visibleItems
}) {
  const container = document.querySelector(containerSelector);
  const backButton = document.querySelector(backButtonSelector);
  const forwardButton = document.querySelector(forwardButtonSelector);
  const parentContainer = document.querySelector(parentContainerSelector);

  if (!container || !parentContainer) {
    console.error('Carousel initialization failed: missing elements', {
      container, parentContainer
    });
    return;
  }

  const effectiveItemsSelector = containerSelector + ' ' + itemsSelector;
  let items = document.querySelectorAll(effectiveItemsSelector);
  let totalItems = items.length;
  let currentIndex = 0;
  const itemsPerView = visibleItems || 1;

  let touchStartX = 0;
  let touchCurrentX = 0;
  let isDragging = false;
  let currentTranslateX = 0;

  function getDimensions() {
    const itemWidth = items[0]?.offsetWidth || 0;
    const computedStyle = getComputedStyle(container);
    const gap = parseFloat(computedStyle.gap) || 0;
    const parentComputedStyle = getComputedStyle(parentContainer);
    const parentPaddingLeft = parseFloat(parentComputedStyle.paddingLeft) || 0;
    const parentPaddingRight = parseFloat(parentComputedStyle.paddingRight) || 0;
    const parentWidthRaw = parentContainer.getBoundingClientRect().width;
    const parentWidth = parentWidthRaw - parentPaddingLeft - parentPaddingRight;
    const itemComputedStyle = items[0] ? getComputedStyle(items[0]) : {};
    const itemMarginLeft = parseFloat(itemComputedStyle.marginLeft) || 0;
    const itemMarginRight = parseFloat(itemComputedStyle.marginRight) || 0;
    const calculatedWidth = (totalItems * (itemWidth + itemMarginLeft + itemMarginRight)) + ((totalItems - 1) * gap);
    return {
      itemWidth,
      gap,
      parentWidth,
      parentWidthRaw,
      parentPaddingLeft,
      parentPaddingRight,
      itemMarginLeft,
      itemMarginRight,
      calculatedWidth,
      itemsPerView
    };
  }

  function updateCarousel(activeButton = null) {
    items = document.querySelectorAll(effectiveItemsSelector);
    const newTotalItems = items.length;

    if (newTotalItems === 0 && totalItems > 0) {
      console.warn('Items temporarily unavailable, preserving last state', { containerSelector, totalItems });
      return;
    }
    totalItems = newTotalItems;

    if (totalItems === 0) {
      console.warn('No items in carousel, resetting to initial state', { containerSelector });
      currentIndex = 0;
      container.style.transform = `translateX(0px)`;
      if (backButton) backButton.disabled = true;
      if (forwardButton) forwardButton.disabled = true;
      return;
    }

    const {
      itemWidth,
      gap,
      parentWidth,
      parentPaddingLeft,
      itemMarginLeft,
      itemMarginRight,
      calculatedWidth,
      itemsPerView
    } = getDimensions();
    const totalContentWidth = calculatedWidth;
    let translateX;

    const naturalMaxIndex = Math.max(0, totalItems - itemsPerView);
    const maxIndex = containerSelector === '.cards-portfolio' ? Math.min(naturalMaxIndex, itemsPerView - 1) : naturalMaxIndex;
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    if (currentIndex < 0) currentIndex = 0;

    const step = itemWidth + gap + itemMarginLeft + itemMarginRight;
    let baseTranslateX = -(currentIndex * step);
    const remainingItems = totalItems - (currentIndex + 1);
    const isLastCard = currentIndex >= totalItems - 1;
    const shouldAlignRight = remainingItems < itemsPerView || isLastCard;

    if (shouldAlignRight) {
      translateX = -(totalContentWidth - parentWidth);
      translateX += parentPaddingLeft;
    } else {
      translateX = baseTranslateX;
    }

    if (translateX > 0) translateX = 0;
    if (Math.abs(translateX) > totalContentWidth) translateX = -totalContentWidth;

    currentTranslateX = translateX;
    container.style.transform = `translateX(${translateX}px)`;

    if (backButton) backButton.disabled = currentIndex === 0;
    if (forwardButton) forwardButton.disabled = totalItems <= itemsPerView || currentIndex >= maxIndex;

    if (backButton && forwardButton) {
      backButton.classList.remove('active');
      forwardButton.classList.remove('active');
      if (activeButton === 'back' && !backButton.disabled) {
        backButton.classList.add('active');
      } else if (activeButton === 'forward' && !forwardButton.disabled) {
        forwardButton.classList.add('active');
      } else {
        if (!backButton.disabled) backButton.classList.add('active');
        else if (!forwardButton.disabled) forwardButton.classList.add('active');
      }
    }
  }

  if (backButton) {
    backButton.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel('back');
      }
    });
  }

  if (forwardButton) {
    forwardButton.addEventListener('click', () => {
      items = document.querySelectorAll(effectiveItemsSelector);
      totalItems = items.length;
      const naturalMaxIndex = Math.max(0, totalItems - itemsPerView);
      const maxIndex = containerSelector === '.cards-portfolio' ? Math.min(naturalMaxIndex, itemsPerView - 1) : naturalMaxIndex;
      if (currentIndex < maxIndex && totalItems > 0) {
        currentIndex++;
        updateCarousel('forward');
      }
    });
  }

  const isReviewsCarousel = containerSelector === '.reviews__carousel';
  let touchListenersAdded = false;

  function addTouchListeners() {
    if (touchListenersAdded) return;
    container.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      isDragging = true;
      container.style.transition = 'none';
    });

    container.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      touchCurrentX = e.touches[0].clientX;
      const deltaX = touchCurrentX - touchStartX;
      const { itemWidth, gap, itemMarginLeft, itemMarginRight } = getDimensions();
      const step = itemWidth + gap + itemMarginLeft + itemMarginRight;
      const currentTranslateX = -(currentIndex * step);
      container.style.transform = `translateX(${currentTranslateX + deltaX}px)`;
    });

    container.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;
      container.style.transition = 'transform 0.3s ease';
      const deltaX = touchCurrentX - touchStartX;
      const { itemWidth } = getDimensions();
      const threshold = itemWidth * 0.3;

      if (deltaX > threshold && currentIndex > 0) {
        currentIndex--;
      } else if (deltaX < -threshold && currentIndex < Math.max(0, totalItems - itemsPerView)) {
        currentIndex++;
      }
      updateCarousel();
    });
    touchListenersAdded = true;
  }

  function removeTouchListeners() {
    if (!touchListenersAdded) return;
    container.removeEventListener('touchstart', () => {});
    container.removeEventListener('touchmove', () => {});
    container.removeEventListener('touchend', () => {});
    touchListenersAdded = false;
  }

  function checkMobileAndSwipe() {
    const isMobile = window.innerWidth <= 768;
    if (isReviewsCarousel && isMobile) {
      addTouchListeners();
    } else {
      removeTouchListeners();
    }
  }

  checkMobileAndSwipe();

  window.addEventListener('resize', () => {
    items = document.querySelectorAll(effectiveItemsSelector);
    const newTotalItems = items.length;
    if (newTotalItems !== totalItems) {
      totalItems = newTotalItems;
      const naturalMaxIndex = Math.max(0, totalItems - itemsPerView);
      const maxIndex = containerSelector === '.cards-portfolio' ? Math.min(naturalMaxIndex, itemsPerView - 1) : naturalMaxIndex;
      currentIndex = Math.min(currentIndex, Math.max(0, maxIndex));
    }
    checkMobileAndSwipe();
    updateCarousel();
  });

  window.addEventListener('load', () => {
    items = document.querySelectorAll(effectiveItemsSelector);
    const newTotalItems = items.length;
    if (newTotalItems !== totalItems) {
      totalItems = newTotalItems;
      const naturalMaxIndex = Math.max(0, totalItems - itemsPerView);
      const maxIndex = containerSelector === '.cards-portfolio' ? Math.min(naturalMaxIndex, itemsPerView - 1) : naturalMaxIndex;
      currentIndex = Math.min(currentIndex, Math.max(0, maxIndex));
    }
    checkMobileAndSwipe();
    updateCarousel();
  });

  const observer = new MutationObserver((mutations) => {
    let itemsChanged = false;
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        const newItems = document.querySelectorAll(effectiveItemsSelector);
        if (newItems.length !== totalItems) {
          itemsChanged = true;
          items = newItems;
          totalItems = items.length;
          const naturalMaxIndex = Math.max(0, totalItems - itemsPerView);
          const maxIndex = containerSelector === '.cards-portfolio' ? Math.min(naturalMaxIndex, itemsPerView - 1) : naturalMaxIndex;
          currentIndex = Math.min(currentIndex, Math.max(0, maxIndex));
        }
      }
    });
    if (itemsChanged) {
      updateCarousel();
    }
  });

  observer.observe(container, {
    childList: true,
    subtree: true
  });

  updateCarousel();

  return () => {
    observer.disconnect();
    if (backButton) backButton.removeEventListener('click', updateCarousel);
    if (forwardButton) forwardButton.removeEventListener('click', updateCarousel);
    window.removeEventListener('resize', updateCarousel);
    window.removeEventListener('load', updateCarousel);
    removeTouchListeners();
  };
}

const cleanupPortfolio = initCarousel({
  containerSelector: '.cards-portfolio',
  itemsSelector: '.cards__item',
  backButtonSelector: '.portfolio .switch__button.back',
  forwardButtonSelector: '.portfolio .switch__button.forward',
  parentContainerSelector: '.portfolio__container',
  visibleItems: 3
});

const cleanupReviews = initCarousel({
  containerSelector: '.reviews__carousel',
  itemsSelector: '.reviews__item-carousel',
  backButtonSelector: '.reviews .switch__button.back',
  forwardButtonSelector: '.reviews .switch__button.forward',
  parentContainerSelector: '.reviews__container',
  visibleItems: 4
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




// Открытие попапов форм заявок
  
const popups = {
  application: document.querySelector('.popup-application'),
  model: document.querySelector('.popup-model'),
  gratitude: document.querySelector('.popup-gratitude')
};

function togglePageScroll(enable) {
  const html = document.documentElement;
  const savedScrollBehavior = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  
  if (enable) {
    document.body.classList.remove('no-scroll');
    window.scrollTo(0, scrollPosition);
    document.body.style.top = '';
  } else {
    scrollPosition = window.pageYOffset;
    document.body.classList.add('no-scroll');
    document.body.style.top = `-${scrollPosition}px`;
  }
  
  setTimeout(() => {
    html.style.scrollBehavior = savedScrollBehavior || 'smooth';
  }, 100);
}

function togglePopup(popup, show) {
  if (show) {
    togglePageScroll(false);
    popup.style.display = 'flex';
    setTimeout(() => popup.classList.add('active'), 10);
  } else if (popup) {
    popup.classList.remove('active');
    setTimeout(() => popup.style.display = 'none', 300);
    togglePageScroll(true);
  } else {
    document.querySelectorAll('.popup').forEach(p => {
      p.classList.remove('active');
      setTimeout(() => p.style.display = 'none', 300);
    });
    togglePageScroll(true);
  }
}

function setupEventListeners() {
  document.addEventListener('click', (event) => {
    const target = event.target;
    
    if (target.closest('.header__button, .about__button, .services__button, .button-request_footer')) {
      event.preventDefault();
      togglePopup(popups.application, true);
    }

    if (target.closest('.button-request') && target.closest('.cards-products')) {
      event.preventDefault();
      const card = target.closest('.cards__item');
      const modelTitle = card.querySelector('.cards__item-title').textContent;
      popups.model.querySelector('.subtitle').textContent = `Заявка на ${modelTitle}`;
      togglePopup(popups.model, true);
    }
  });

  document.querySelectorAll('.form__close').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      togglePopup(null, false);
      history.replaceState(null, '', window.location.pathname);
    });
  });

  document.addEventListener('keydown', ({ key }) => {
    if (key === 'Escape') {
      togglePopup(null, false);
      history.replaceState(null, '', window.location.pathname);
    }
  });

  document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        togglePopup(null, false);
        history.replaceState(null, '', window.location.pathname);
      }
    });
  });


  const formsApplication = document.querySelectorAll('.form_popup-application');
  formsApplication.forEach((form)=> {
    
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        togglePopup(popups.model, false);
        togglePopup(popups.application, false);
        togglePopup(popups.gratitude, true);
        this.reset();
        history.replaceState(null, '', window.location.pathname);
      });
    }
  });

  
  const formFeedback = document.querySelector('.form_feedback');
    if (formFeedback) {
      formFeedback.addEventListener('submit', function(e) {
        e.preventDefault();
        togglePopup(popups.gratitude, true);
        this.reset();
        history.replaceState(null, '', window.location.pathname);
      });
    }

  const gratitudeBtn = document.querySelector('.popup-gratitude__button');
  if (gratitudeBtn) {
    gratitudeBtn.addEventListener('click', () => {
      togglePopup(null, false);
      history.replaceState(null, '', window.location.pathname);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.popup').forEach(popup => {
    popup.style.display = 'none';
    popup.classList.remove('active');
  });
  
  setupEventListeners();
});