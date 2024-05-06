import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';

const siteMainElement = document.querySelector('.page-body__page-main');
const pointsModel = new PointsModel();
const boardPresenter = new BoardPresenter({
  boardContainer: siteMainElement,
  pointsModel,
});
boardPresenter.init();
