import AbstractView from '../framework/view/abstract-view.js';

function createFilterElementTemplate(filter, currentFilterType) {
  const {type} = filter;

  return (
    `<div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilterType ? 'checked' : ''}>
    <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
  </div>`
  );
}

function createFilterTemplate(filterItems, currentFilterType) {
  return (`<form class="trip-filters" action="#" method="get">
  ${filterItems.map((filter) => createFilterElementTemplate(filter, currentFilterType)).join('')}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`);
}

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({filters, currentFilterType, onFilterTypeChange}) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
