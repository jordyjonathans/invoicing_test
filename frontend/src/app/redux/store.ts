import GlobalDialog, { GlobalDialogState } from '@app/redux/slices/globaDialogSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import { Action } from '@reduxjs/toolkit';

import storage from 'redux-persist/lib/storage';

type RootReducerState = {
  GlobalDialog: GlobalDialogState;
};

const persistedReducer = persistReducer<RootReducerState, Action>(
  {
    key: 'root',
    version: 1,
    storage: storage,
    blacklist: ['GlobalDialog'],
  },
  combineReducers({ GlobalDialog })
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'GlobalDialog/showGlobalDialog'],
        ignoredPaths: ['GlobalDialog.onButtonNeutralPress', 'GlobalDialog.onButtonPositivePress'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
