import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import {generateFilter} from './mock/filter.js';
import {generateSorting} from './mock/sort.js';
import {FilterType, SortType} from './const.js';

const siteMainElement = document.querySelector('.page-body__page-main');

const pointsModel = new PointsModel();
const sorts = generateSorting(SortType);
const filters = generateFilter(FilterType);
const boardPresenter = new BoardPresenter({
  boardContainer: siteMainElement,
  pointsModel: pointsModel,
  sorts: sorts,
  filters: filters,
});

boardPresenter.init();
