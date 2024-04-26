import NewPointsListView from '../view/points-list.js';
import NewRoutePointView from '../view/route-point.js';
import NewTripInfoView from '../view/trip-info.js';
import NewFilterView from '../view/filters.js';
import NewSortView from '../view/sort.js';
import NewRouteFormView from '../view/add-new-route-form.js';
import {RenderPosition, render} from '../render.js';

const siteHeaderElement = document.querySelector('.page-header__container');
const siteHeaderInfoElement = siteHeaderElement.querySelector('.trip-main');
const siteHeaderFilterElement = siteHeaderInfoElement.querySelector('.trip-controls__filters');

const siteMainElement = document.querySelector('.page-body__page-main');
const siteMainSortElement = siteMainElement.querySelector('.trip-events');
export default class BoardPresenter {
  pointsListComponent = new NewPointsListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new NewTripInfoView(), siteHeaderInfoElement, RenderPosition.AFTERBEGIN);
    render(new NewFilterView(), siteHeaderFilterElement);
    render(new NewSortView(), siteMainSortElement);
    render(this.pointsListComponent, siteMainSortElement);
    render(new NewRouteFormView(), this.pointsListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new NewRoutePointView(), this.pointsListComponent.getElement());
    }
  }
}
