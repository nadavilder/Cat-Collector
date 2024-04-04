import React, { useState } from 'react';
import CatCard from './CatCard';

function CatList({ cats, onFavoriteToggle, onUpdateCat }) {
    const [currentPage, setCurrentPage] = useState(0);
    const catsPerPage = 10; // 10 cats per page to have 2 rows of 5 cats
    const totalPages = Math.ceil(cats.length / catsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const paginatedCats = cats.slice(currentPage * catsPerPage, (currentPage + 1) * catsPerPage);

    return (
        <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px', maxWidth: '1200px', margin: 'auto' }}>
                {paginatedCats.map(cat => (
                    <CatCard
                        key={cat.id}
                        cat={cat}
                        onFavoriteToggle={onFavoriteToggle}
                        onUpdateCat={onUpdateCat}
                    />
                ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                {currentPage > 0 && (
                    <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                )}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index} onClick={() => handlePageChange(index)} disabled={index === currentPage}>
                        {index + 1}
                    </button>
                ))}
                {currentPage + 1 < totalPages && (
                    <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                )}
            </div>
        </div>
    );
}

export default CatList;
