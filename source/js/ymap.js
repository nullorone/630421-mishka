ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("map", {
    center: [59.93870912, 30.3231457],
    zoom: 17
  });

  var myPlacemark = new ymaps.Placemark([59.93870912, 30.3231457], {}, {
    iconLayout: "default#image",
    iconImageHref: "img/map-pin.svg",
    iconImageSize: [66, 101],
    iconImageOffset: [-40, -90],
    balloonContentHeader:
      "<a class='logo' style='margin-left: auto; margin-right: auto'></a>",
    balloonContentBody:
      "<h2 style='text-align: center'>Милые штуки ручной<br> работы для дома</h2>"
  });
  myMap.geoObjects.add(myPlacemark);

  myMap.behaviors.disable([
    "drag",
    "dblClickZoom",
    "rightMouseButtonMagnifier",
    "ruler",
    "routeEditor",
    "scrollZoom"
  ]);
  myMap.controls
    .remove("searchControl")
    .remove("routeButtonControl")
    .remove("trafficControl")
    .remove("typeSelector")
    .remove("fullscreenControl")
    .remove("rulerControl");
}
