import { LitElement, html } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../store';
import { questUpdated } from '../actions/quest-updated.action';
import { errorsDetected } from '../actions/errors-detected.action';
import { sharedStyles } from '../styles/shared';

export class QuestEditor extends connect(store)(LitElement) {
  constructor() {
    super();
    this.errors = [];
  }

  static get properties() {
    return {
      quest: Object,
      errors: Array
    };
  }

  render() {
    const hasError = (name) => (this.errors.indexOf(name) >= 0 ? 'error' : '');

    return html`
      ${sharedStyles}

      <form
        @change="${(e) => this.formValueUpdated(e)}"
        @submit="${(e) => e.preventDefault()}"
      >
        <div>
          <label>Goal:</label>
          <input class="${hasError('goal')}" name="goal" type="text" />
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

    let quest = {
      ...this.quest,
      [e.target.name]: e.target.value
    };

    store.dispatch(errorsDetected(errorList));
    store.dispatch(questUpdated(quest));
  }

  stateChanged(state) {
    this.quest = state.quest;
    this.errors = state.errors;

    if (!this.quest) {
      this.quest = {
        goal: ''
      };
    }
  }
}

customElements.define('quest-editor', QuestEditor);
