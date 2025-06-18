import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import storage from 'redux-persist/lib/storage';
import { CategoryReducer } from './reducers/CategoryReducer';
import { persistReducer, persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';


const persistConfig ={
    key:'root',
    storage
}


const rootReducer = combineReducers({
   categories : CategoryReducer
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


const initialState = {};

const middleware = [thunk];

const store = createStore(persistedReducer,initialState,composeWithDevTools(
    applyMiddleware(...middleware))
);


const persistor= persistStore(store);

export { store, persistor };