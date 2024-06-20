import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {capitalize, humanizeFormPointDate} from '../utils/point.js';
import {mockOffers} from '../mock/offers.js';
import {mockDestinations} from '../mock/destinations.js';

function getTypesList({type, id}) {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${capitalize(type)}</label>
    </div>`
  );
}

function getDestinationName(destination) {
  const {name} = destination;
  return (`
    <option value="${name}"></option>
    `);
}

function getOffersList(offers, checkedOffers) {
  const {id, title, price} = offers;
  const isChecked = checkedOffers.map((item) => item.id).includes(id) ? 'checked' : '';
  return (
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" data-offer-id="${id}" id="${id}" type="checkbox" name="event-offer-luggage" ${isChecked}>
        <label class="event__offer-label" for="event-offer-luggage-${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`
  );
}

function getTemplateOffers({offers}, checkedOffers) {
  return (`
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${offers.map((offer) => getOffersList(offer, checkedOffers)).join('')}
    </div>
  </section>
  `);
}

function getDestinationOptionsTemplate(destination) {
  if (!destination) {
    return;
  }
  const {description} = destination;
  return (`<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
          </section>
          `);
}

function createFormEditRouteTemplate({point}, offers, checkedOffers, destination) {

  const {id, dateFrom, type, basePrice, dateTo} = point;
  const {name} = destination;
  const dateBegin = humanizeFormPointDate(dateFrom);
  const dateEnd = humanizeFormPointDate(dateTo);
  return (`<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
              <header class="event__header">
                <div class="event__type-wrapper">
                  <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
                    <span class="visually-hidden">Choose event type</span>
                    <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                  </label>
                  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">

                  <div class="event__type-list">
                    <fieldset class="event__type-group">
                      <legend class="visually-hidden">Event type</legend>
                      ${mockOffers.map((types) => getTypesList(types)).join('')}
                    </fieldset>
                  </div>
                </div>

                <div class="event__field-group  event__field-group--destination">
                  <label class="event__label  event__type-output" for="event-destination-${id}">
                    ${type}
                  </label>
                  <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${name}" list="destination-list-${id}">
                  <datalist id="destination-list-${id}">
                  ${mockDestinations.map((item) => getDestinationName(item)).join('')}
                  </datalist>
                </div>

                <div class="event__field-group  event__field-group--time">
                  <label class="visually-hidden" for="event-start-time-${id}">From</label>
                  <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${dateBegin}">
                  &mdash;
                  <label class="visually-hidden" for="event-end-time-${id}">To</label>
                  <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${dateEnd}">
                </div>

                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-${id}">
                    <span class="visually-hidden">Price</span>
                    &euro;
                  </label>
                  <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${basePrice}">
                </div>

                <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                <button class="event__reset-btn" type="reset">Delete</button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </header>
              <section class="event__details">
                ${getTemplateOffers(offers, checkedOffers)}
                ${getDestinationOptionsTemplate(destination)}
              </section>
            </form>
          </li>`);
}

export default class RouteFormEditView extends AbstractStatefulView {
  #offers = null;
  #checkedOffers = null;
  #destination = null;
  #destinations = null;
  #handleFormSubmit = null;

  constructor({point, offers, checkedOffers, destination, destinations, onFormSubmit = () => {}}) {
    super();
    this.#offers = offers;
    this.#checkedOffers = checkedOffers;
    this.#destination = destination;
    this.#destinations = destinations;
    this.#handleFormSubmit = onFormSubmit;

    this._setState(RouteFormEditView.parsePointToState({point}));
    this._restoreHandlers();
  }

  _restoreHandlers = () => {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler);
    this.element.querySelectorAll('.event__type-input').forEach((type) => {
      type.addEventListener('click', this.#typeChangeHandler);
    });
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelectorAll('.event__offer-checkbox').forEach((checkbox) => {
      checkbox.addEventListener('change', this.#offerChangeHandler);
    });
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
  };

  get template() {
    return createFormEditRouteTemplate(this._state, this.#offers, this.#checkedOffers, this.#destination, this.#destinations);
  }

  reset(point) {
    this.updateElement(RouteFormEditView.parsePointToState({point}));
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(RouteFormEditView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({point: {...this._state.point, type: evt.target.value, offers: []}});
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#destinations.find((pointDestination) => pointDestination.name === evt.target.value);
    const selectedDestinationId = (selectedDestination) ? selectedDestination.id : null;
    this.updateElement({point: {...this._state.point, destination: selectedDestinationId}});
  };

  #offerChangeHandler = () => {
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));

    this._setState({point: {...this._state.point, offers: checkedOffers.map((offer) => offer.dataset.offerId)}});
  };

  #priceChangeHandler = (evt) => {
    this._setState({point: {...this._state.point, basePrice: Number(evt.target.value)}});
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint = (state) => state.point;
}
