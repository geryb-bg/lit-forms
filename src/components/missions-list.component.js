import { LitElement, html } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../store';
import { circle } from '../svg';

import './missions-form.component';

const styles = html`
  <style>
    .error-text {
      color: red;
      text-align: center;
    }

    ul {
      display: block;
    }

    li {
      display: flex;
      max-width: inherit;
      margin: 0 0 0.5em;
    }

    li > svg {
      width: 1.3em;
      height: 1.3em;
      margin: 0 0.5em 0em -1.8em;
      stroke: var(--app-tertiary-color);
      fill: var(--app-tertiary-color);
      min-width: 30px;
    }
  </style>
`;

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
          <div class="error-text">There must be at least one mission in every quest!</div>
        `
      : html``;
  }

  render() {
    return html`
      ${styles}

      <h2>Missions</h2>
      ${this.hasError()}
      <ul>
        ${this.missions.map(
          (m) =>
            html`
              <li>
                ${circle}
                <strong>${m.name}:</strong>&nbsp;
                ${m.description}
              </li>
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
