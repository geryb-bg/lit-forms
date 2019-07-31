import { LitElement, html } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../store';

import './missions-form.component';

export class MissionsList extends connect(store)(LitElement) {
  constructor() {
    super();

    this.missions = [];
  }

  static get properties() {
    return {
      missions: Array
    };
  }

  render() {
    return html`
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
  }
}

customElements.define('missions-list', MissionsList);
