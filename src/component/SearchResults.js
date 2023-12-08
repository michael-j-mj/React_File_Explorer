import React from 'react';
import FileItem from './FileItem';

const SearchResults = ({ files, searchTerm, selectedId, handleSearchItemClick }) => {
    // Convert the files object to an array
    const filesArray = Object.values(files);

    // Filter files based on the search term
    const filteredResults = filesArray.filter((file) =>
        file.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {
                filteredResults.length <= 0 ? <h2>No Results Found</h2> :
                    filteredResults.map((result) => (
                        <div key={result.id} className="explorer-item">
                            {/* Render each search result item using FileItem or a custom component */}
                            <div

                                onClick={() => handleSearchItemClick(result.id, result.type)}

                            >
                                <FileItem
                                    item={result}
                                    isSelected={selectedId === result.id}

                                />

                            </div>
                        </div>
                    ))}
        </div>
    );
};

export default SearchResults;
