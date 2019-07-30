import { LitElement, html } from 'lit-element';

export class MissionsForm extends LitElement {
  constructor() {
    super();

    this.mission = {
      name: '',
      description: ''
    };

    this.errors = [];
  }

  static get properties() {
    return {
      mission: Object,
      errors: Array
    };
  }

  render() {
    const hasError = (name) => (this.errors.indexOf(name) >= 0 ? 'error' : '');

    return html`
      <style>
        .error {
          border: 1px solid red;
        }
      </style>

      <form @submit="${(e) => this.submit(e)}" @change="${(e) => this.formValueUpdated(e)}">
        <div>
          <label>Name: </label>
          <input class="${hasError('name')}" type="input" name="name" .value="${this.mission.name}" />
        </div>
        <div>
          <label>
            Description:
          </label>
          <textarea class="${hasError('description')}" type="input" name="description" .value="${this.mission.description}"> </textarea>
        </div>
        <div>
          <button type="button" @click="${() => this.cancel()}">Cancel</button>
          <button type="submit" class="save">Save</button>
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
    this.errors = [...errorList];
  }

  submit(e) {
    e.preventDefault();
    let form = e.target;
    this.errors = this.checkForErrors(form);

    if (!this.errors.length) {
      this.mission = {
        ...this.mission,
        name: form.name.value,
        description: form.description.value
      };

      //save your mission
      this.mission = {
        name: '',
        description: ''
      };
      form.reset();
      alert('Mission Saved');
    }
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

  cancel() {
    this.mission = {
      name: '',
      description: ''
    };
    form.reset();
  }
}

customElements.define('missions-form', MissionsForm);
