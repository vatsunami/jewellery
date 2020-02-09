'use strict';

(function () {
  window.resizeInterval = 500;

  window.breakpointWidth = {
    DESKTOP: 1024,
    TABLET: 768
  };
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
      body.classList.remove('noscroll-header-menu');
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
      body.classList.add('noscroll-header-menu');
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

      var generateActiveClass = function (classString) {
        return classString.slice(1) + '--opened';
      };

      var switchActiveClasses = function (toggle, content) {
        toggle.classList.toggle(generateActiveClass(toggleClass));
        if (content) {
          content.classList.toggle(generateActiveClass(contentClass));
        }
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
