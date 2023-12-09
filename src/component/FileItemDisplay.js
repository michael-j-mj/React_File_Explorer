
import React from 'react';


const FileItem = ({ item, depth, onClick }) => {


    return (
        <div key={item.id} style={{ marginLeft: depth }} className="explorer-item">
            {item.type === 'folder' || item.type === 'folder-root' ? (
                item.open ? (
                    <i className="bi bi-caret-down-fill"></i>
                ) : (
                    <i className="bi bi-caret-right-fill"></i>
                )
            ) : (
                <i className={item.type === 'folder' ? 'bi bi-folder' : 'bi bi-file-earmark'}></i>
            )}
            <span>{item.title}</span>
        </div>
    );

};




export default FileItem;