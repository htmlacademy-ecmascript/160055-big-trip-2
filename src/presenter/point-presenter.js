import {render, replace, remove} from '../framework/render.js';
import RoutePointView from '../view/route-point-view.js';
import RouteFormEditView from '../view/route-form-edit-view.js';
import {UserAction, UpdateType} from '../const.js';
import {isPointInPast, isPointInPresent, isPointInFuture} from '../utils/point.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #pointEditComponent = null;

  #point = null;
  #dataOffers = null;
  #dataDestinations = null;
  #mode = Mode.DEFAULT;

  constructor({pointListContainer, onDataChange, onModeChange}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point, dataOffers, dataDestinations) {
    this.#point = point;
    this.#dataOffers = dataOffers;
    this.#dataDestinations = dataDestinations;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new RoutePointView({
      point: this.#point,
      dataOffers: this.#dataOffers,
      dataDestinations: this.#dataDestinations,
      isAddPoint: false,
      onEditClick: this.#handlePointArrowClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new RouteFormEditView({
      point: this.#point,
      dataOffers: this.#dataOffers,
      dataDestinations: this.#dataDestinations,
      isAddPoint: false,
      onFormSubmit: this.#handleFormSubmit,
      onEditFormButtonClick: this.#handleEditClick,
      onDeleteClick: this.#handleDeleteClick
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handlePointArrowClick = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormSubmit = (update) => {
    const isMinorUpdate =
    isPointInPast(this.#point.dateTo) !== isPointInPast(update.dateTo) || isPointInPresent(this.#point.dateFrom, this.#point.dateTo) !== isPointInPresent(this.#point.dateFrom, this.#point.dateTo) ||
    isPointInFuture(this.#point.dateFrom) !== isPointInFuture(update.dateFrom);

    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update
    );
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleDeleteClick = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}
