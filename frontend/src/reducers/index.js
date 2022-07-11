import {applyMiddleware, combineReducers, createStore} from "redux";
import {orderReducer} from "./order-reducer"
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {zoneReducer} from "./zone-reducer";

const rootReducer = combineReducers({
    orders: orderReducer,
    zones: zoneReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));