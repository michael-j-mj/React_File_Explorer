import React from 'react';

import './styles/App.css';
import FileEditor from './features/FileEditor/FileEditor';
import Explorer from './features/explorer/ExplorerOverview';


function App() {
  // Access the state from the 'fileSystem' slice


  return (
    <div className="container-fluid" style={{ height: '100vh' }}>
      <div className="row" style={{ height: '100%' }}>
        {/* Explorer Sidebar (35% width) */}
        <div className="col-md-3 bg-light p-3" style={{ height: '70vh', overflowY: 'auto' }}>
          <Explorer />
        </div>

        {/* Content Area (65% width) */}
        <div className="col-md-9 p-3" style={{ height: '75vh' }}>
          {/* Placeholder for content */}
          <FileEditor />
        </div>
      </div>
    </div>
  );
}

export default App;
