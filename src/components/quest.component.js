import { LitElement, html } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../store';
import { errorsDetected } from '../actions/errors-detected.action';

import './quest-editor.component';
import './missions-list.component';

const styles = html`
  <style>
    .main {
      padding: 1em;
      font-family: "Lucida Grande", Arial, sans-serif;
      max-width: 60em;
      margin: 0 auto;
    }

    button {
      display: block;
      margin: 1em auto;
      font-size: 1.3em;
      background: none;
      width: 20em;
    }
  </style>
`;

export class Quest extends connect(store)(LitElement) {
  render() {
    return html`
      ${styles}

      <div class="main">
        <h1>Create Quest</h1>
        <quest-editor></quest-editor>
        <missions-list></missions-list>
        <div>
          <button type="button" @click="${() => this.saveQuest()}">Save All Changes</button>
        </div>
      </div>
    `;
  }

  saveQuest() {
    let errors = this.pageValid();
    if (!errors.length) {
      console.log('saved');
    }
    store.dispatch(errorsDetected(errors));
  }

  pageValid() {
    let errors = [];

    if (!this.quest.goal) {
      errors.push('goal');
    }

    if (!this.missions.length) {
      errors.push('missions');
    }

    return errors;
  }

  stateChanged(state) {
    this.missions = state.missions;
    this.quest = state.quest;
  }
}

customElements.define('my-quest', Quest);
