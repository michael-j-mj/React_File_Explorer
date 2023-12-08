
import React from 'react';


const FileItem = ({ item, depth, onClick }) => {


    return (
        <div key={item.id} style={{ marginLeft: depth }} className="explorer-item">
            {/* Use conditional rendering for arrow or file icon */}
            {item.type === 'folder' || item.type === 'folder-root' ? (
                <button >
                    {item.open ? (
                        <i className="bi bi-caret-down-fill"></i> // Bootstrap down arrow
                    ) : (
                        <i className="bi bi-caret-right-fill"></i> // Bootstrap right arrow
                    )}
                </button>
            ) : (
                <i className="bi bi-file-earmark"></i> // Bootstrap file icon
            )}

            <span>{item.title}</span>
        </div>
    );
};




export default FileItem;