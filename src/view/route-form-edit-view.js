import RouteFormView from '../view/route-form-view.js';
import {getDestinationByTargetName} from '../utils/point.js';
import {BLANK_POINT} from '../const.js';

import dayjs from 'dayjs';
// eslint-disable-next-line no-undef
const utc = require('dayjs/plugin/utc');
dayjs.extend(utc);
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
export default class RouteFormEditView extends RouteFormView {
  _handleEditFormButtonClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;
  #handleDeleteClick = null;

  constructor({point = BLANK_POINT, dataOffers, dataDestinations, isAddPoint, onFormSubmit, onEditFormButtonClick, onDeleteClick}) {
    super({point, dataOffers, dataDestinations, isAddPoint, onFormSubmit});

    this._setState(RouteFormEditView.parsePointToState(point));
    this._handleEditFormButtonClick = onEditFormButtonClick;
    this.#handleDeleteClick = onDeleteClick;
    this._restoreHandlers();
  }

  _restoreHandlers = () => {
    this.element.addEventListener('submit', this._formSubmitHandler);
    if(this.element.querySelector('.event__rollup-btn')){
      this.element.querySelector('.event__rollup-btn')
        .addEventListener('click', this._formSubmitHandler);
    }
    this.element.querySelectorAll('.event__type-input').forEach((type)=> type.addEventListener('click',this.#typeChangeHandler));
    this.element.querySelectorAll('.event__offer-checkbox').forEach((checkbox)=> checkbox.addEventListener('change', this.#offerChangeHandler));
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);

    this.#setDatepicker();
  };

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

  _editFormButtonHandler = (evt) => {
    evt.preventDefault();
    this._handleEditFormButtonClick();
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destinationId = getDestinationByTargetName(this._dataDestinations, evt.target.value).id;
    this.updateElement({
      destination: destinationId ? destinationId : ''
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const checkedOffers = Array.from(this.element.querySelectorAll('.event__offer-checkbox:checked'));
    this._setState({offers: checkedOffers.map((offer) => offer.dataset.offerId)});
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.value
    });
  };

  #dateChangeHandler = ([userDateFrom]) => {
    this.updateElement({
      dateFrom: dayjs(userDateFrom).toISOString(),
      dateTo: dayjs(userDateFrom).toISOString(),
    });
  };

  #dateToChangeHandler = ([userDateTo]) => {
    this.updateElement({
      dateTo: dayjs(userDateTo).toISOString(),
    });
  };

  #setDatepicker() {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('[name="event-start-time"]'),
      {
        dateFormat: 'j/m/y H:i',
        enableTime: true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateChangeHandler,
      },
    );
    this.#datepickerTo = flatpickr(
      this.element.querySelector('[name="event-end-time"]'),
      {
        dateFormat: 'j/m/y H:i',
        enableTime: true,
        defaultDate: this._state.dateTo,
        minDate: this._state.dateFrom,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(RouteFormEditView.parseStateToPoint(this._state));
  };
}
