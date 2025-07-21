import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import storage from "redux-persist/lib/storage";
import { CategoryReducer } from "./reducers/CategoryReducer";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { propertyReducer } from "./reducers/PropertyReducer";
import { UserReducer } from "./reducers/UserReducer";
import { AmenitiesReducer, PrivacyOptionsReducer, PropertyTypeReducer } from "./reducers/PropertyTypeReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  categories: CategoryReducer,
  properties: propertyReducer,
  users: UserReducer,
  propertyTypes:PropertyTypeReducer,
  privacyOptions:PrivacyOptionsReducer,
  amenities:AmenitiesReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};

const middleware = [thunk];

const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };
