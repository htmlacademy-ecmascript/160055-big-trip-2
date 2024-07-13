import {remove, render, RenderPosition} from '../framework/render.js';
import RouteFormEditView from '../view/route-form-edit-view.js';
import {UserAction, UpdateType} from '../const.js';

export default class AddPointPresenter {
  #dataOffers = null;
  #dataDestinations = null;

  #pointListContainer = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #editPointFormComponent = null;

  constructor({pointListContainer, onDataChange, onDestroy}) {
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init(dataOffers, dataDestinations) {
    this.#dataOffers = dataOffers;
    this.#dataDestinations = dataDestinations;

    if (this.#editPointFormComponent !== null) {
      return;
    }

    this.#editPointFormComponent = new RouteFormEditView({
      dataOffers: this.#dataOffers,
      dataDestinations: this.#dataDestinations,
      isAddPoint: true,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
    });

    render(this.#editPointFormComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#editPointFormComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#editPointFormComponent);
    this.#editPointFormComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#editPointFormComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#editPointFormComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#editPointFormComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
