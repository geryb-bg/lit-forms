import { LitElement, html } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../store';

import './missions-form.component';

export class MissionsList extends connect(store)(LitElement) {
  constructor() {
    super();

    this.missions = [];
    this.errors = [];
  }

  static get properties() {
    return {
      missions: Array,
      errors: Array
    };
  }

  hasError() {
    return this.errors.indexOf('missions') >= 0
      ? html`
          <div class="error">There must be at least one mission in every quest!</div>
        `
      : html``;
  }

  render() {
    return html`
      <style>
        .error {
          color: red;
        }
      </style>

      <h2>Missions</h2>
      ${this.hasError()}
      <ul>
        ${this.missions.map(
          (m) =>
            html`
              <li><strong>${m.name}:</strong> ${m.description}</li>
            `
        )}
      </ul>
      <missions-form></missions-form>
    `;
  }

  stateChanged(state) {
    this.missions = state.missions;
    this.errors = state.errors;
  }
}

customElements.define('missions-list', MissionsList);
