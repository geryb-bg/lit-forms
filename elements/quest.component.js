import { LitElement, html } from 'lit-element';
import { connect } from 'pwa-helpers';
import { store } from '../store';
import { errorsDetected } from '../actions/errors-detected.action';

import './quest-editor.component';
import './missions-list.component';

export class Quest extends connect(store)(LitElement) {
  render() {
    return html`
      <h1>Create Quest</h1>
      <quest-editor></quest-editor>
      <missions-list></missions-list>
      <div>
        <button type="button" @click="${() => this.saveQuest()}">Save</button>
      </div>
    `;
  }

  saveQuest() {
    let errors = this.pageValid();
    if (!errors.length) {
      //save quest and missions here
      console.log("saved");
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
