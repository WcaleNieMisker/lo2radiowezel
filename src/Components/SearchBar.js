import React, { useState, useEffect } from 'react';
import Filters from './filtersSelect.js';

const SearchBar = ({ elements, setSearchResults }) => {
    const [selectedFilter, setSelectedFilter] = useState(0);
    const [filteredArray, setFilteredArray] = useState([]);
    const handleSubmit = (e) => e.preventDefault();
    const handleFilterChange = (selectedValue) => {
        setSelectedFilter(selectedValue);
    }

    const handleSearchChange = (e) => {
        const searchQuery = e.target.value.toLowerCase();

        if (parseFloat(selectedFilter) === 0) {
            setFilteredArray(elements.filter(element => element.name.toLowerCase().includes(searchQuery)));
        } else if (parseFloat(selectedFilter) === 1) {
            setFilteredArray(elements.filter(element => element.artist.toLowerCase().includes(searchQuery)));
        } else if (parseFloat(selectedFilter) === 2) {
            setFilteredArray(elements.filter(element => element.album.toLowerCase().includes(searchQuery)));
        }
    }

    useEffect(() => {
        if (selectedFilter === 0) {
            setFilteredArray(elements);
        }
    }, [selectedFilter, elements]);

    useEffect(() => {
        setSearchResults(filteredArray);
    }, [filteredArray, setSearchResults])

    return (
        <form className="search" onSubmit={handleSubmit}>
            <div className="search-bar">
                <Filters onFilterChange={handleFilterChange} />
                <div className="search-box">
                    <input type="text" onChange={handleSearchChange} id="search" placeholder="Szukaj..." />
                    <label htmlFor="check" className="icon">
                        <i className="ri-search-line"></i>
                    </label>
                </div>
            </div>
        </form>
    )
}

export default SearchBar;
