import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';

const siteMainElement = document.querySelector('.page-main');
const tripMainElement = document.querySelector('.trip-main');

const pointsModel = new PointsModel();

const boardPresenter = new TripPresenter({
  main: siteMainElement,
  pointsModel,
  tripMain: tripMainElement,
});

boardPresenter.init();
