import BoardPresenter from './presenter/board-presenter.js';

const siteMainElement = document.querySelector('.page-body__page-main');
const boardPresenter = new BoardPresenter({boardContainer: siteMainElement});
boardPresenter.init();
