var btnToggle = document.querySelector('.header-nav__toggle');
var modal = document.querySelector('.modal-buy');
var overlay = document.querySelector('.overlay');
var mapPic = document.querySelector('.contacts__map');
var iframe = document.querySelector('.contatcs__map-iframe');
var iframeStatus = '';
var btnModalBuy = [];
btnModalBuy = document.querySelectorAll('.js-modal-buy');

// Проверка загрузки iframe с картой Яндекса
try {
  var iframeDocument = iframe.contentWindow.document || iframe.contentDocument;
  if (iframeDocument.readyState  == 'complete') {
    iframeStatus = true;}
} catch (err) {
    iframeStatus = false;
}
//Проверяет загрузку iframe. Если истина, то скрывает изображение карты, иначе скрывает iframe
if (iframeStatus) {
  mapPic.style.display = 'none';
} else {
  iframe.style.display = 'none';
}

//Добавляет иконку закрытого меню по-умолчанию
btnToggle.classList.add('header-nav__toggle--close');

// Функция скрытия пунктов меню, кроме пункта с логотипом
function isNavItemsToggle() {
  var navItem = document.querySelectorAll('.header-nav__item:not(.header-nav__item--logo)');
  for (var i = 0; i < navItem.length; i++) {
    navItem[i].classList.toggle('visually-hidden');
  }
}

// Функция отображения модального окна и оверлея
function showModal(evt) {
  evt.preventDefault();
  modal.classList.add('modal-buy--show');
  modal.classList.remove('visually-hidden');
  modal.style.display = 'block';
  overlay.classList.remove('visually-hidden');
  // Отрабатывает нажатие на клавишу Esc
  window.addEventListener("keydown", function(evt) {
    27 === evt.keyCode && hideModal(evt);
  });
}

// Функция скрытия модального окна и оверлея
function hideModal(evt) {
  evt.preventDefault();
  modal.classList.add('visually-hidden');
  overlay.classList.add('visually-hidden');
  modal.style.display = 'none';
}

// Скрываем пункты меню, если ширина окна меньше 768px
if (window.matchMedia('(max-width: 767px)').matches) {
  isNavItemsToggle();//Скрывает пункты меню по-умолчанию
}

// Скрывает модальное окно по-умолчанию
modal.classList.add('visually-hidden');
modal.style.display = 'none';

// При нажатии на иконку меню - переключает отображение пунктов меню
btnToggle.addEventListener('click', function (evt) {
  evt.preventDefault();
  isNavItemsToggle();
  btnToggle.classList.toggle('header-nav__toggle--close');
});

// При нажатии на кнопку заказать в блоке оффер главной страницы, меняет отображение окна и оверлея
for (var i = 0; i < btnModalBuy.length; i++) {
  btnModalBuy[i].addEventListener('click', showModal);
}
overlay.addEventListener('click', hideModal);
