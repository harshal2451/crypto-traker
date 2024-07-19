// store/index.ts
"use client";
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import createWebStorage from "redux-persist/lib/storage/createWebStorage"
// import {
//   persistStore,
// } from 'redux-persist';
// import s  from 'redux-persist/lib/storage/createWebStorage';
// import storage from 'redux-persist/lib/storage';
import cryptoReducer from './cryptoSlice';
  
//   const storage =
//     typeof window !== 'undefined'
//       ? createWebStorage('local')
//       : createNoopStorage();
// const persistConfig = {
//   key: 'root',
//   storage,
// };

const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

// Define persist config
const persistConfig = {
  key: 'root',
  storage
};
// Persist the crypto reducer
const persistedCryptoReducer = persistReducer(persistConfig, cryptoReducer);

const store = configureStore({
  reducer: {
    crypto: persistedCryptoReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false, // Disable the serializable check if necessary
  }),
});

const persistor = persistStore(store);


export { store, persistor };
// const persistedReducer = persistReducer(persistConfig, rootReducer);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
