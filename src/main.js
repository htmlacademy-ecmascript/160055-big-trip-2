import NewFilterView from './view/filters.js';
import NewSortView from './view/sort.js';
import NewRouteFormView from './view/add-new-route-form.js';
// import NewRoutePointView from './view/route-point.js';
import {render} from './render.js';
import BoardPresenter from './presenter/board-presenter.js';

const siteHeaderElement = document.querySelector('.trip-controls');
const siteHeaderFiltersElement = siteHeaderElement.querySelector('.trip-controls__filters');

const siteMainElement = document.querySelector('.page-body__page-main');
const siteMainSortElement = siteMainElement.querySelector('.trip-events');

const boardPresenter = new BoardPresenter({boardContainer: siteMainElement});

render(new NewFilterView(), siteHeaderFiltersElement);
render(new NewSortView(), siteMainSortElement);
// render(new NewRoutePointView(), siteMainSortElement);
boardPresenter.init();
render(new NewRouteFormView(), siteMainSortElement);

