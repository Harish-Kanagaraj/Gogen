import { createStore } from 'redux';
import counterReducer from './qus9reducer';

const store = createStore(counterReducer);

export default store;
