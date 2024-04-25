import NewPointsListView from '../view/points-list.js';
import NewRoutePointView from '../view/route-point.js';
import {render} from '../render.js';
// import TaskListView from '../view/task-list-view.js';
// import TaskView from '../view/task-view.js';
// import TaskEditView from '../view/task-edit-view.js';
// import LoadMoreButtonView from '../view/load-more-button-view.js';

export default class BoardPresenter {
  // boardComponent = new NewPointsListView();
  pointsListComponent = new NewPointsListView();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    // render(this.boardComponent, this.boardContainer);
    // render(new SortView(), this.boardComponent.getElement());
    render(this.pointsListComponent, this.boardComponent.getElement());
    render(new TaskEditView(), this.pointsListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new NewRoutePointView(), this.boardComponent.getElement());
    }

    // render(new LoadMoreButtonView(), this.boardComponent.getElement());
  }
}
