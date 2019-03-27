import {createStore, applyMiddleware} from "redux";
import rootReducer from "../reducers";
import thunk from 'redux-thunk';

export type AppState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);
export default store;