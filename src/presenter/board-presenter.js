import NewTripInfoView from '../view/trip-info.js';
import NewFilterView from '../view/filters.js';
import NewSortView from '../view/sort.js';
import NewPointsListView from '../view/points-list.js';
import NewRouteFormView from '../view/add-new-route-form.js';
import NewRoutePointView from '../view/route-point.js';
import {RenderPosition, render} from '../render.js';

const siteHeaderElement = document.querySelector('.page-header__container');
const siteHeaderInfoElement = siteHeaderElement.querySelector('.trip-main');
const siteHeaderFilterElement = siteHeaderInfoElement.querySelector('.trip-controls__filters');

const siteMainSortElement = document.querySelector('.trip-events');
export default class BoardPresenter {
  pointsListComponent = new NewPointsListView();

  constructor({boardContainer, pointsModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];

    render(new NewTripInfoView(), siteHeaderInfoElement, RenderPosition.AFTERBEGIN);
    render(new NewFilterView(), siteHeaderFilterElement);
    render(new NewSortView(), siteMainSortElement);
    render(this.pointsListComponent, siteMainSortElement);
    render(new NewRouteFormView({
      point: this.boardPoints[0],
      offers: this.pointsModel.getOffersByType(this.boardPoints[0].type),
      checkedOffers: [...this.pointsModel.getOffersById(this.boardPoints[0].type, this.boardPoints[0].offers)],
      destination: this.pointsModel.getDestinationsById(this.boardPoints[0].destination)
    }), this.pointsListComponent.getElement());

    for (let i = 1; i < this.boardPoints.length; i++) {
      render(new NewRoutePointView({
        point: this.boardPoints[i],
        offers: [...this.pointsModel.getOffersById(this.boardPoints[i].type, this.boardPoints[i].offers)],
        destination: this.pointsModel.getDestinationsById(this.boardPoints[i].destination)
      }), this.pointsListComponent.getElement());
    }
  }
}
