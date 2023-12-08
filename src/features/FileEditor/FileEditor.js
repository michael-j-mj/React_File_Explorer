import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeContent } from '../../redux/fileSystemSlices';


const FileEditor = () => {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.fileSystem);
    const currentFileId = state.currentFile;
    const files = state.files;
    const currentFile = currentFileId ? files[currentFileId] : null;
    const [content, setContent] = useState(currentFile ? currentFile.content : '');

    // Update local content when the selected file changes
    useEffect(() => {
        setContent(currentFile ? currentFile.content : '');
    }, [currentFileId, currentFile]);

    const handleChange = () => {
        // Dispatch the changeContent action with updated content
        dispatch(changeContent({ id: currentFileId, content: content }));
    };

    if (!currentFile) {
        return (
            <div className="bg-light p-3" style={{ height: '100%' }}>
                <p>No file selected.</p>
            </div>
        );
    }

    return (
        <div className="bg-light p-3" style={{ height: '100%' }}>
            <h1>{currentFile.title}</h1>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onBlur={handleChange}
                style={{ width: '100%', height: '80vh' }} // Adjust height as needed
            />
        </div>
    );
};

export default FileEditor;
