import { html } from 'lit-element';

export const sharedStyles = html`
  <style>
    .error {
      border: 1px solid red;
    }

    form > div {
      display: flex;
      max-width: 45em;
      font-size: 1.1em;
      align-items: center;
      margin: 1em auto;
    }

    form > div > label {
      flex: 0 0 auto;
      min-width: 8em;
    }

    form > div > input,
    form > div > textarea {
      flex: 1 1 auto;
      font-size: 1em;
    }
  </style>
`;
