import AbstractView from '../framework/view/abstract-view.js';
import {filterObject} from '../utils/filter.js';

function createFilterElementTemplate(filter, currentFilterType, points) {
  const {type} = filter;
  const filtredPoints = filterObject[type](points);

  return (
    `<div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilterType ? 'checked' : ''} ${filtredPoints.length === 0 ? 'disabled' : ''}>
    <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
  </div>`
  );
}

function createFilterTemplate(filterItems, currentFilterType, points) {
  return (`<form class="trip-filters" action="#" method="get">
  ${filterItems.map((filter) => createFilterElementTemplate(filter, currentFilterType, points)).join('')}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`);
}

export default class FilterView extends AbstractView {
  #filters = null;
  #points = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, points, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#points = points;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter, this.#points);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
