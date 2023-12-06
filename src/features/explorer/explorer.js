import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FileItem from '../../component/fileItem';
import { toggleOpen, addFiles, selectFile } from '../../redux/fileSystemSlices';

const Explorer = () => {
    const [selected, setSelected] = useState(0);
    const [editing, setEditing] = useState({});
    useEffect(() => {
        // This will be executed after the component re-renders
        if (editing.parentId != null) {
            inputRef.current.focus();
        }
    }, [editing]);
    const [hovered, setHovered] = useState(null);
    const [newItemName, setNewItemName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const fileSystemState = useSelector((state) => state.fileSystem.files);
    const handleMouseEnter = (id) => {
        setHovered(id);
    };

    const handleMouseLeave = () => {
        setHovered(null);
    };

    const handleCreateFile = (type) => {
        const item = fileSystemState[selected];
        let dir;

        console.log(selected);
        if (item.type == "file") {
            dir = item.parentId;
        } else {
            dir = item.id;
        }
        // const isValidName = validateName(newItemName);
        setEditing({ parentId: dir, type: type });

    };
    const handleChange = ({ target }) => {
        setNewItemName(target.value);
    }
    const handleSubmit = () => {
        console.log(newItemName);
        if (editing.type == "file") {
            if (!/(\.txt|\.js|\.ts|\.json)$/.test(newItemName)) {
                console.log('Invalid file name. Please use .txt, .js, .ts, or .json extension.');
                setErrorMessage('Invalid file name. Please use .txt, .js, .ts, or .json extension.');
                return;

            } else {
                console.log('valid file');
                setErrorMessage('');
            }
        } else {
            console.log('folder');
        }
        dispatch(addFiles({
            title: newItemName,
            type: editing.type,
            parentId: editing.parentId,

        }));
        setEditing({});
        setNewItemName("");

    }

    const handleClick = (id, type) => {
        if (type === 'folder' || type === 'folder-root') {
            dispatch(toggleOpen({ id: id }));
        } else if (type === 'file') {
            console.log(id + "  " + selected);
            if (selected === id) {
                // Handle file selection logic
                dispatch(selectFile(id));
            } else {
                // Handle other file logic
            }
        }
        setSelected(id);
    };

    const renderHierarchy = (itemId) => {
        const item = fileSystemState[itemId];
        const indentation = `${getDepth(item) * 20}px`;

        const explorerItemStyle = {
            paddingLeft: indentation,
            backgroundColor: selected === item.id ? 'lightblue' : hovered === item.id ? 'lightgrey' : 'transparent',
        };

        return (
            <div key={item.id} className="explorer-item">
                <div
                    style={explorerItemStyle}
                    onClick={() => handleClick(item.id, item.type)}
                    onMouseEnter={() => handleMouseEnter(item.id)}
                    onMouseLeave={handleMouseLeave}
                >
                    <FileItem item={item} depth={indentation} onClick={() => handleClick(item.id, item.type)} />
                </div>
                {item.children && item.open && (
                    <div >
                        {item.children.map((childId) => renderHierarchy(childId))}
                    </div>
                )}
                {editing.parentId == item.id && <div>
                    {editing.type == "file" ? <i className="bi bi-file-earmark"></i> : <i className="bi bi-caret-right-fill"></i>}
                    <input style={{ ...explorerItemStyle, marginLeft: indentation }} ref={inputRef} onBlur={handleSubmit}
                        onChange={handleChange} value={newItemName} />
                    <p className='text-danger'>{errorMessage}</p>
                </div>}
            </div>
        );
    };

    const getDepth = (item) => {
        let depth = 0;
        let current = item;
        while (current.parentId !== null) {
            current = fileSystemState[current.parentId];
            if (!current || !current.open) {
                return depth;
            }
            depth += 1;
        }
        return depth;
    };

    return (
        <div className="explorer">
            <h3>Explorer</h3>
            <div>
                <button onClick={() => { handleCreateFile("file") }}>Create File</button>
                <button onClick={() => { handleCreateFile("folder") }}>Create Folder</button>
            </div>

            {renderHierarchy(0)}
        </div>
    );
};

export default Explorer;
