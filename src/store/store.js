import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { imageReducer } from '../reducers/imageReducer';

const reducers = combineReducers(
  {
    image: imageReducer
  }
)

export const store = createStore(
  reducers,
  composeWithDevTools()
)
