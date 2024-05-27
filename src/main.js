import {render} from './framework/render.js';
import FilterView from './view/filters.js';
import SortView from './view/sort.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import {generateFilter} from './mock/filter.js';
import {generateSorting} from './mock/sort.js';

const siteMainElement = document.querySelector('.page-body__page-main');
const siteHeaderElement = document.querySelector('.page-header__container');
const siteHeaderInfoElement = siteHeaderElement.querySelector('.trip-main');
const siteMainSortElement = document.querySelector('.trip-events');
const siteHeaderFilterElement = siteHeaderInfoElement.querySelector('.trip-controls__filters');
const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({
  boardContainer: siteMainElement,
  pointsModel: pointsModel,
});

const filters = generateFilter(pointsModel.points);
render(new FilterView({filters}), siteHeaderFilterElement);

const sorts = generateSorting(pointsModel.points);
render(new SortView({sorts}), siteMainSortElement);
boardPresenter.init();
