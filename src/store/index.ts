import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";

export const rootReducer = combineReducers({ auth: authReducer });

export const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => console.log(store.getState()));

export type RootState = ReturnType<typeof rootReducer>;
