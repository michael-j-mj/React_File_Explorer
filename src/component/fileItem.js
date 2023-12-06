
import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleOpen } from '../redux/fileSystemSlices';


const FileItem = ({ item, depth, onClick }) => {
    const dispatch = useDispatch();
    const handleToggleOpen = () => {
        dispatch(toggleOpen({ id: item.id }));
    };

    return (
        <div key={item.id} style={{ marginLeft: depth }} className="explorer-item">
            {/* Use conditional rendering for arrow or file icon */}
            {item.type === 'folder' || item.type === 'folder-root' ? (
                <button onClick={handleToggleOpen}>
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