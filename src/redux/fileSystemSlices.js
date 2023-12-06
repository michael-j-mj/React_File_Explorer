import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
const initialState = {
  currentFile: null, // ID of the currently open file, initially set to null
  files: {
    0: {
      id: 0,
      title: 'root',
      open: true,
      type: 'folder-root',
      parentId: null,
      content: null,
      children: [1, 2], // Array of children IDs
    },
    1: {
      id: 1,
      title: 'Folder 1',
      open: true,
      type: 'folder',
      parentId: 0,
      content: null,
      children: [3, 4], // Array of children IDs
    },
    2: {
      id: 2,
      title: 'File 1.txt',
      open: true,
      type: 'file',
      parentId: 0,
      content: 'Initial content for File 1',
      children: [], // No children for a file
    },
    3: {
      id: 3,
      title: 'File 2.txt',
      open: true,
      type: 'file',
      parentId: 1,
      content: 'Initial content for File 2',
      children: [], // No children for a file
    },
    4: {
      id: 4,
      title: 'File 3.txt',
      open: true,
      type: 'file',
      parentId: 1,
      content: 'Initial content for File 3',
      children: [], // No children for a file
    },
  },
};


export const fileSystemSlice = createSlice({
  name: 'filesSystem',
  initialState: initialState,
  reducers: {
    selectFile: (state, action) => {
      state.currentFile = action.payload;
    },
    addFiles: (state, action) => {
      const fileSystem = {
        id: uuidv4(), // Use uuid to generate a unique ID
        title: action.payload.title,
        open: action.payload.open ?? false,
        type: action.payload.type,
        parentId: action.payload.parentId,
        content: action.payload.type == "folder" ? null : getInitialContent(action.payload.title),
        children: [],
      };
      state.files[fileSystem.parentId].children.push(fileSystem.id);
      state.files[fileSystem.id] = (fileSystem);
    },
    toggleOpen: (state, action) => {
      const { id } = action.payload;
      state.files[id].open = !state.files[id].open;
    },
    openFile: (state, action) => {
      state.currentFile = action.payload.id;
    },

  },
});




const getInitialContent = (fileName) => {
  const validFileSuffixes = ['.txt', '.js', '.ts', '.json'];

  if (fileName.endsWith('.txt')) {
    return 'test';
  } else if (fileName.endsWith('.js') || fileName.endsWith('.ts')) {
    return "";
  } else if (fileName.endsWith('.json')) {
    return '{}';
  } else {
    throw new Error('Invalid file type. Supported types: txt, js, ts, json');
  }
};


export const { selectFile, addFiles, toggleOpen } = fileSystemSlice.actions;

export default fileSystemSlice.reducer;
