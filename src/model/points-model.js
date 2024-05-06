import {getRandomPoint} from '../mock/points.js';
import {mockOffers} from '../mock/offers.js';
import {mockDestinations} from '../mock/destinations.js';
import {POINTS_COUNT} from '../const.js';


export default class PointsModel {
  points = Array.from({length: POINTS_COUNT}, getRandomPoint);
  offers = mockOffers;
  destinations = mockDestinations;

  getPoints() {
    return this.points;
  }

  getOffers() {
    return this.offers;
  }

  getOffersByType(type) {
    const offersArray = this.getOffers();
    return offersArray.find((offer) => offer.type === type);
  }

  getOffersById(type, itemsId) {
    const offersType = this.getOffersByType(type);
    return offersType.offers.filter((item) => itemsId.find((id) => item.id === id));
  }

  getDestinations() {
    return this.destinations;
  }

  getDestinationsById(id) {
    const destinationArray = this.getDestinations();
    return destinationArray.find((item) => item.id === id);
  }
}
