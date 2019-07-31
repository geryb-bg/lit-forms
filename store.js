import { createStore } from 'redux';
import { editor } from './reducers/editor.reducer';

export const store = createStore(editor, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
