import { Loader } from "@googlemaps/js-api-loader";
const mapContainer = document.getElementById("map");

let map;
let marker;


// здесь прописать тему для карты 
const defaultTheme = [
  {
    featureType: 'administrative',
    elementType: 'all',
    stylers: [
      {
        saturation: '-100',
      },
    ],
  },
  {
    featureType: 'administrative.province',
    elementType: 'all',
    stylers: [
      {
        visibility: 'off',
      },
    ],
  },
  {
    featureType: 'landscape',
    elementType: 'all',
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: 65,
      },
      {
        visibility: 'on',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'all',
    stylers: [
      {
        saturation: -100,
      },
      {
        lightness: '50',
      },
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'all',
    stylers: [
      {
        saturation: '-100',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'all',
    stylers: [
      {
        lightness: '30',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'all',
    stylers: [
      {
        lightness: '40',
      },
    ],
  },
  {
    featureType: 'transit',
    elementType: 'all',
    stylers: [
      {
        saturation: -100,
      },
      {
        visibility: 'simplified',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [
      {
        hue: '#ffff00',
      },
      {
        lightness: -25,
      },
      {
        saturation: -97,
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels',
    stylers: [
      {
        lightness: -25,
      },
      {
        saturation: -100,
      },
    ],
  },
];
// здесь настроить опции для карты
const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: true,
  streetViewControl: true,
  rotateControl: false,
  keyboardShortcuts: false,
  scrollWheel: false,
  disableDoubleClickZoom: true,
  fullscreenControl: false,
};

const loader = new Loader({
  // ввести здесь апи ключ гугл мепс
  apiKey: '',
});

if (mapContainer) {
  loader.load().then(async () => {
    const { Map } = await google.maps.importLibrary('maps');

    map = new Map(document.getElementById('map'), {
      center: { lat: 48.4485167, lng: 35.0264985 },
      zoom: 17,
      styles: defaultTheme,
      options: defaultOptions,
    });
    const img = 'img/marker.svg';
    marker = new google.maps.Marker({
      position: { lat: 48.4485167, lng: 35.0264985 },
      map,
      icon: img,
    });

    returnToMarkerControl = new ReturnToMarkerControl(map, marker);
    map.controls[google.maps.ControlPosition.LEFT_CENTER].push(
      returnToMarkerControl
    );

    map.addListener('dragend', () => {
      marker.setPosition(map.getCenter());
    });
  });
}

