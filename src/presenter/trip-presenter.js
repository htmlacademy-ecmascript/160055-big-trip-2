import PointsListView from '../view/points-list-view.js';
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import {render, remove} from '../framework/render.js';

import PointPresenter from './point-presenter.js';
import FilterPresenter from './filter-presenter.js';
import AddPointPresenter from './add-point-presenter.js';

import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {sortByDay, sortByTime, sortByPrice} from '../utils/point.js';
import {filter} from '../utils/filter.js';

export default class TripPresenter {
  #pointsModel = null;
  #filterModel = null;
  #main = null;
  #tripMain = null;
  #filterContainer = null;
  #tripEventsContainer = null;
  #pointListComponent = new PointsListView();
  #sortComponent = null;
  #emptyListComponent = null;

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #addPointPresenter = null;

  #offers = [];
  #destinations = [];

  constructor({main, pointsModel, tripMain, filterModel, onNewPointDestroy}) {
    this.#main = main;
    this.#tripMain = tripMain;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#filterContainer = this.#tripMain.querySelector('.trip-controls__filters');
    this.#tripEventsContainer = this.#main.querySelector('.trip-events');

    this.#addPointPresenter = new AddPointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data, this.#offers, this.#destinations);
        break;
      case UpdateType.MINOR:
        this.#clearTripBoard({resetSortType: true});
        this.#renderSort();
        this.#renderPointList();
        break;
      case UpdateType.MAJOR:
        this.#clearTripBoard({resetSortType: true});
        this.#renderSort();
        this.#renderPointList();
        break;
    }
  };

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }
    return filteredPoints.sort(sortByDay);
  }

  init() {
    this.#offers = [...this.#pointsModel.offers];
    this.#destinations = [...this.#pointsModel.destinations];

    this.#renderFilter();
    this.#renderSort();
    this.#renderPointList();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#addPointPresenter.init(this.#offers, this.#destinations);
  }

  #renderPoint(point, dataOffers, dataDestinations) {
    const pointPresenter = new PointPresenter({
      pointListContainer: this.#pointListComponent.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point, dataOffers, dataDestinations);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderPoints(points) {
    points.forEach((point)=> this.#renderPoint(point, this.#offers, this.#destinations));
  }

  #handleModeChange = () => {
    this.#addPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  // #handlePointChange = (updatedPoint) => {
  //   this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.#offers, this.#destinations);
  // };

  // #clearPointList() {
  //   this.#pointPresenters.forEach((presenter) => presenter.destroy());
  //   this.#pointPresenters.clear();
  // }

  #renderSort() {
    this.#sortComponent = new SortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange});
    render(this.#sortComponent, this.#tripEventsContainer);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTripBoard();
    this.#renderSort();
    this.#renderPointList();
  };

  #renderFilter() {
    const filterPresenter = new FilterPresenter({
      filterContainer: this.#filterContainer,
      filterModel: this.#filterModel,
      pointsModel: this.#pointsModel,
    });
    filterPresenter.init();
  }

  #renderEmptyList() {
    this.#emptyListComponent = new NoPointView({
      filterType: this.#filterType
    });

    render(this.#emptyListComponent, this.#tripEventsContainer);
  }

  #renderPointList() {
    const points = this.points.slice(0, this.points.length);

    render(this.#pointListComponent, this.#tripEventsContainer);
    if (this.points.length === 0) {
      this.#renderEmptyList();
      return;
    }
    this.#renderPoints(points);
  }

  #clearTripBoard({resetSortType = false} = {}) {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    this.#addPointPresenter.destroy();

    remove(this.#sortComponent);

    if (this.#emptyListComponent) {
      remove(this.#emptyListComponent);
    }


    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

}
