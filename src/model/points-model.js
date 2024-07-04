import Observable from '../framework/observable.js';
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
export default class PointsModel extends Observable {
  #points = Array.from({length: POINTS_COUNT}, getRandomPoint);
  #dataOffers = mockOffers;
  #dataDestinations = mockDestinations;

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#dataOffers;
  }

  get destinations() {
    return this.#dataDestinations;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
