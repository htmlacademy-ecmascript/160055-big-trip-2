import AbstractView from '../framework/view/abstract-view.js';
import {DEFAULT_SORT_NAME} from '../const.js';

function createSortElementTemplate(sort) {
  const {type, isEnable} = sort;

  return (
    `<div class="trip-sort__item  trip-sort__item--${type}">
    <input id="sort-${type}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${type}" ${isEnable ? '' : 'disabled'} ${type === DEFAULT_SORT_NAME ? 'checked' : ''}>
    <label class="trip-sort__btn" for="sort-${type}" data-sort-type="${type}">${type}</label>
  </div>`
  );
}

function createSortTemplate(sortItems) {
  return (`<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${sortItems.map((sort) => createSortElementTemplate(sort)).join('')}
</form>`);
}

export default class SortView extends AbstractView {
  #sorts = [];
  #onSortTypeChange = null;

  constructor({sorts, onSortTypeChange}) {
    super();
    this.#sorts = sorts;
    this.#onSortTypeChange = onSortTypeChange;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#sorts);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    evt.preventDefault();
    this.#onSortTypeChange(evt.target.dataset.sortType);
  };
}
