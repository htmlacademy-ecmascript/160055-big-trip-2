import TripInfoView from '../view/trip-info.js';
import PointsListView from '../view/points-list.js';
import NoPointView from '../view/no-point-view.js';
import {RenderPosition, render} from '../framework/render.js';
import PointPresenter from './point-presenter.js';
import {updateItem} from '../utils/common.js';

const siteHeaderElement = document.querySelector('.page-header__container');
const siteHeaderInfoElement = siteHeaderElement.querySelector('.trip-main');

const siteMainSortElement = document.querySelector('.trip-events');
export default class BoardPresenter {
  #boardContainer;
  #pointsModel;

  #pointsListComponent = new PointsListView();

  #boardPoints = [];
  #pointPresenters = new Map();

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      boardContainer: this.#pointsListComponent.element,
      pointsModel: this.#pointsModel,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
    });
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

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
