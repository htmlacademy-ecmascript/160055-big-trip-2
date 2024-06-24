import {getRandomPoint} from '../mock/points.js';
import {mockOffers} from '../mock/offers.js';
import {mockDestinations} from '../mock/destinations.js';
import {POINTS_COUNT} from '../const.js';


export default class PointsModel {
  #points = Array.from({length: POINTS_COUNT}, getRandomPoint);
  #offers = mockOffers;
  #destinations = mockDestinations;

  get points() {
    return this.#points;
  }

  get offers() {
    return this.#offers;
  }

  getOffersByType(type) {
    const offersArray = this.#offers;
    return offersArray.find((offer) => offer.type === type);
  }

  getOffersById(type, itemsId) {
    const offersType = this.getOffersByType(type);
    return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
  }

  get destinations() {
    return this.#destinations;
  }

  getDestinationsById(id) {
    const destinationArray = this.destinations;
    return destinationArray.find((item) => item.id === id);
  }

  getDestinationByTargetName(name) {
    const destinationArray = this.destinations;
    return destinationArray.find((item) => item.name === name);
  }
}
