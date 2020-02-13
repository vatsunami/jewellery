'use strict';

(function () {
  window.resizeInterval = 500;

  window.breakpointWidth = {
    DESKTOP: 1024,
    TABLET: 768
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


(function () {
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


(function () {
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
      login.addEventListener('remove', onLoginClick);
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


(function () {
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
    }

    var onButtonOpenClick = function (evt) {
      evt.preventDefault();
      showFilters();
    };

    buttonOpen.addEventListener('click', onButtonOpenClick);
  }
})();

(function () {
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
    }

    var onButtonOpenClick = function (evt) {
      evt.preventDefault();
      showCart();
    };

    buttonOpen.addEventListener('click', onButtonOpenClick);
  }
})();


(function () {
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
      })

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
