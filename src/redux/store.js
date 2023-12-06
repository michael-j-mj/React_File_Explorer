import { configureStore } from '@reduxjs/toolkit';
import fileSystemReducer from './fileSystemSlices';

export default configureStore({
    reducer: {
        fileSystem: fileSystemReducer,
    },
});