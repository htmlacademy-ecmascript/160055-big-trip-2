import TripInfoView from '../view/trip-info.js';
import PointsListView from '../view/points-list.js';
import RouteFormEditView from '../view/edit-point.js';
import RoutePointView from '../view/route-point.js';
import NoPointView from '../view/no-point-view.js';
import {RenderPosition, render, replace} from '../framework/render.js';

const siteHeaderElement = document.querySelector('.page-header__container');
const siteHeaderInfoElement = siteHeaderElement.querySelector('.trip-main');

const siteMainSortElement = document.querySelector('.trip-events');
export default class BoardPresenter {
  #boardContainer;
  #pointsModel;

  #pointsListComponent = new PointsListView();

  #boardPoints = [];

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new RoutePointView({
      point: point,
      offers: [...this.#pointsModel.getOffersById(point.type, point.offers)],
      destination: this.#pointsModel.getDestinationsById(point.destination),
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const pointEditComponent = new RouteFormEditView({
      point: point,
      offers: this.#pointsModel.getOffersByType(point.type),
      destination: this.#pointsModel.getDestinationsById(point.destination),
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#pointsListComponent.element);
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
}
