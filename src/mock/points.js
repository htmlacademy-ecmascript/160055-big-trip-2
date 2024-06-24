import {nanoid} from 'nanoid';
import {getRandomArrayElement} from '../utils/common.js';

const mockPoints = [
  {
    id: '1',
    dateFrom: new Date('2024-12-25T18:30:45.123Z'),
    dateTo: new Date('2024-12-25T18:45:30.987Z'),
    type: 'taxi',
    destination: 'Geneva',
    basePrice: 20,
    offers: [
      'taxi1',
      'taxi3',
      'taxi4'
    ],
    isFavorite: true,
  },
  {
    id: '2',
    dateFrom: new Date('2024-07-10T22:55:56.845Z'),
    dateTo: new Date('2024-07-11T01:30:45.123Z'),
    type: 'bus',
    destination: 'Amsterdam',
    basePrice: 600,
    offers: [
      'bus2',
      'bus4',
      'bus5'
    ],
    isFavorite: false,
  },
  {
    id: '3',
    dateFrom: new Date('2024-09-12T18:20:30.500Z'),
    dateTo: new Date('2024-09-13T09:45:15.999Z'),
    type: 'flight',
    destination: 'Chamonix',
    basePrice: 180,
    offers: [
      'flight1'
    ],
    isFavorite: false,
  },
  {
    id: '4',
    dateFrom: new Date('2024-10-14T14:30:00.123Z'),
    dateTo: new Date('2024-10-15T08:00:45.678Z'),
    type: 'ship',
    destination: 'Geneva',
    basePrice: 135,
    offers: [],
    isFavorite: true,
  },
  {
    id: '5',
    dateFrom: new Date('2024-03-14T10:30:00.123Z'),
    dateTo: new Date('2024-03-15T08:24:45.678Z'),
    type: 'flight',
    destination: 'Geneva',
    basePrice: 430,
    offers: [
      'flight1'
    ],
    isFavorite: true,
  }
];

function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints)
  };
}

export {getRandomPoint};
