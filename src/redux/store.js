import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import fileSystemReducer from './fileSystemSlices';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, fileSystemReducer);

const store = configureStore({
    reducer: {
        fileSystem: persistedReducer,
    },
});

const persistor = persistStore(store);

export { store, persistor };