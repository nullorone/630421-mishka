var btnToggle = document.querySelector('.header-nav__toggle');

btnToggle.classList.add('header-nav__icon--close');

function isNavItemsToggle() {
  var navItem = document.querySelectorAll('.header-nav__item:not(.header-nav__item--logo)');
  for (var i = 0; i < navItem.length; i++) {
    navItem[i].classList.toggle('visually-hidden');
  }
}

isNavItemsToggle();

btnToggle.addEventListener('click', function (evt) {
  evt.preventDefault();
  isNavItemsToggle();
  btnToggle.classList.toggle('header-nav__icon--close');
});
