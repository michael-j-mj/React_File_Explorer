import React from 'react';
import { useSelector } from 'react-redux';

const FileEditor = () => {
    const state = useSelector((state) => state.fileSystem);
    const currentFileId = state.currentFile;
    const files = state.files;
    const currentFile = files[currentFileId];

    if (!currentFile) {
        return (
            <div className="bg-light p-3">

                <p>No file selected.</p>
            </div>
        );
    }

    return (
        <div className="bg-light p-3">

            <h1>{currentFile.title}</h1>
            <pre>{currentFile.content}</pre>
        </div>
    );
};

export default FileEditor;
