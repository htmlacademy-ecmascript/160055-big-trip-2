import AbstractView from '../framework/view/abstract-view.js';
import {SORTS} from '../const.js';

function createSortElementTemplate(sortType, currentSortType) {

  const disable = (sortType === 'event' || sortType === 'offers') ? 'disabled' : '';
  return (
    `<div class="trip-sort__item  trip-sort__item--${sortType}">
      <input data-sort-type="${sortType}" id="sort-${sortType}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sortType}" ${disable}${sortType === currentSortType ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-${sortType}">${sortType}</label>
    </div>`
  );
}

function createSortTemplate(currentSortType) {
  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${SORTS.map((sortItem) => createSortElementTemplate(sortItem, currentSortType)).join('')}
</form>`);
}

export default class SortView extends AbstractView {
  #onSortTypeChange = null;
  #currentSortType = null;

  constructor({currentSortType, onSortTypeChange}) {
    super();
    this.#currentSortType = currentSortType;
    this.#onSortTypeChange = onSortTypeChange;

    const sortLabel = this.element.querySelectorAll('.trip-sort__input');
    sortLabel.forEach((label) => {
      label.addEventListener('click', this.#sortTypeChangeHandler);
    });
  }

  get template() {
    return createSortTemplate(this.#currentSortType);
  }

  #sortTypeChangeHandler = (evt) => {
    this.#onSortTypeChange(evt.target.dataset.sortType);
  };
}
