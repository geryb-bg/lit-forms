import { LitElement, html } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../store';
import { errorsDetected } from '../actions/errors-detected.action';
import { sharedStyles } from '../styles/shared';
import missionsService from '../services/missions.service';
import { missionToUpdateChanged } from '../actions/mission-to-update-changed.action';

const styles = html`
  <style>
    button {
      font-size: 1em;
      background: none;
      width: 10em;
    }
    form > div > button {
      flex: 0 0 auto;
    }
    form > div > div {
      flex: 1 1 auto;
    }
  </style>
`;

export class MissionsForm extends connect(store)(LitElement) {
  constructor() {
    super();

    this.errors = [];
  }

  static get properties() {
    return {
      errors: Array,
      mission: Object
    };
  }

  renderButtons() {
    if (!this.mission.missionId) {
      return html`
        <div>
          <div></div>
          <button type="submit">Add Mission</button>
        </div>
      `;
    }

    return html`
      <div>
        <div>
          <button @click="${(e) => this.cancelEdit()}">Cancel</button>
        </div>
        <button type="submit">Update Mission</button>
      </div>
    `;
  }

  render() {
    const hasError = (name) => (this.errors.indexOf(name) >= 0 ? 'error' : '');

    return html`
      ${sharedStyles} ${styles}

      <form
        @submit="${(e) => this.submit(e)}"
        @change="${(e) => this.formValueUpdated(e)}"
      >
        <div>
          <label>Name: </label>
          <input
            class="${hasError('name')}"
            type="input"
            name="name"
            .value="${this.mission.name}"
          />
        </div>
        <div>
          <label>
            Description:
          </label>
          <textarea
            class="${hasError('description')}"
            type="input"
            name="description"
            .value="${this.mission.description}"
          ></textarea>
        </div>
        ${this.renderButtons()}
      </form>
    `;
  }

  formValueUpdated(e) {
    let errorList = [...this.errors];
    if (!e.target.value) {
      errorList.push(e.target.name);
    } else {
      let indexOfError = errorList.indexOf(e.target.name);
      if (indexOfError >= 0) {
        errorList.splice(indexOfError, 1);
      }
    }
    store.dispatch(errorsDetected(errorList));
  }

  submit(e) {
    e.preventDefault();
    let form = e.target;
    let errors = this.checkForErrors(form);

    if (!errors.length) {
      let mission = {
        ...this.mission,
        name: form.name.value,
        description: form.description.value
      };

      if (mission.missionId) {
        missionsService.updateMission(this.missions, mission);
      } else {
        missionsService.createMission(this.missions, mission);
      }
      form.reset();
      store.dispatch(missionToUpdateChanged({ missionId: 0, name: '', description: '' }));
    }

    store.dispatch(errorsDetected(errors));
  }

  checkForErrors(form) {
    let errors = [];

    if (!form.name.value) {
      errors.push('name');
    }

    if (!form.description.value) {
      errors.push('description');
    }

    return errors;
  }

  cancelEdit() {
    store.dispatch(missionToUpdateChanged({ missionId: 0, name: '', description: '' }));
    store.dispatch(errorsDetected([]));
  }

  stateChanged(state) {
    this.missions = state.missions;
    this.errors = state.errors;
    this.mission = state.missionToUpdate;
  }
}

customElements.define('missions-form', MissionsForm);
