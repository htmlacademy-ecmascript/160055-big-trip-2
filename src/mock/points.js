import {getRandomArrayElement} from '../utils.js';
// import {EVENTTYPES} from '../const.js';
// [
//   {
//   "id": "f4b62099-293f-4c3d-a702-94eec4a2808c",
//   "base_price": 1100,
//   "date_from": "2019-07-10T22:55:56.845Z",
//   "date_to": "2019-07-11T11:22:13.375Z",
//   "destination": "bfa5cb75-a1fe-4b77-a83c-0e528e910e04",
//   "is_favorite": false,
//   "offers": [
//   "b4c3e4e6-9053-42ce-b747-e281314baa31"
//   ],
//   "type": "taxi"
//   }]
const mockPoints = [
  {
    id: '1', //f4b62099-293f-4c3d-a702-94eec4a2808c
    dateFrom: new Date('2019-07-10T22:55:56.845Z'),
    dateTo: new Date('2019-07-11T11:22:13.375Z'),
    type: 'taxi',
    destination: 'geneva', //bfa5cb75-a1fe-4b77-a83c-0e528e910e04
    basePrice: 20,
    offers: [
      'taxi1',
      'taxi3',
      'taxi4'
    ],
    isFavorite: true,
  },
  {
    id: '2', //f4b62099-293f-4c3d-a702-94eec4a2808c
    dateFrom: new Date('2019-07-10T22:55:56.845Z'),
    dateTo: new Date('2019-07-11T11:22:13.375Z'),
    type: 'bus',
    destination: 'amsterdam', //bfa5cb75-a1fe-4b77-a83c-0e528e910e04v
    basePrice: 600,
    offers: [
      'bus2',
      'bus4',
      'bus5'
    ],
    isFavorite: false,
  },
  {
    id: '3', //f4b62099-293f-4c3d-a702-94eec4a2808c
    dateFrom: new Date('2019-07-10T22:55:56.845Z'),
    dateTo: new Date('2019-07-11T11:22:13.375Z'),
    type: 'flight',
    destination: 'chamonix', //bfa5cb75-a1fe-4b77-a83c-0e528e910e04
    basePrice: 180,
    offers: [
      'flight1'
    ],
    isFavorite: false,
  },
  {
    id: '4', //f4b62099-293f-4c3d-a702-94eec4a2808c
    dateFrom: new Date('2019-07-10T22:55:56.845Z'),
    dateTo: new Date('2019-07-11T11:22:13.375Z'),
    type: 'ship',
    destination: 'geneva', //bfa5cb75-a1fe-4b77-a83c-0e528e910e04
    basePrice: 135,
    offers: [],
    isFavorite: true,
  }
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export {getRandomPoint};
