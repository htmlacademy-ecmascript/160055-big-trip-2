import {getRandomArrayElement} from '../utils/common.js';
import {mockOffers} from '../mock/offers.js';
import {mockPoints} from '../mock/points.js';
import {mockDestinations} from '../mock/destinations.js';
import {POINTS_COUNT} from '../const.js';
import {nanoid} from 'nanoid';

function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints)
  };
}
export default class PointsModel {
  #points = Array.from({length: POINTS_COUNT}, getRandomPoint);
  #dataOffers = mockOffers;
  #destinations = mockDestinations;

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#dataOffers;
  }

  get destinations() {
    return this.#destinations;
  }
}
