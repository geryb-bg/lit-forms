import { LitElement, html } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../store';
import { missionsUpdated } from '../actions/missions-updated.action';
import { errorsDetected } from '../actions/errors-detected.action';
import { sharedStyles } from '../styles/shared';

const styles = html`
  <style>
    form > div > button {
      flex: 0 0 auto;
      font-size: 1em;
      background: none;
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
      errors: Array
    };
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
          <input class="${hasError('name')}" type="input" name="name" />
        </div>
        <div>
          <label>
            Description:
          </label>
          <textarea
            class="${hasError('description')}"
            type="input"
            name="description"
          ></textarea>
        </div>
        <div>
          <div></div>
          <button type="submit">Add Mission</button>
        </div>
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
        name: form.name.value,
        description: form.description.value
      };

      store.dispatch(missionsUpdated([...this.missions, mission]));
      form.reset();
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

  stateChanged(state) {
    this.missions = state.missions;
    this.errors = state.errors;
  }
}

customElements.define('missions-form', MissionsForm);
