import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleOpen, addFiles, selectFile, deleteItem, renameItem, transferItem } from '../../redux/fileSystemSlices';
import './Explorer.css';
import FileExplorerButtons from '../../component/FileExplorerButtons';
import SearchBar from '../../component/SearchBar';
import ExplorerHierarchy from '../../component/ExplorerHierarchy';
import SearchResults from '../../component/SearchResults';
const Explorer = () => {
    const fileSystemState = useSelector((state) => state.fileSystem);

    const [selectedId, setSelectedId] = useState(fileSystemState.currentFile ?? 0);
    const [editing, setEditing] = useState({});
    const [transferId, setTransferId] = useState({});
    useEffect(() => {
        if (editing.parentId != null || editing.renameId != null) {
            inputRef.current.focus();
        }
    }, [editing]);
    const [searchText, setSearchText] = useState('');

    const [hovered, setHovered] = useState(null);

    const dispatch = useDispatch();
    const inputRef = useRef(null);


    const handleMouseEnter = (id) => {
        setHovered(id);
    };

    const handleMouseLeave = () => {
        setHovered(null);
    };

    const handleCreateFile = (type) => {
        const item = fileSystemState.files[selectedId];
        let dir;

        if (item.type === "file") {
            dir = item.parentId;
        } else {
            dir = item.id;
        }
        setEditing({ parentId: dir, type: type });
    };
    const handleCancel = () => {
        setEditing({});
    }

    const handleRename = () => {

        setEditing({ renameId: selectedId });
    };
    const handleSubmit = (title) => {
        if (editing.renameId != null) {
            dispatch(renameItem({ id: selectedId, title: title }))
        } else {
            dispatch(addFiles({
                title: title,
                type: editing.type,
                parentId: editing.parentId,
            }));
        }
        setEditing({});
    };

    const handleDelete = () => {
        if (selectedId === 0) {
            alert('Cannot delete Root.');
            return;
        } else if (selectedId === null) {
            alert('No item selectedId for deletion.');
            return;
        }
        const confirmed = window.confirm('Are you sure you want to delete this item and its children?');

        if (confirmed) {
            dispatch(deleteItem({ id: selectedId }));
            setSelectedId(0); // Clear the selectedId item after deletion
        }
    };
    const handleFileMove = (type) => {
        if (selectedId != 0) {
            setTransferId({ id: selectedId, type: type });
        }
    }
    const handlePaste = () => {
        if (transferId.type == "move" && transferId.id === selectedId) { //moving to it self
            return;
        }
        const destination = fileSystemState.files[selectedId].type === "file" ? fileSystemState.files[selectedId].parentId : selectedId;
        dispatch(transferItem({ fromId: transferId.id, destinationId: destination, type: transferId.type }));
        setTransferId({});
    }
    const handleSearch = (value) => {
        setSearchText(value);
    }
    const handleClick = (id, type) => {
        if (type === 'folder' || type === 'folder-root') {
            dispatch(toggleOpen({ id: id }));

        } else if (type === 'file') {
            if (selectedId === id) {
                console.log(fileSystemState.files[selectedId].title);
                if (/(\.txt|\.js|\.ts|\.json)$/.test(fileSystemState.files[selectedId].title)) {
                    dispatch(selectFile(id));
                }
            } else {
                // Handle other file logic
            }

        }
        setSelectedId(id); setSearchText('');

    };



    return (
        <div className="explorer" style={{}}>
            <h3>Explorer </h3>
            <div className='my-4'>
                <SearchBar searchText={searchText} onSearchChange={handleSearch} />
            </div>
            <div className='my-2'>
                <FileExplorerButtons
                    handleCreateFile={handleCreateFile}
                    handleDelete={handleDelete}
                    handleRename={handleRename}
                    handleFileMove={handleFileMove}
                    handlePaste={handlePaste}
                    transferId={transferId}
                />
            </div>
            <div className='file-container'>

                {searchText ? (
                    <SearchResults
                        files={fileSystemState.files}
                        searchTerm={searchText}
                        selectedId={selectedId}
                        handleSearchItemClick={handleClick} // Pass the handleClick function from Explorer
                    />
                ) :

                    <ExplorerHierarchy
                        fileSystemState={fileSystemState}
                        itemId={0} // or any other appropriate ID
                        selectedId={selectedId}
                        hovered={hovered}
                        editing={editing}
                        inputRef={inputRef}
                        handleClick={handleClick}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                        handleCancel={handleCancel}
                        handleSubmit={handleSubmit}

                    />
                }
            </div>
        </div>
    );
};

export default Explorer;
