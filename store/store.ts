import { weatherApi } from '@/services/weatherApi'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist'
import authReducer from './authSlice'
import storage from './storage'
import weatherReducer from './weatherSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  weather: weatherReducer,
  [weatherApi.reducerPath]: weatherApi.reducer,
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'weather'], // persistence for auth and weather
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(weatherApi.middleware),
})

export const persistor = persistStore(store)

// 👇 Typed helpers (important)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
