import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Explorer from './features/explorer/explorer';
import FileEditor from './features/FileEditor/FileEditor';

function App() {
  // Access the state from the 'fileSystem' slice
  const fileSystemState = useSelector((state) => state.fileSystem);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Explorer Sidebar (35% width) */}
        <div className="col-md-3 bg-light p-3">
          <Explorer />
        </div>

        {/* Content Area (65% width) */}
        <div className="col-md-9 p-3">
          {/* Placeholder for content */}
          <FileEditor />
        </div>
      </div>
    </div>
  );
}

export default App;
