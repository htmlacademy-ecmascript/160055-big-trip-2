import TripPresenter from './presenter/trip-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';
import {AUTHORIZATION, END_POINT} from './const.js';

const siteMainElement = document.querySelector('.page-main');
const tripMainElement = document.querySelector('.trip-main');
const addEventButton = document.querySelector('.trip-main__event-add-btn');
addEventButton.addEventListener('click', handleNewPointButtonClick);

const pointsModel = new PointsModel({
  pointApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  main: siteMainElement,
  pointsModel,
  tripMain: tripMainElement,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose
});

function handleNewPointFormClose() {
  addEventButton.disabled = false;
}

function handleNewPointButtonClick() {
  tripPresenter.createPoint();
  addEventButton.disabled = true;
}
pointsModel.init();
tripPresenter.init();
