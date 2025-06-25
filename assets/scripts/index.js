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
const buttonSwitchCompanyElement = document.querySelector('.company__switch-carousel button');
const cardsCompanyElements = document.querySelectorAll('.company__img-carousel'); 
const popupApplicationElement = document.querySelector('.popup-application');
const closeButtonElements = document.querySelectorAll('.form__close');




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



// Переключение языка сайта в шапке проекта
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


// Карусель в секции about 
const swiper = new Swiper('.about__box.swiper', {
  centeredSlides: true,
  loop: true,
  slidesPerView: 1,
  navigation: {
    nextEl: '.about__button--next',
    prevEl: '.about__button--prev',
  },
  pagination: {
    el: '.about__dots',
    clickable: true,
    bulletClass: 'about__dot',
    bulletActiveClass: 'about__dot_active',
  },
});


// замена изображений на мобильных устройствах
function updateCardImages() {
  const cardSource = document.querySelector('.change');
  const cardImage = document.querySelector('.offset');
  const reviewImage = document.querySelector('.domstroy');
  const footerImage = document.querySelector('.footer__map-img');
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  const isMobileFooter = window.matchMedia('(max-width: 376px)').matches;

  if (cardSource) {
    if (isMobile) {
      cardSource.srcset = './assets/img/portfolio1-mobile.webp';
    } else {
      cardSource.srcset = './assets/img/portfolio1.webp';
    }
  }

  if (cardImage) {
    if (isMobile) {
      cardImage.src = './assets/img/portfolio1-mobile.webp';
    } else {
      cardImage.src = './assets/img/portfolio1.jpg';
    }
  }

  if (reviewImage) {
    if (isMobile) {
      reviewImage.src = './assets/img/reviews-img-luk.webp';
    } else {
      reviewImage.src = './assets/img/reviews-carousel-img.webp';
    }
  }

  if (footerImage) {
    if (isMobileFooter) {
      footerImage.src = './assets/img/footer-img-mobile.png';
    } else {
      footerImage.src = './assets/img/footer-img.webp';
    }
  }
}
document.addEventListener('DOMContentLoaded', updateCardImages);
window.addEventListener('resize', updateCardImages);



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



// Подключение каруселей в секциях portfolio и reviews
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
        backButton.disabled = currentIndex <= 0;
        forwardButton.disabled = currentIndex >= maxIndex;
      }
    }

    if (backButtonSelector) {
      const backButton = document.querySelector(backButtonSelector);
      backButton.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
          updateCarousel();
          backButton.classList.add('active');
          setTimeout(() => backButton.classList.remove('active'), 200);
        }
      });
    }

    if (forwardButtonSelector) {
      const forwardButton = document.querySelector(forwardButtonSelector);
      forwardButton.addEventListener('click', () => {
        const maxIndex = Math.max(0, items.length - itemsPerView);
        if (currentIndex < maxIndex) {
          currentIndex++;
          updateCarousel();
          forwardButton.classList.add('active');
          setTimeout(() => forwardButton.classList.remove('active'), 200);
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



//  Карусель секции partners
document.addEventListener('DOMContentLoaded', function() {
  const swiperContainer = document.querySelector('.partners__box');
  if (!swiperContainer) return;
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
      Fancybox.close();
      window.location.href = 'index-gratitude';
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
    hideScrollbar: false,
    hideOnClose: false,
    on: {
      init: (fancybox) => {
        const content = document.querySelector('.fancybox__content');
        if (content) {
          content.style.padding = '0';
        }
      },
      done: (fancybox, slide) => {
        const firstInputEl = document.querySelector('#application-popup .form__input');
        if (firstInputEl) {
          setTimeout(() => firstInputEl.focus(), 300);
        }
      },
      closing: () => {
        clearForm('#application-popup form', '#application-popup .form__input, #application-popup textarea');
      }
    }
  });

  const applicationForm = document.querySelector('#application-popup form');
  if (applicationForm) {
    applicationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      Fancybox.close();
      window.location.href = 'index-gratitude';
      clearForm('#application-popup form', '#application-popup .form__input, #application-popup textarea');
    });
  }

  const formFeedback = document.querySelector('.form_feedback');
  if (formFeedback) {
    formFeedback.addEventListener('submit', function(e) {
      e.preventDefault();
      window.location.href = 'index-gratitude';
      clearForm('.form_feedback', '.form_feedback .form__input, .form_feedback textarea');
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

      input.addEventListener('click', function() {
        this.focus();
        this.classList.add('active');
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


// прокрутка карусели в секции Company
document.addEventListener('DOMContentLoaded', () => {
  const carouselCompanyElement = document.querySelector('.company__carousel .swiper-wrapper');
  const originalSlideElements = document.querySelectorAll('.company__carousel .swiper-slide:not(.clone)');
  const switchButton = document.querySelector('.company__switch-carousel button');
  
  let cardWidths = [];
  let totalOriginalWidth = 0;
  const totalOriginalCards = originalSlideElements.length;
  let currentIndex = 0;
  let translateX = 0;
  let isAnimating = false;
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;

  function cloneSlides() {
    const existingClones = document.querySelectorAll('.company__carousel .swiper-slide.clone');
    existingClones.forEach(clone => clone.remove());
    
    for (let i = 0; i < 2; i++) {
      if (originalSlideElements[i]) {
        const clone = originalSlideElements[i].cloneNode(true);
        clone.classList.add('clone');
        carouselCompanyElement.appendChild(clone);
      }
    }
    
    for (let i = totalOriginalCards - 2; i < totalOriginalCards; i++) {
      if (originalSlideElements[i]) {
        const clone = originalSlideElements[i].cloneNode(true);
        clone.classList.add('clone');
        carouselCompanyElement.insertBefore(clone, carouselCompanyElement.firstChild);
      }
    }
    
    updateCardWidths();
    currentIndex = 0;
    goToSlide(currentIndex, false);
  }

  function updateCardWidths() {
    const allSlides = document.querySelectorAll('.company__carousel .swiper-slide');
    cardWidths = Array.from(allSlides).map(slide => slide.offsetWidth + 20);
    totalOriginalWidth = Array.from(originalSlideElements)
      .map(slide => slide.offsetWidth + 20)
      .reduce((sum, width) => sum + width, 0);
  }

  function goToSlide(index, animate = true) {
    if (isAnimating || !carouselCompanyElement) return;
    
    currentIndex = index;
    let position = 0;
    
    for (let i = 0; i < index + 2; i++) {
      if (cardWidths[i]) {
        position -= cardWidths[i];
      }
    }
    
    translateX = position;
    carouselCompanyElement.style.transition = animate ? 'transform 0.5s ease' : 'none';
    carouselCompanyElement.style.transform = `translateX(${translateX}px)`;
    
    if (animate) {
      isAnimating = true;
      setTimeout(() => {
        isAnimating = false;
        checkInfiniteScroll();
      }, 500);
    }
  }

  function checkInfiniteScroll() {
    if (currentIndex >= totalOriginalCards) {
      currentIndex = 0;
      goToSlide(currentIndex, false);
    }

    else if (currentIndex < 0) {
      currentIndex = totalOriginalCards - 1;
      goToSlide(currentIndex, false);
    }
  }

  function handleSwipeEnd() {
    if (!isDragging) return;
    isDragging = false;
    carouselCompanyElement.classList.remove('dragging');
    
    const dragDistance = translateX - currentTranslate;
    if (Math.abs(dragDistance) > 50) {
      if (dragDistance > 0) {
        currentIndex--;
      } else {
        currentIndex++;
      }
    }
    
    goToSlide(currentIndex);
  }

  function initCarousel() {
    cloneSlides();
    
    if (switchButton) {
      switchButton.addEventListener('click', () => {
        if (isAnimating || isDragging) return;
        currentIndex++;
        goToSlide(currentIndex);
      });
    }

    carouselCompanyElement.addEventListener('mousedown', (e) => {
      if (isAnimating) return;
      isDragging = true;
      startX = e.pageX;
      currentTranslate = translateX;
      carouselCompanyElement.classList.add('dragging');
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = e.pageX - startX;
      translateX = currentTranslate + deltaX;
      carouselCompanyElement.style.transition = 'none';
      carouselCompanyElement.style.transform = `translateX(${translateX}px)`;
    });

    document.addEventListener('mouseup', handleSwipeEnd);

    carouselCompanyElement.addEventListener('touchstart', (e) => {
      if (isAnimating) return;
      isDragging = true;
      startX = e.touches[0].pageX;
      currentTranslate = translateX;
      carouselCompanyElement.classList.add('dragging');
    }, { passive: true });

    document.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const deltaX = e.touches[0].pageX - startX;
      translateX = currentTranslate + deltaX;
      carouselCompanyElement.style.transition = 'none';
      carouselCompanyElement.style.transform = `translateX(${translateX}px)`;
    }, { passive: true });

    document.addEventListener('touchend', handleSwipeEnd, { passive: true });

    window.addEventListener('resize', () => {
      updateCardWidths();
      goToSlide(currentIndex, false);
    });
  }

  initCarousel();
});





// Добавление файлов в форму отправки
const fileStorage = new Map();
document.querySelectorAll('.form__input-file').forEach(input => {
  const previewContainer = input.closest('.form__label.file').nextElementSibling;
  if (!previewContainer || !previewContainer.classList.contains('form__file-preview')) {
    const newContainer = document.createElement('div');
    newContainer.className = 'form__file-preview';
    input.closest('.form__label.file').after(newContainer);
  }

  input.addEventListener('change', function() {
    if (this.files && this.files.length > 0) {
      Array.from(this.files).forEach(file => {
        fileStorage.set(file.name, file);
      });
      
      updateFilePreview(previewContainer);
      input.closest('.form__label.file').classList.add('form__file-label--has-files');
    }
    
    this.value = '';
  });
});

function updateFilePreview(container) {
  const list = document.createElement('ul');
  list.className = 'form__file-list';
  if (fileStorage.size > 0) {
    const clearBtn = document.createElement('button');
    clearBtn.textContent = 'Очистить все';
    clearBtn.className = 'form__file-clear-btn';
    clearBtn.addEventListener('click', (e) => {
      e.preventDefault();
      fileStorage.clear();
      container.innerHTML = '';
      document.querySelector('.form__file-label').classList.remove('form__file-label--has-files');
    });
    container.appendChild(clearBtn);
  }

  Array.from(fileStorage.values()).forEach((file, index) => {
    const item = document.createElement('li');
    item.className = 'form__file-item';
    
    const icon = document.createElement('span');
    icon.className = 'form__file-icon';
    icon.textContent = getFileIcon(file.type);
    
    const name = document.createElement('span');
    name.className = 'form__file-name';
    name.textContent = `${index + 1}. ${file.name} (${formatFileSize(file.size)})`;
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'form__file-remove-btn';
    removeBtn.textContent = '×';
    removeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      fileStorage.delete(file.name);
      updateFilePreview(container);
      if (fileStorage.size === 0) {
        document.querySelector('.form__file-label').classList.remove('form__file-label--has-files');
      }
    });
      
    item.appendChild(icon);
    item.appendChild(name);
    item.appendChild(removeBtn);
    list.appendChild(item);
  });
  
  container.innerHTML = '';
  if (fileStorage.size > 0) {
    container.appendChild(list);
  }
}

function getFileIcon(fileType) {
  if (fileType.startsWith('image/')) return '🖼️';
  if (fileType.startsWith('video/')) return '🎬';
  if (fileType.includes('pdf')) return '📄';
  return '📁';
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const BYTES_IN_KILOBYTE = 1024;
  const UNITS = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(BYTES_IN_KILOBYTE));
  const sizeInUnit = bytes / Math.pow(BYTES_IN_KILOBYTE, unitIndex);
  const formattedSize = parseFloat(sizeInUnit.toFixed(2));
  return `${formattedSize} ${UNITS[unitIndex]}`;
}

const formFeedback = document.querySelector('.form_feedback');
if (formFeedback) {
  formFeedback.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    fileStorage.forEach(file => {
      formData.append('files[]', file);
    });

    window.location.href = 'index-gratitude';
    fileStorage.clear();
    clearForm('.form_feedback', '.form_feedback .form__input, .form_feedback textarea');
  });
}





// Подключаем API Яндекс Карт
document.querySelector('.footer__map-btn').addEventListener('click', function() {
  if (!window.mapInitialized) {
    initMap();
    window.mapInitialized = true;
  }
});

function initMap() {
  ymaps.ready(function() {
    var myMap = new ymaps.Map("yandex-map", {
      center: [54.852666, 56.083728],
      zoom: 15
    });

    var myPlacemark = new ymaps.Placemark([54.722330, 55.942583], {
      hintContent: 'Юбилейная, 17/4',
      balloonContent: 'Наш офис'
    }, {
      preset: 'islands#redDotIcon'
    });

    myMap.geoObjects.add(myPlacemark);
    myMap.controls.add('zoomControl');
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      initMap();
      window.mapInitialized = true;
      observer.disconnect();
    }
  }, {
    rootMargin: '200px'
  });
  
  observer.observe(document.getElementById('yandex-map'));
}