'use strict';

(function () {
  window.resizeInterval = 500;

  window.breakpointWidth = {
    DESKTOP: 1024,
    TABLET: 768,
    MOBILE: 320
  };
})();


(function () {
  var generateNewSelectorClass = function (selectorClass, endingString) {
    return selectorClass.slice(1) + endingString;
  };

  window.utils = {
    generateNewSelectorClass: generateNewSelectorClass
  }
})();


var headerMenu = (function () {
  var pageHeader = document.querySelector('.page-header');

  if (pageHeader) {
    var body = document.body;
    var pageHeaderContainer = pageHeader.querySelector('.page-header__container');
    var menuButton = pageHeaderContainer.querySelector('.page-header__menu-button');
    var logo = pageHeader.querySelector('.page-header__logo');
    var logoImages = logo.querySelectorAll('.logo__img');
    var logoImagesArray = [].slice.call(logoImages);
    var mainNav = pageHeaderContainer.querySelector('.page-header__main-nav');
    var search = pageHeaderContainer.querySelector('.page-header__form-search');
    var userAccount = pageHeaderContainer.querySelector('.page-header__user-account');
    var userNav = pageHeaderContainer.querySelector('.page-header__user-nav');
    var userCart = userNav.querySelector('.user-cart');
    var userCartIconWrapper = userCart.querySelector('.user-cart__icon-wrapper');
    var siteNav = pageHeaderContainer.querySelector('.page-header__site-nav');

    var closeHeaderMenu = function () {
      body.classList.remove('noscroll--header-menu');
      pageHeader.classList.add('page-header--closed');
      pageHeaderContainer.classList.add('page-header__container--closed');
      menuButton.classList.add('menu-button--closed');
      userAccount.classList.add('page-header__user-account--closed');
      mainNav.classList.add('page-header__main-nav--closed');
      search.classList.add('page-header__form-search--closed');
      siteNav.classList.add('page-header__site-nav--closed');
      userCartIconWrapper.classList.add('user-cart__icon-wrapper--closed');
      for (var i = 0; i < logoImagesArray.length; i++) {
        logoImagesArray[i].classList.add('logo__img--closed');
      }
      pageHeaderContainer.classList.remove('page-header__container--active-js');
    };

    var openHeaderMenu = function () {
      body.classList.add('noscroll--header-menu');
      pageHeader.classList.remove('page-header--closed');
      pageHeaderContainer.classList.remove('page-header__container--closed');
      menuButton.classList.remove('menu-button--closed');
      userAccount.classList.remove('page-header__user-account--closed');
      mainNav.classList.remove('page-header__main-nav--closed');
      search.classList.remove('page-header__form-search--closed');
      siteNav.classList.remove('page-header__site-nav--closed');
      userCartIconWrapper.classList.remove('user-cart__icon-wrapper--closed');
      for (var i = 0; i < logoImagesArray.length; i++) {
        logoImagesArray[i].classList.remove('logo__img--closed');
      }
      pageHeaderContainer.classList.add('page-header__container--active-js');
    };

    menuButton.addEventListener('click', function () {
      if (pageHeader.classList.contains('page-header--closed')) {
        openHeaderMenu();
      } else {
        closeHeaderMenu();
      }
    });

    window.addEventListener('load', function () {
      closeHeaderMenu();
    });

    window.addEventListener('resize', function () {
      var resizeTimeout;
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          if (window.innerWidth >= window.breakpointWidth.DESKTOP) {
            closeHeaderMenu();
          }
        }, window.resizeInterval);
      }
    });
  }
})();


var accordion = (function () {
  return function (accordionId, toggleClass, contentClass) {
    var accordionContainer = document.querySelector(accordionId);

    if (accordionContainer) {
      var accordionToggles = accordionContainer.querySelectorAll(toggleClass);
      var accordionTogglesArray = [].slice.call(accordionToggles);

      var switchActiveClasses = function (toggle, content) {
        toggle.classList.toggle(window.utils.generateNewSelectorClass(toggleClass, '--opened'));
        content.classList.toggle(window.utils.generateNewSelectorClass(contentClass, '--opened'));
      };

      var onToggleClick = function (evt) {
        var target = evt.target;
        var isToggle = accordionTogglesArray.some(function (element) {
          return target === element;
        });
        if (isToggle) {
          var group = target.parentElement;
          var content = group.querySelector(contentClass);
          switchActiveClasses(target, content);
        }
      };

      accordionContainer.addEventListener('click', onToggleClick);
    }
  }
})();

accordion('#accordion-faq', '.faq__question', '.faq__answer');
accordion('#accordion-filters', '.catalog-filters__toggle', '.catalog-filters__group');


var modalLogin = (function () {
  var ESC_KEYCODE = 27;
  var login = document.querySelector('.modal-login');

  if (login) {
    var buttonOpen = document.querySelector('.user-account__link');
    var loginContainer = login.querySelector('.modal-login__container');
    var buttonClose = loginContainer.querySelector('.modal-login__button-close');
    var form = loginContainer.querySelector('.form-login');
    var inputEmail = form.querySelector('.form-login__input[type=email]');
    var inputPassword = form.querySelector('.form-login__input[type=password]');
    var isStorageSupport = true;
    var storage = '';

    try {
      storage = localStorage.getItem("inputEmail");
    } catch (err) {
      isStorageSupport = false;
    }

    var showLoginModal = function () {
      document.body.classList.add('noscroll--login');
      login.classList.remove(window.utils.generateNewSelectorClass('.modal-login', '--closed'));
      inputEmail.focus();
      buttonOpen.removeEventListener('click', onButtonOpenClick);
      buttonClose.addEventListener('click', onButtonCloseClick);
      login.addEventListener('click', onOverlayClick);
      document.addEventListener('keydown', onEscPress);
      if (isStorageSupport && storage) {
        inputEmail.value = localStorage.getItem("inputEmail");
        inputPassword.focus();
      }
    };

    var hideLoginModal = function () {
      document.body.classList.remove('noscroll--login');
      login.classList.add(window.utils.generateNewSelectorClass('.modal-login', '--closed'));
      buttonOpen.addEventListener('click', onButtonOpenClick);
      buttonClose.removeEventListener('click', onButtonCloseClick);
      login.removeEventListener('click', onOverlayClick);
      document.removeEventListener('keydown', onEscPress);
    };

    var onEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        hideLoginModal();
      }
    };

    var onButtonCloseClick = function (evt) {
      evt.preventDefault();
      hideLoginModal();
    };

    var onButtonOpenClick = function (evt) {
      evt.preventDefault();
      showLoginModal();
    };

    var onOverlayClick = function (evt) {
      var clickCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };
      if (clickCoordinates.x < loginContainer.offsetLeft ||
        clickCoordinates.x > loginContainer.offsetLeft + loginContainer.offsetWidth ||
        clickCoordinates.y < loginContainer.offsetTop ||
        clickCoordinates.y > loginContainer.offsetTop + loginContainer.offsetHeight) {
        hideLoginModal();
      }
    };

    var onFormSubmit = function () {
      if (isStorageSupport) {
        localStorage.setItem("inputEmail", inputEmail.value);
      }
    };

    buttonOpen.addEventListener('click', onButtonOpenClick);
    form.addEventListener('submit', onFormSubmit);
  }
})();


var modalFilters = (function () {
  var filters = document.querySelector('.catalog-filters');

  if (filters) {
    var container = filters.querySelector('.catalog-filters__container');
    var buttonOpen = document.querySelector('.catalog__button-filters');
    var buttonClose = container.querySelector('.catalog-filters__button-close');

    var showFilters = function () {
      document.body.classList.add('noscroll--filters');
      filters.classList.add(window.utils.generateNewSelectorClass('.catalog-filters', '--opened'));
      buttonOpen.removeEventListener('click', onButtonOpenClick);
      buttonClose.addEventListener('click', onButtonCloseClick);
    };

    var hideFilters = function () {
      document.body.classList.remove('noscroll--filters');
      filters.classList.remove(window.utils.generateNewSelectorClass('.catalog-filters', '--opened'));
      buttonOpen.addEventListener('click', onButtonOpenClick);
      buttonClose.removeEventListener('click', onButtonCloseClick);
    };

    var onButtonCloseClick = function (evt) {
      evt.preventDefault();
      hideFilters();
    };

    var onButtonOpenClick = function (evt) {
      evt.preventDefault();
      showFilters();
    };

    buttonOpen.addEventListener('click', onButtonOpenClick);
  }
})();


var modalCart = (function () {
  var ESC_KEYCODE = 27;
  var cart = document.querySelector('.modal-cart');

  if (cart) {
    var cartContainer = cart.querySelector('.modal-cart__container');
    var buttonOpen = document.querySelector('.product-info__button');
    var buttonClose = cartContainer.querySelector('.modal-cart__button-close');

    var showCart = function () {
      cart.classList.remove(window.utils.generateNewSelectorClass('.modal-cart', '--closed'));
      buttonOpen.removeEventListener('click', onButtonOpenClick);
      buttonClose.addEventListener('click', onButtonCloseClick);
      cart.addEventListener('click', onOverlayClick);
      document.addEventListener('keydown', onEscPress);
    };

    var hideCart = function () {
      cart.classList.add(window.utils.generateNewSelectorClass('.modal-cart', '--closed'));
      buttonOpen.addEventListener('click', onButtonOpenClick);
      buttonClose.removeEventListener('click', onButtonCloseClick);
      document.removeEventListener('keydown', onEscPress);
    };

    var onOverlayClick = function (evt) {
      var clickCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };
      if (clickCoordinates.x < cartContainer.offsetLeft ||
        clickCoordinates.x > cartContainer.offsetLeft + cartContainer.offsetWidth ||
        clickCoordinates.y < cartContainer.offsetTop ||
        clickCoordinates.y > cartContainer.offsetTop + cartContainer.offsetHeight) {
        hideCart();
      }
    };

    var onEscPress = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        hideCart();
      }
    };

    var onButtonCloseClick = function (evt) {
      evt.preventDefault();
      hideCart();
    };

    var onButtonOpenClick = function (evt) {
      evt.preventDefault();
      showCart();
    };

    buttonOpen.addEventListener('click', onButtonOpenClick);
  }
})();


var productCardInfoTabs = (function () {
  var tabs = document.querySelector('.info-tabs');

  if (tabs) {
    var toggles = tabs.querySelectorAll('.info-tabs__toggle');
    var togglesArray = [].slice.call(toggles);
    var sections = tabs.querySelectorAll('.info-tabs__section');
    var sectionsArray = [].slice.call(sections);
    var activeTabIndex = 2;

    var switchActiveTab = function () {
      togglesArray.forEach(function (element, index) {
        if (index !== activeTabIndex) {
          element.classList.remove(window.utils.generateNewSelectorClass('.info-tabs__toggle', '--active'));
          sectionsArray[index].classList.remove(window.utils.generateNewSelectorClass('.info-tabs__section', '--active'));
        } else {
          element.classList.add(window.utils.generateNewSelectorClass('.info-tabs__toggle', '--active'));
          sectionsArray[index].classList.add(window.utils.generateNewSelectorClass('.info-tabs__section', '--active'));
        }
      });
    };

    var onToggleClick = function (evt) {
      var target = evt.target;
      var isToggle = togglesArray.some(function (element) {
        return target === element;
      });
      if (isToggle) {
        activeTabIndex = togglesArray.indexOf(target);
        switchActiveTab();
      }
    };;

    tabs.addEventListener('click', onToggleClick);
  }
})();

var sliderMultipleCards = (function () {
  return function (selector) {
    var sliderCards = document.querySelector(selector);

    if (sliderCards) {
      var CountOfActiveCards = {
        DESKTOP: 4,
        TABLET: 2,
        MOBILE: 2
      };

      var CardsContainerMaxWidth = {
        DESKTOP: 3600,
        TABLET: 5778,
        MOBILE: 4602
      };

      var container = sliderCards.querySelector('.slider-cards__container');
      var wrapper = container.querySelector('.slider-cards__list-wrapper');
      var buttonPrev = container.querySelector('.slider-cards__toggle--prev');
      var buttonNext = container.querySelector('.slider-cards__toggle--next');
      var cardsList =  container.querySelector('.slider-cards__list');
      var cardsItems = container.querySelectorAll('.slider-cards__item');
      var cardsItemsArray = [].slice.call(cardsItems);
      var pagination = container.querySelector('.pagination');
      var paginationButtons = pagination.querySelectorAll('.pagination__link');
      var paginationButtonsArray = [].slice.call(paginationButtons);
      var pageCounter = container.querySelector('.page-counter');
      var pageCounterCurrent = pageCounter.querySelector('.page-counter__number--current');
      var countOfActiveCards;
      var topLimitForResizeContainer = 1230;
      var totalCountOfCards = 12;
      var itemsArray = [];
      var swipeMinWidth = 70;
      var swipeStartX;
      var swiperEndX;
      var firstCard = cardsItemsArray[0];
      var lastCard = cardsItemsArray[cardsItemsArray.length - 1];
      var indexOfPaginationButtonActive = 0;
      var pageCounterValue = 1;

      var fillItemsArray = function () {
        cardsItemsArray.forEach(function (item, index) {
          itemsArray.push(item);
        });
      };

      var returnItemsToStart = function () {
        itemsArray = [];
        cardsItemsArray.forEach(function (element) {
          cardsList.appendChild(element);
        });
      };

      var setCountOfActiveCards = function () {
        if (window.innerWidth >= window.breakpointWidth.DESKTOP) {
          countOfActiveCards = CountOfActiveCards.DESKTOP;
        } else if (window.innerWidth >= window.breakpointWidth.TABLET && window.innerWidth < window.breakpointWidth.DESKTOP) {
          countOfActiveCards = CountOfActiveCards.TABLET;
        } else {
          countOfActiveCards = CountOfActiveCards.MOBILE;
        }
      };

      var slideTo = function (page) {
        returnItemsToStart();
        fillItemsArray();
        indexOfPaginationButtonActive = 0;
        for (var i = 0; i < page; i++) {
          moveCards(true);
        }
        if (indexOfPaginationButtonActive === 0) {
          returnPaginationButtonsToStart();
        }
      };

      var returnPaginationButtonsToStart = function () {
        paginationButtonsArray.forEach(function (button) {
          button.classList.remove('pagination__link--active');
        });
        indexOfPaginationButtonActive = 0;
        paginationButtonsArray[indexOfPaginationButtonActive].classList.add('pagination__link--active');
      };

      var setActivePaginationButtonByDirection = function (direction) {
        paginationButtonsArray.forEach(function (button) {
          button.classList.remove('pagination__link--active');
        });
        if (direction) {
          indexOfPaginationButtonActive += 1;
        } else {
          indexOfPaginationButtonActive -= 1;
        }
        paginationButtonsArray[indexOfPaginationButtonActive].classList.add('pagination__link--active');
      };

      var moveCards = function (direction) {
        var firstElement = itemsArray[0];
        var elementsForMove;
        var removedItem;
        if (direction && itemsArray.indexOf(lastCard) !== countOfActiveCards - 1) {
          elementsForMove = itemsArray.slice(0, countOfActiveCards);
          elementsForMove.forEach(function (element) {
            removedItem = itemsArray.shift(element);
            itemsArray.push(removedItem);
            cardsList.appendChild(element);
          });
          setActivePaginationButtonByDirection(direction);
          setPageCounterCurrentValue(direction);
        } else if (!direction && itemsArray.indexOf(firstCard) !== 0) {
          elementsForMove = itemsArray.slice(-countOfActiveCards);
          elementsForMove.forEach(function (element) {
            removedItem = itemsArray.pop(element);
            itemsArray.unshift(removedItem);
            cardsList.insertBefore(element, firstElement);
          });
          setActivePaginationButtonByDirection(direction)
          setPageCounterCurrentValue(direction);
        } else {
          return;
        }
      };

      var transformCardsList = function () {
        if (window.innerWidth <= topLimitForResizeContainer &&
          window.innerWidth >= window.breakpointWidth.DESKTOP) {
          cardsList.style.width = CardsContainerMaxWidth.DESKTOP - (topLimitForResizeContainer - window.innerWidth) * 3 + 'px';
        } else if (window.innerWidth >= window.breakpointWidth.TABLET &&
          window.innerWidth < window.breakpointWidth.DESKTOP) {
          cardsList.style.width = CardsContainerMaxWidth.TABLET - (window.breakpointWidth.DESKTOP - 1 - window.innerWidth) * 6 + 'px';
        } else if (window.innerWidth >= window.breakpointWidth.MOBILE &&
          window.innerWidth < window.breakpointWidth.TABLET) {
          cardsList.style.width = CardsContainerMaxWidth.MOBILE - (window.breakpointWidth.TABLET - 1 - window.innerWidth) * 6 + 'px';
        } else {
          cardsList.style.width = '';
        }
      };

      var setPageCounterCurrentValue = function (direction) {
        pageCounterValue = indexOfPaginationButtonActive;
        pageCounterCurrent.innerHTML = pageCounterValue + 1;
      };

      var onButtonPrevClick = function () {
        moveCards(false);
      };

      var onButtonNextClick = function () {
        moveCards(true);
      };

      var onCardsListTouchStart = function (evt) {
        swipeStartX = evt.touches[0].clientX;
      };

      var onCardsListTouchEnd = function (evt) {
        swiperEndX = evt.changedTouches[0].clientX;
        if (swiperEndX - swipeStartX > swipeMinWidth) {
          moveCards(false);
        } else if (Math.abs(swiperEndX - swipeStartX) > swipeMinWidth) {
          moveCards(true);
        } else {
          return;
        }
      };

      var onPaginationButtonClick = function (evt) {
        evt.preventDefault();
        var target = evt.target;
        var isButton = paginationButtonsArray.some(function (item) {
          return target === item;
        });
        if (isButton && !target.classList.contains('pagination__link--active')) {
          var index = paginationButtonsArray.indexOf(target);
          slideTo(index);
        }
      };

      pagination.addEventListener('click', onPaginationButtonClick);
      wrapper.addEventListener('touchstart', onCardsListTouchStart);
      wrapper.addEventListener('touchend', onCardsListTouchEnd);
      buttonPrev.addEventListener('click', onButtonPrevClick);
      buttonNext.addEventListener('click', onButtonNextClick);

      window.addEventListener('load', function () {
        setCountOfActiveCards();
        fillItemsArray();
        returnPaginationButtonsToStart();
        setPageCounterCurrentValue();
        transformCardsList();
      });

      window.addEventListener('resize', function () {
        var resizeTimeout;
        if (!resizeTimeout) {
          resizeTimeout = setTimeout(function () {
            resizeTimeout = null;
            setCountOfActiveCards();
            returnItemsToStart();
            returnPaginationButtonsToStart();
            setPageCounterCurrentValue();
            fillItemsArray();
            transformCardsList();
          }, window.resizeInterval);
        }
      });
    }
  }
})();

sliderMultipleCards('#slider-new-in');
sliderMultipleCards('#slider-extra');


var productGallery = (function () {
  var gallery = document.querySelector('.product-gallery');

  if (gallery) {
    var galleryList = gallery.querySelector('.product-gallery__pictures');
    var galleryItems = galleryList.querySelectorAll('.product-gallery__picture');
    var galleryItemsArray = [].slice.call(galleryItems);
    var pageCounter = gallery.querySelector('.page-counter');
    var pageCounterCurrent = pageCounter.querySelector('.page-counter__number--current');
    var galleryListMaxWidth = 1560;
    var topLimitForResizeContainer = 420;
    var pageCounterValueDefault = 1;
    var pageCounterValue = 1;
    var firstItem = galleryItemsArray[0];
    var lastItem = galleryItemsArray[galleryItemsArray.length - 1];
    var swipeMinWidth = 70;
    var swipeStartX;
    var swiperEndX;

    var itemsArray = [];

    var fillItemsArray = function () {
      galleryItemsArray.forEach(function (item) {
        itemsArray.push(item);
      });
    };

    var returnItemsToStart = function () {
      itemsArray = [];
      galleryItemsArray.forEach(function (element) {
        galleryList.appendChild(element);
      });
    };

    var pageCounterValueToStart = function () {
      pageCounterValue = pageCounterValueDefault;
      pageCounterCurrent.innerHTML = pageCounterValue;
    };

    var changePageCounterCurrentValue = function (direction) {
      if (direction) {
        pageCounterValue += 1;
      } else {
        pageCounterValue -= 1;
      }
      pageCounterCurrent.innerHTML = pageCounterValue;
    };

    var transformGalleryList = function () {
      if (window.innerWidth > topLimitForResizeContainer &&
      window.innerWidth < window.breakpointWidth.TABLET) {
        galleryList.style.width = galleryListMaxWidth + 'px';
      } else if (window.innerWidth >= window.breakpointWidth.MOBILE &&
        window.innerWidth <= topLimitForResizeContainer) {
        galleryList.style.width = galleryListMaxWidth - (topLimitForResizeContainer - window.innerWidth) * 4 + 'px';
      } else {
        galleryList.style.width = '';
      }
    };

    var moveGalleryItems = function (direction) {
      var firstElement = itemsArray[0];
      var elementsForMove;
      var removedItem;
      if (direction && itemsArray.indexOf(lastItem) !== 0) {
        elementsForMove = itemsArray.slice(0, 1);
        elementsForMove.forEach(function (element) {
          removedItem = itemsArray.shift(element);
          itemsArray.push(removedItem);
          galleryList.appendChild(element);
        });
        changePageCounterCurrentValue(direction);
      } else if (!direction && itemsArray.indexOf(firstItem) !== 0) {
        elementsForMove = itemsArray.slice(-1);
        elementsForMove.forEach(function (element) {
          removedItem = itemsArray.pop(element);
          itemsArray.unshift(removedItem);
          galleryList.insertBefore(element, firstElement);
        });
        changePageCounterCurrentValue(direction);
      } else {
        return;
      }
    };

    var onGalleryListTouchStart = function (evt) {
      swipeStartX = evt.touches[0].clientX;
    };

    var onGalleryListTouchEnd = function (evt) {
      swiperEndX = evt.changedTouches[0].clientX;
      if (swiperEndX - swipeStartX > swipeMinWidth) {
        moveGalleryItems(false);
      } else if (Math.abs(swiperEndX - swipeStartX) > swipeMinWidth) {
        moveGalleryItems(true);
      } else {
        return;
      }
    };

    gallery.addEventListener('touchstart', onGalleryListTouchStart);
    gallery.addEventListener('touchend', onGalleryListTouchEnd);

    window.addEventListener('load', function () {
      fillItemsArray();
      transformGalleryList();
    });

    window.addEventListener('resize', function () {
      var resizeTimeout;
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(function () {
          resizeTimeout = null;
          pageCounterValueToStart();
          returnItemsToStart();
          fillItemsArray();
          transformGalleryList();
        }, window.resizeInterval);
      }
    });
  }
})();
