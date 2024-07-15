import PointsListView from '../view/points-list-view.js';
import NoPointView from '../view/no-point-view.js';
import SortView from '../view/sort-view.js';
import LoadingView from '../view/loading-view.js';
import FailedLoadView from '../view/failed-load-view.js';

import {render, remove} from '../framework/render.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

import PointPresenter from './point-presenter.js';
import FilterPresenter from './filter-presenter.js';
import AddPointPresenter from './add-point-presenter.js';
import InfoTripPresenter from './info-trip-presenter.js';

import {SortType, UpdateType, UserAction, FilterType} from '../const.js';
import {sortByDay, sortByTime, sortByPrice} from '../utils/point.js';
import {filterObject} from '../utils/filter.js';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};
export default class TripPresenter {
  #pointsModel = null;
  #filterModel = null;
  #main = null;
  #tripMain = null;
  #filterContainer = null;
  #tripEventsContainer = null;
  #pointListComponent = new PointsListView();
  #failedComponent = new FailedLoadView();
  #infoTripPresenter = null;
  #loadingComponent = new LoadingView();
  #sortComponent = null;
  #emptyListComponent = null;

  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #addPointPresenter = null;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

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

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#addPointPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch(err) {
          this.#addPointPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch(err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(data.id).init(data, this.offers, this.destinations);
        this.#infoTripPresenter.destroy();
        this.#renderInfoTrip();
        break;
      case UpdateType.MINOR:
        this.#clearTripBoard({resetSortType: true});
        this.#renderSort();
        this.#renderInfoTrip();
        this.#renderPointList();
        break;
      case UpdateType.MAJOR:
        this.#clearTripBoard({resetSortType: true});
        this.#renderSort();
        this.#renderInfoTrip();
        this.#renderPointList();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderInfoTrip();
        this.#renderPointList();
        break;
    }
  };

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filterObject[this.#filterType](points);
    const defaultSortedPoints = filteredPoints.sort(sortByDay);

    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }
    return defaultSortedPoints;
  }

  get offers () {
    const offers = this.#pointsModel.offers;
    return offers;
  }

  get destinations () {
    const destinations = this.#pointsModel.destinations;
    return destinations;
  }

  init() {
    this.#renderFilter();
    this.#renderSort();
    this.#renderPointList();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#addPointPresenter.init(this.offers, this.destinations);
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
    points.forEach((point)=> this.#renderPoint(point, this.offers, this.destinations));
  }

  #renderInfoTrip() {
    this.#infoTripPresenter = new InfoTripPresenter({
      tripMainElement: this.#tripMain,
    });
    this.#infoTripPresenter.init(this.#pointsModel.points, this.offers, this.destinations);
  }

  #handleModeChange = () => {
    this.#addPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

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
    this.#renderInfoTrip();
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

  #renderLoading() {
    render(this.#loadingComponent, this.#tripEventsContainer);
  }

  #renderFailedLoad() {
    render(this.#failedComponent, this.#tripEventsContainer);
  }

  #renderPointList() {
    const points = this.points.slice(0, this.points.length);

    render(this.#pointListComponent, this.#tripEventsContainer);

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if(this.#pointsModel.failed){
      this.#renderFailedLoad();
      return;
    }

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
    this.#infoTripPresenter.destroy();

    remove(this.#sortComponent);
    remove(this.#emptyListComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

}
