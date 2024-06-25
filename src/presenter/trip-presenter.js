import TripInfoView from '../view/trip-info-view.js';
import PointsListView from '../view/points-list-view.js';
import NoPointView from '../view/no-point-view.js';
import {RenderPosition, render} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';
import SortView from '../view/sort-view.js';
import FilterView from '../view/filter-view.js';
import {SortType} from '../const.js';
import {sortByDay, sortByTime, sortByPrice} from '../utils/point.js';
import {generateFilter} from '../utils/filter.js';

const siteHeaderElement = document.querySelector('.page-header__container');
const siteHeaderInfoElement = siteHeaderElement.querySelector('.trip-main');

export default class TripPresenter {
  #pointsModel = null;
  #main = null;
  #tripMain = null;
  #filterContainer = null;
  #tripEventsContainer = null;
  #pointListComponent = new PointsListView();
  #sortComponent = null;
  #filterComponent = null;
  #emptyListComponent = new NoPointView();

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;

  #tripPoints = [];
  #sourcedTripPoints = [];
  #offers = [];
  #destinations = [];

  constructor({main, pointsModel, tripMain}) {
    this.#main = main;
    this.#tripMain = tripMain;
    this.#pointsModel = pointsModel;
    this.#filterContainer = this.#tripMain.querySelector('.trip-controls__filters');
    this.#tripEventsContainer = this.#main.querySelector('.trip-events');
  }

  init() {
    this.#tripPoints = [...this.#pointsModel.points].sort(sortByDay);
    this.#offers = [...this.#pointsModel.offers];
    this.#destinations = [...this.#pointsModel.destinations];

    this.#sourcedTripPoints = [...this.#pointsModel.points].sort(sortByDay);
    render(new TripInfoView(), siteHeaderInfoElement, RenderPosition.AFTERBEGIN);
    this.#renderFilter();
    this.#renderSort();
    this.#renderPointList();
  }

  #renderPoint(point, dataOffers, destination) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point, dataOffers, destination);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints(from, to) {
    this.#tripPoints.slice(from, to).forEach((point)=> this.#renderPoint(point, this.#offers, this.#destinations));
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#tripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#sourcedTripPoints = updateItem(this.#tripPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#offers, this.#destinations);
  };

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderSort() {
    this.#sortComponent = new SortView({onSortTypeChange: this.#handleSortTypeChange});
    render(this.#sortComponent, this.#tripEventsContainer);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#tripPoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#tripPoints.sort(sortByPrice);
        break;
      case SortType.DAY:
        this.#tripPoints = [...this.#sourcedTripPoints];
    }

    this.#currentSortType = sortType;
  }

  #renderFilter() {
    const filters = generateFilter(this.#tripPoints);
    this.#filterComponent = new FilterView({filters});
    render(this.#filterComponent, this.#filterContainer);
  }

  #renderEmptyList() {
    render(this.#emptyListComponent, this.#tripEventsContainer);
  }

  #renderPointList() {
    render(this.#pointListComponent, this.#tripEventsContainer);
    if (this.#tripPoints.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderPoints(0, this.#tripPoints.length);
  }

}
