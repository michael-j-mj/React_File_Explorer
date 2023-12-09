import React from 'react';


const FileExplorerButtons = ({
    handleCreateFile,
    handleDelete,
    handleRename,
    handleFileMove,
    handlePaste,
    transferId,
    selectedId
}) => {
    return (<div className='row justify-content-center'>
        <div className=' col-3'>
            <button
                className="btn btn-primary btn-sm"
                onClick={() => handleCreateFile("file")}
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Create New File"

            >
                <i className="bi bi-file-earmark"></i>

            </button>
            <button
                className="btn btn-primary btn-sm"
                onClick={() => handleCreateFile("folder")}
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Create New Folder"
            >
                <i className="bi bi-folder"></i>

            </button>
        </div>
        <div className='col-2'>
            <button
                className="btn btn-secondary btn-sm"
                onClick={() => handleRename()}
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Rename"
            >
                <i className="bi bi-pencil"></i>

            </button>

        </div>
        <div className='col-5  '>
            <button
                className="btn btn-info btn-sm"
                onClick={() => { handleFileMove('copy') }}
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Copy"
                disabled={selectedId === 0}
            >
                <i className="bi bi-files"></i>
            </button>
            <button
                className="btn btn-warning btn-sm"
                onClick={() => { handleFileMove('move') }}
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Cut"
                disabled={selectedId === 0}
            >
                <i className="bi bi-scissors"></i>
            </button>
            <button
                disabled={transferId.id === undefined}
                className="btn btn-success btn-sm"
                onClick={() => { handlePaste(); }}
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                title="Paste"
            >
                <i className="bi bi-clipboard-plus"></i>
            </button>
        </div>
        <div className='col-2'>
            <button
                className="btn btn-danger btn-sm"
                onClick={handleDelete}
                data-bs-toggle="tooltip"
                data-bs-placement="bottom"
                disabled={selectedId === 0}
                title="Delete">
                <i className="bi bi-trash"></i>

            </button></div>
    </div>);
}

export default FileExplorerButtons; 