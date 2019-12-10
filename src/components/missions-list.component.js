import { LitElement, html } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../store';
import { circle } from '../svg';
import { missionToUpdateChanged } from '../actions/mission-to-update-changed.action';
import missionsService from '../services/missions.service';

import './missions-form.component';

const styles = html`
  <style>
    .error-text {
      color: red;
      text-align: center;
    }

    ul {
      display: block;
      list-style: none;
      padding: 0;
    }

    li > span {
      display: flex;
      max-width: inherit;
      margin: 0 0 0.5em;
      padding: 0 0 0 3em;
      align-items: center;
    }

    li > span > svg {
      width: 1.3em;
      height: 1.3em;
      margin: 0 0.5em 0em -1.8em;
      stroke: var(--app-tertiary-color);
      fill: var(--app-tertiary-color);
      min-width: 30px;
    }

    li > span > button {
      font-size: 1em;
      background: none;
      border: none;
      box-shadow: 2px 2px 2px black;
      margin: 0 0.3em 0 0;
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
      errors: Array,
      missionToUpdate: Object
    };
  }

  hasError() {
    return this.errors.indexOf('missions') >= 0
      ? html`
          <div class="error-text">There must be at least one mission in every quest!</div>
        `
      : html``;
  }

  renderAdd() {
    return !this.missionToUpdate.missionId
      ? html`
          <hr>
          <missions-form></missions-form>
        `
      : html``;
  }

  renderMission(mission) {
    let content = html`
      ${circle}
      <strong>${mission.name}:</strong>&nbsp;${mission.description}
    `;

    if (mission !== this.missionToUpdate) {
      return html`
        <span>
          ${content} &nbsp;&nbsp;
          <button @click="${(e) => this.showEditor(mission)}">Edit</button>
          <button @click="${(e) => this.deleteMission(mission)}">Delete</button>
        </span>
      `;
    }

    return html`
      <span>
        ${content}
      </span>
      <missions-form></missions-form>
    `;
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
                ${this.renderMission(m)}
              </li>
            `
        )}
      </ul>
      ${this.renderAdd()}
    `;
  }

  showEditor(mission) {
    store.dispatch(missionToUpdateChanged(mission));
  }

  deleteMission(mission) {
    missionsService.deleteMission(this.missions, mission);
  }

  stateChanged(state) {
    this.missions = state.missions;
    this.errors = state.errors;
    this.missionToUpdate = state.missionToUpdate;
  }
}

customElements.define('missions-list', MissionsList);
