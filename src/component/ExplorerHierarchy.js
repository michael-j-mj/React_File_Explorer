import React from 'react';
import FileItem from './FileItemDisplay';
import ItemForm from './ItemForm';

const ExplorerHierarchy = ({
    fileSystemState,
    itemId,
    selectedId,
    hovered,
    editing,
    inputRef,
    handleClick,
    handleMouseEnter,
    handleMouseLeave,
    handleCancel,
    handleSubmit,
    searchText,

}) => {
    const item = fileSystemState.files[itemId];

    if (!item) {
        // Handle case when item is undefined
        return null;
    }
    const getDepth = (item) => {
        let depth = 0;
        let current = item;

        while (current.parentId !== null) {
            current = fileSystemState.files[current.parentId];
            if (!current || !current.open) {
                return depth;
            }
            depth += 1;
        }
        return depth;
    };
    const indentation = `${getDepth(item) * 20}px`;

    const explorerItemStyle = {
        paddingLeft: indentation,
        backgroundColor: selectedId === item.id ? 'lightblue' : hovered === item.id ? 'lightgrey' : 'transparent',
    };

    const displayItem = editing.renameId === item.id ? (
        <ItemForm files={fileSystemState.files} editing={editing} onSubmit={handleSubmit} inputRef={inputRef} onCancel={handleCancel} item={item} />
    ) : (
        <FileItem item={item} depth={indentation} onClick={() => handleClick(item.id, item.type)} />
    );

    return (
        <div key={item.id} className="explorer-item">
            <div
                style={explorerItemStyle}
                onClick={() => handleClick(item.id, item.type)}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={handleMouseLeave}
            >
                {displayItem}
            </div>
            {item.children && item.open && (
                <div>
                    {item.children.map((childId) => (
                        <ExplorerHierarchy
                            key={childId}
                            fileSystemState={fileSystemState}
                            itemId={childId}
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
                    ))}
                </div>
            )}
            {editing.parentId === item.id && (
                <div style={{ marginLeft: indentation }}>
                    <ItemForm files={fileSystemState.files} editing={editing} onSubmit={handleSubmit} inputRef={inputRef} onCancel={handleCancel} />
                </div>
            )}
        </div>
    );


};


export default ExplorerHierarchy;