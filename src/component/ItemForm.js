import React, { useState } from 'react';

const ItemForm = ({ files, editing, onSubmit, inputRef, onCancel, item }) => {
    const [itemName, setItemName] = useState(item?.title || '');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setItemName(e.target.value);
        setErrorMessage('');
    };

    const handleValidate = () => {
        const parentId = editing?.parentId ?? item?.parentId;


        if (itemName.trim() === '') {
            handleCancel();
            return;
        }
        console.log(files);
        if (parentId != null && files[parentId].children.some(childId =>
            files[childId].title === itemName && (!item || item.id !== childId)
        )) {
            setErrorMessage('Duplicate names are not allowed');
            return;
        }

        // if (type === 'file' && !/(\.txt|\.js|\.ts|\.json)$/.test(itemName)) {
        //     setErrorMessage('Invalid file name. Please use .txt, .js, .ts, or .json extension.');
        //     return;
        // }

        setErrorMessage('');
        onSubmit(itemName);
        setItemName('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            // Submit the field on Enter key press
            handleValidate();
        }
    };

    const handleCancel = () => {
        setItemName('');
        setErrorMessage('');
        onCancel();
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {editing?.type === 'file' ? <i className="bi bi-file-earmark"></i> : <i className="bi bi-caret-right-fill"></i>}
                <input
                    data-testid="file-input"
                    ref={inputRef}
                    onBlur={handleValidate}
                    onChange={handleChange}
                    value={itemName}
                    style={{ flex: '1', marginRight: '8px' }}
                    onKeyDown={handleKeyDown}
                    placeholder={`Enter name...`}
                />
                <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </div>
    );
};

export default ItemForm;
