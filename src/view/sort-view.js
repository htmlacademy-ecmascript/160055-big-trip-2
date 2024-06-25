import AbstractView from '../framework/view/abstract-view.js';
import {SORTS} from '../const.js';

function createSortElementTemplate(sort) {

  const disable = (sort === 'event' || sort === 'offers') ? 'disabled' : '';
  return (
    `<div class="trip-sort__item  trip-sort__item--${sort}">
      <input data-sort-type="${sort}" id="sort-${sort}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${sort}" ${disable}>
      <label class="trip-sort__btn" for="sort-${sort}">${sort}</label>
    </div>`
  );
}

function createSortTemplate() {
  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${SORTS.map((sortItem) => createSortElementTemplate(sortItem)).join('')}
</form>`);
}

export default class SortView extends AbstractView {
  #onSortTypeChange = null;

  constructor({onSortTypeChange}) {
    super();
    this.#onSortTypeChange = onSortTypeChange;

    const sortLabel = this.element.querySelectorAll('.trip-sort__input');
    sortLabel.forEach((label) => {
      label.addEventListener('click', this.#sortTypeChangeHandler);
    });
  }

  get template() {
    return createSortTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    // if (evt.target.tagName !== 'INPUT') {
    //   return;
    // }
    this.#onSortTypeChange(evt.target.dataset.sortType);
  };
}
