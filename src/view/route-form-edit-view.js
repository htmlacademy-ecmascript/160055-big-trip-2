import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {capitalize, humanizeFormPointDate} from '../utils/point.js';
import {mockOffers} from '../mock/offers.js';
import {mockDestinations} from '../mock/destinations.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

function getTypesList({type}) {
  return (
    `<div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${capitalize(type)}</label>
    </div>`
  );
}

function getDestinationName(destination) {
  const {name} = destination;
  return (`
    <option value="${name}"></option>
    `);
}

function getTemplateOffers({offers}, checkedOffers) {
  const getOffersList = ({id, title, price}) => {
    const isChecked = checkedOffers.map((item) => item.id).includes(id) ? 'checked' : '';
    return (
      `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden" data-offer-id="${id}" id="event-offer-${id}" type="checkbox" name="event-offer-${id}" ${isChecked}>
          <label class="event__offer-label" for="event-offer-${id}">
            <span class="event__offer-title">${title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${price}</span>
          </label>
        </div>`
    );
  };

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

function createFormEditRouteTemplate(state, offers, checkedOffers, destination) {
  const {id, dateFrom, type, basePrice, dateTo} = state;
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
                ${offers.length !== 0 ? getTemplateOffers(offers, checkedOffers) : ''}
                ${getDestinationOptionsTemplate(destination)}
              </section>
            </form>
          </li>`);
}

export default class RouteFormEditView extends AbstractStatefulView {
  #offers = null;
  #checkedOffers = null;
  #destination = null;
  #handleFormSubmit = null;
  #pointsModel = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({point, offers, checkedOffers, destination, onFormSubmit = () => {}, pointsModel}) {
    super();
    this.#offers = offers;
    this.#checkedOffers = checkedOffers;
    this.#destination = destination;
    this.#handleFormSubmit = onFormSubmit;
    this.#pointsModel = pointsModel;

    this._setState(RouteFormEditView.parsePointToState(point));
    this._restoreHandlers();
  }

  _restoreHandlers = () => {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#formSubmitHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers').addEventListener('change', this.#offerChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);

    this.#setDatepickers();
  };

  get template() {
    return createFormEditRouteTemplate(this._state, this.#offers, this.#checkedOffers, this.#destination);
  }

  reset(point) {
    this.updateElement(RouteFormEditView.parsePointToState(point));
  }

  removeElement = () => {
    super.removeElement();

    if(this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if(this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(RouteFormEditView.parseStateToPoint(this._state));
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    // console.log(this._state);
    this.updateElement(this.#pointsModel.getOffersByType(evt.target.value), this.#checkedOffers = []);
    // console.log(this.#pointsModel.getOffersByType(evt.target.value));
    // console.log(this._state);
  };

  #destinationChangeHandler = (evt) => {
    const selectedDestination = this.#pointsModel.getDestinationByTargetName(evt.target.value);
    const selectedDestinationName = selectedDestination ? selectedDestination.id : null;
    this.updateElement({destination: selectedDestinationName ? selectedDestinationName : ''});
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({offers: checkedOffers.map((offer) => offer.dataset.offerId)});
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({basePrice: Number(evt.target.value)});
  };

  #dateFromCloseHandler = (userDate) => {
    this._setState({dateFrom: userDate});
    this.#datepickerTo.set('minDate', this._state.dateFrom);
  };

  #dateToCloseHandler = (userDate) => {
    this._setState({dateTo: userDate});
    this.#datepickerTo.set('maxDate', this._state.dateTo);
  };

  #setDatepickers = () => {
    const [dateFromElement, dateToElement] = this.element.querySelectorAll('.event__input--time');
    const commonConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {firstDayOfWeek: 1},
      'time_24hr': true
    };

    this.#datepickerFrom = flatpickr(
      dateFromElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateFromCloseHandler,
        maxDate: this._state.dateTo
      }
    );

    this.#datepickerTo = flatpickr(
      dateToElement,
      {
        ...commonConfig,
        defaultDate: this._state.dateFrom,
        onClose: this.#dateToCloseHandler,
        maxDate: this._state.dateTo
      }
    );
  };

  static parsePointToState(point) {
    return {...point};
  }

  static parseStateToPoint(state) {
    return {...state};
  }
}
