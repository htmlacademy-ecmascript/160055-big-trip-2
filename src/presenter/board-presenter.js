import NewTripInfoView from '../view/trip-info.js';
import NewFilterView from '../view/filters.js';
import NewSortView from '../view/sort.js';
import NewPointsListView from '../view/points-list.js';
import NewRouteFormView from '../view/add-new-route-form.js';
import NewRoutePointView from '../view/route-point.js';
import {RenderPosition, render, replace} from '../framework/render.js';

const siteHeaderElement = document.querySelector('.page-header__container');
const siteHeaderInfoElement = siteHeaderElement.querySelector('.trip-main');
const siteHeaderFilterElement = siteHeaderInfoElement.querySelector('.trip-controls__filters');

const siteMainSortElement = document.querySelector('.trip-events');
export default class BoardPresenter {
  #boardContainer;
  #pointsModel;

  #pointsListComponent = new NewPointsListView();

  #boardPoints = [];

  constructor({boardContainer, pointsModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];

    render(new NewTripInfoView(), siteHeaderInfoElement, RenderPosition.AFTERBEGIN);
    render(new NewFilterView(), siteHeaderFilterElement);
    render(new NewSortView(), siteMainSortElement);
    render(this.#pointsListComponent, siteMainSortElement);
    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i]);
    }
  }

  #renderPoint(point) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new NewRoutePointView({
      point: point,
      offers: [...this.#pointsModel.getOffersById(point.type, point.offers)],
      destination: this.#pointsModel.getDestinationsById(point.destination),
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });
    const pointEditComponent = new NewRouteFormView({
      point: point,
      offers: this.#pointsModel.getOffersByType(point.type),
      destination: this.#pointsModel.getDestinationsById(point.destination),
      onEditClick: () => {
        replaceFormToCard();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToCard() {
      replace(pointComponent, pointEditComponent);
    }

    render(pointComponent, this.#pointsListComponent.element);
  }
}
