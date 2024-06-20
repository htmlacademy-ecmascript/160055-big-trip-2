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
import {DEFAULT_SORT_NAME} from '../const.js';

const siteHeaderElement = document.querySelector('.page-header__container');
const siteHeaderInfoElement = siteHeaderElement.querySelector('.trip-main');
const siteMainSortElement = document.querySelector('.trip-events');
const siteHeaderFilterElement = siteHeaderInfoElement.querySelector('.trip-controls__filters');
export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #sortComponent = null;
  #filterComponent = null;

  #pointsListComponent = new PointsListView();

  #boardPoints = [];
  #pointPresenters = new Map();
  #currentSortType = DEFAULT_SORT_NAME;
  #sourcedBoardPoints = [];
  #sorts = [];
  #filters = [];

  constructor({boardContainer, pointsModel, sorts, filters}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#sorts = [...sorts];
    this.#filters = filters;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#sourcedBoardPoints = this.#boardPoints.sort(sortByDay);
    this.#renderFilter();
    this.#renderSort();
    this.#renderBoard();
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      sorts: this.#sorts,
      onSortTypeChange: this.#handleSortTypeChange,
    });
    render(this.#sortComponent, this.#pointsListComponent.element, RenderPosition.AFTERBEGIN);
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  };

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this.#boardPoints.sort(sortByTime);
        break;
      case SortType.PRICE:
        this.#boardPoints.sort(sortByPrice);
        break;
      case SortType.DAY:
        this.#boardPoints.sort(sortByDay);
    }

    this.#currentSortType = sortType;
  }

  #renderFilter() {
    this.#filterComponent = new FilterView({
      filters: this.#filters,
    });
    render(this.#filterComponent, siteHeaderFilterElement);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      boardContainer: this.#pointsListComponent.element,
      pointsModel: this.#pointsModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });
    this.#pointPresenters.set(point.id, pointPresenter);
    pointPresenter.init(point);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #renderBoard() {
    render(this.#pointsListComponent, this.#boardContainer);
    if (this.#boardPoints.length === 0) {
      render(new NoPointView(), siteMainSortElement);
      return;
    }
    render(new TripInfoView(), siteHeaderInfoElement, RenderPosition.AFTERBEGIN);
    render(this.#pointsListComponent, siteMainSortElement);
    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}
