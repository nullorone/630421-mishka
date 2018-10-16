var btnOpen = document.querySelector('.header-nav__icon--open');
var btnClose = document.querySelector('.header-nav__icon--close');

btnOpen.classList.add('header-nav__icon--close');
btnOpen.classList.remove('header-nav__icon--open');

function isNavItemsToggle() {
  var navItem = document.querySelectorAll('.header-nav__item:not(.header-nav__item--logo)');
  for (var i = 0; i < navItem.length; i++) {
    navItem[i].classList.toggle('visually-hidden');
  }
}

isNavItemsToggle();

btnOpen.addEventListener('click', function (evt) {
  evt.preventDefault();
  isNavItemsToggle();
  if (btnOpen.classList.contains('header-nav__icon--close')) {
    btnOpen.classList.add('header-nav__icon--open');
    btnOpen.classList.remove('header-nav__icon--close');
  } else if (btnOpen.classList.contains('header-nav__icon--open')) {
    btnOpen.classList.add('header-nav__icon--close');
    btnOpen.classList.remove('header-nav__icon--open');
  }
});
