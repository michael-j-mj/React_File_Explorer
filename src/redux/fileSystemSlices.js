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
      children: [], // Array of children IDs
    }
  }

};

export const fileSystemSlice = createSlice({
  name: 'filesSystem',
  initialState: initialState,
  reducers: {
    selectFile: (state, action) => {
      state.currentFile = action.payload;
    },
    changeContent: (state, action) => {
      console.log(action.payload.content);

      state.files[action.payload.id].content = action.payload.content;

    },
    addFiles: (state, action) => {
      const fileSystem = {
        id: uuidv4(), // Use uuid to generate a unique ID
        title: action.payload.title,
        open: action.payload.open ?? false,
        type: action.payload.type,
        parentId: action.payload.parentId,
        content: action.payload.type === "folder" ? null : getInitialContent(action.payload.title),
        children: [],
      };
      state.files[fileSystem.parentId].children.push(fileSystem.id);
      state.files[fileSystem.id] = (fileSystem);
      console.log(state.files);
    },
    renameItem: (state, action) => {
      const id = action.payload.id;
      const title = action.payload.title;
      state.files[id].title = title;
    },
    deleteItem: (state, action) => {
      const item = state.files[action.payload.id];
      state.files[item.parentId].children = state.files[item.parentId].children.filter(e => e !== item.id);
      removeAll(state, item.id);
    },
    transferItem: (state, action) => {
      const fromId = action.payload.fromId;
      const destinationId = action.payload.destinationId;
      const isCopy = action.payload.type === 'copy';

      // Get the title with a unique name if needed
      const title = getTitle(state, fromId, destinationId);

      if (state.files[fromId].type === 'folder' || state.files[fromId].type === "folder-root") {
        copyFolder(state, fromId, destinationId, title);
        if (!isCopy) {
          const item = state.files[fromId];
          state.files[item.parentId].children = state.files[item.parentId].children.filter(e => e !== item.id);
          removeAll(state, fromId);
        }
      } else {
        // Copy or move logic for files
        const newFileId = uuidv4(); // Generate a unique ID for the new file

        // Create a new file entry
        const newFile = {
          id: newFileId,
          title: title,
          type: 'file',
          parentId: destinationId,
          content: state.files[fromId].content,
        };

        // Add the new file to the destination folder's children
        state.files[destinationId].children.push(newFileId);
        state.files[newFile.id] = newFile;

        if (!isCopy) {
          // If it's a move, remove the source file
          state.files[state.files[fromId].parentId].children =
            state.files[state.files[fromId].parentId].children.filter(e => e !== fromId);
        }
      }
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

const getTitle = (state, fromId, toId) => {
  let title = state.files[fromId].title;
  let newTitle = title;
  const boolUniqueChild = () => state.files[toId].children.some(childId => state.files[childId].title === newTitle);
  while (boolUniqueChild()) {
    newTitle = "copy-" + newTitle;
  }

  return newTitle;
};

const copyFolder = (state, sourceFolderId, destinationFolderId, title) => {
  const idMapping = {}; // Map old node IDs to new node IDs
  const copiedNodes = []; // Array to store deep copies of nodes
  const queue = [sourceFolderId]; // Use a queue for breadth-first traversal

  // Copy the root node
  const rootId = deepCopyNode(sourceFolderId, destinationFolderId);
  idMapping[sourceFolderId] = rootId;

  while (queue.length > 0) {
    const nodeId = queue.shift(); // Dequeue

    const node = state.files[nodeId];

    // Check if the node has children before attempting to iterate
    if (node.children) {
      node.children.forEach(childId => {
        deepCopyNode(childId, idMapping[nodeId]);
        queue.push(childId); // Enqueue for further processing
      });
    }
  }
  copiedNodes[0].title = title;
  // Now, connect the copied nodes to the state
  copiedNodes.forEach(copiedNode => {
    // Add the new node to the destination parent's children
    state.files[copiedNode.parentId].children.push(copiedNode.id);

    // Add the new node to state.files
    state.files[copiedNode.id] = copiedNode;
  });

  function deepCopyNode(nodeId, newParentId) {
    const node = state.files[nodeId];
    const newNodeId = uuidv4(); // Generate a unique ID for the new node

    // Create a deep copy of the node
    const newNode = { ...node, id: newNodeId, parentId: newParentId, children: [] };

    // Add the new node to the mapping
    idMapping[nodeId] = newNodeId;

    // Add the new node to the array of copied nodes
    copiedNodes.push(newNode);

    return newNodeId;
  }
};
const getInitialContent = (fileName) => {


  if (fileName.endsWith('.txt')) {
    return 'test';
  } else if (fileName.endsWith('.js') || fileName.endsWith('.ts')) {
    return "console.log('hello world);";
  } else if (fileName.endsWith('.json')) {
    return '{}';
  } else {
    return "";
  }
};
const removeAll = (state, id) => {
  const item = state.files[id];
  if (item.children && item.children.length > 0) {
    // Recursively delete children
    item.children.forEach((childId) => removeAll(state, childId));
  }

  // Delete the item from the state
  delete state.files[id];
};

export const { selectFile, addFiles, deleteItem, toggleOpen, renameItem, transferItem, changeContent } = fileSystemSlice.actions;

export default fileSystemSlice.reducer;
