import AbstractView from '../framework/view/abstract-view.js';
import {humanizePointDate, humanizePointHour, getDifferenceDate, getPointTypeOffer, getDestinationById} from '../utils/point.js';

function createRoutePointTemplate(point, dataOffers, dataDestinations) {
  const {dateFrom, dateTo, type, basePrice, isFavorite, offers} = point;

  const destinationById = getDestinationById(dataDestinations, point);
  const pointTypeOffer = getPointTypeOffer(dataOffers, point);

  const dateEvent = humanizePointDate(dateFrom);
  const hourBeginEvent = humanizePointHour(dateFrom);
  const hourEndEvent = humanizePointHour(dateTo);
  const difHours = getDifferenceDate(dateFrom, dateTo);

  const favoriteClassName = isFavorite ? 'event__favorite-btn--active' : '';

  return (`<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dateEvent}">${dateEvent}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event ${type} icon">
      </div>
      <h3 class="event__title">${type} ${destinationById ? destinationById.name : ''}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${hourBeginEvent}">${hourBeginEvent}</time>
          &mdash;
          <time class="event__end-time" datetime="${hourEndEvent}">${hourEndEvent}</time>
        </p>
        <p class="event__duration">${difHours}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${pointTypeOffer.offers.map((item)=>{
      const userOffer = offers.includes(item.id) ?
        `<li class="event__offer">
        <span class="event__offer-title">${item.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${item.price}</span>
        </li>` : '';
      return userOffer;
    }).join('')}
      </ul>
      <button class="event__favorite-btn ${favoriteClassName}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`);
}

export default class RoutePointView extends AbstractView {
  #point = null;
  #dataOffers = null;
  #dataDestinations = null;
  #handleEditClick = null;
  #handleFavoriteClick = null;

  constructor({point, dataOffers, dataDestinations, onEditClick, onFavoriteClick}) {
    super();
    this.#point = point;
    this.#dataOffers = dataOffers;
    this.#dataDestinations = dataDestinations;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createRoutePointTemplate(this.#point, this.#dataOffers, this.#dataDestinations);
  }

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
