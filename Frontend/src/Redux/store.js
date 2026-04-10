import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userreducer from '../Redux/userSlice'
import {
  persistStore,
  persistReducer,
} from "redux-persist";

import storage from "redux-persist/lib/storage/index.js";

const realStorage = storage.default;
console.log(realStorage)

const persistconfig = {
    key:'root',
    storage:realStorage,
    whitelist:['auth']
}
const rootpersist = combineReducers({
    auth:userreducer
})

const persistedreducer = persistReducer(persistconfig,rootpersist)

export const store = configureStore({
    reducer: persistedreducer,
     middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)
