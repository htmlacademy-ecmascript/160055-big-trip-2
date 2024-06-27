import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeFormPointDate, getPointTypeOffer, getDestinationById} from '../utils/point.js';
import {TYPES, CITIES} from '../const.js';
import he from 'he';

function getTypesList(type, id) {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${type}</label>
    </div>`
  );
}

function createOffersSelectorTemplate(dataOffers, point, isAddPoint) {
  const {offers} = point;
  const pointTypeOffer = getPointTypeOffer(dataOffers, point);
  if(isAddPoint) {
    return (
      pointTypeOffer.offers.length !== 0 ?
        `<section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">
    ${pointTypeOffer.offers.map((item, index)=>
        `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="event-offer-${pointTypeOffer.type}-${index}" type="checkbox" name="event-offer-${pointTypeOffer.type}">
    <label class="event__offer-label" for="event-offer-${pointTypeOffer.type}-${index}">
      <span class="event__offer-title">${item.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${item.price}</span>
    </label>
  </div>`).join('')}
    </div>
  </section>` : ''
    );
  } else {
    return (
      pointTypeOffer.offers.length !== 0 ?
        `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
      ${pointTypeOffer.offers.map((item, index)=> {
        const checkedOffers = offers.includes(item.id) ? 'checked' : '';
        return (`<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden"  data-offer-id="${item.id}" id="event-offer-${pointTypeOffer.type}-${index}" type="checkbox" name="event-offer-${pointTypeOffer.type}"
          ${checkedOffers}>
          <label class="event__offer-label" for="event-offer-${pointTypeOffer.type}-${index}">
            <span class="event__offer-title">${item.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${item.price}</span>
          </label>
        </div>`);
      }
      ).join('')}
    </div>
  </section>` : ''
    );
  }
}

function createDestinationSelectorTemplate(destination, point) {
  const destinationById = getDestinationById(destination, point);

  return (
    destinationById.description || destinationById.pictures ?
      `<section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${destinationById.description}</p>
    <div class="event__photos-container">
      <div class="event__photos-tape">
      ${destinationById.pictures.map((item)=>
      `<img class="event__photo" src=${item.src} alt="Event photo">`).join('')}
      </div>
    </div>
  </section>` : ''
  );
}

function createEditPointFormTemplate(point, dataOffers, destination, isAddPoint) {
  const {dateFrom, type, basePrice, dateTo} = point;
  const destinationById = getDestinationById(destination, point);
  const dateBegin = humanizeFormPointDate(dateFrom);
  const dateEnd = humanizeFormPointDate(dateTo);
  return (`<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
              <header class="event__header">
                <div class="event__type-wrapper">
                  <label class="event__type  event__type-btn" for="event-type-toggle-${point.id}">
                    <span class="visually-hidden">Choose event type</span>
                    <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                  </label>
                  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${point.id}" type="checkbox">

                  <div class="event__type-list">
                    <fieldset class="event__type-group">
                      <legend class="visually-hidden">Event type</legend>
                      ${TYPES.map((types) => getTypesList(types, point.id)).join('')}
                    </fieldset>
                  </div>
                </div>

                <div class="event__field-group  event__field-group--destination">
                  <label class="event__label  event__type-output" for="event-destination-${point.id}">
                    ${type}
                  </label>
                  <input class="event__input  event__input--destination" id="event-destination-${point.id}" type="text" name="event-destination" value="${destinationById ? he.encode(destinationById.name) : ''}" list="destination-list-${point.id}">
                  <datalist id="destination-list-${point.id}">
                  ${CITIES.map((item) => `<option value="${item}"></option>`).join('')}
                  </datalist>
                </div>

                <div class="event__field-group  event__field-group--time">
                  <label class="visually-hidden" for="event-start-time-${point.id}">From</label>
                  <input class="event__input  event__input--time" id="event-start-time-${point.id}" type="text" name="event-start-time" value="${dateBegin}">
                  &mdash;
                  <label class="visually-hidden" for="event-end-time-${point.id}">To</label>
                  <input class="event__input  event__input--time" id="event-end-time-${point.id}" type="text" name="event-end-time" value="${dateEnd}">
                </div>

                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-${point.id}">
                    <span class="visually-hidden">Price</span>
                    &euro;
                  </label>
                  <input class="event__input  event__input--price" id="event-price-${point.id}" type="text" name="event-price" value="${basePrice}">
                </div>

                <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                <button class="event__reset-btn" type="reset">Delete</button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </header>
              <section class="event__details">
                ${createOffersSelectorTemplate(dataOffers, point, isAddPoint)}
                ${createDestinationSelectorTemplate(destination, point)}
              </section>
            </form>
          </li>`);
}

export default class RouteFormView extends AbstractStatefulView {
  _dataOffers = null;
  _destination = null;
  _handleFormSubmit = null;
  _isAddPoint = false;

  constructor({point, dataOffers, destination, isAddPoint, onFormSubmit}) {
    super();
    this._dataOffers = dataOffers;
    this._destination = destination;
    this._isAddPoint = isAddPoint;

    this._setState(RouteFormView.parsePointToState(point));
    this._handleFormSubmit = onFormSubmit;
    this.element.addEventListener('submit', this._formSubmitHandler);
  }

  _formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._handleFormSubmit(RouteFormView.parseStateToPoint(this._state));
  };

  get template() {
    return createEditPointFormTemplate(this._state, this._dataOffers, this._destination, this._isAddPoint);
  }

  reset(point) {
    this.updateElement(RouteFormView.parsePointToState(point));
  }

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    const point = {...state};
    return point;
  }
}

export {createOffersSelectorTemplate, createDestinationSelectorTemplate};
