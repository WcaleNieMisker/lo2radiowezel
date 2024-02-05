import React, { useState } from 'react';

const Filters = ({ onFilterChange }) => {

    const handleFilterChange = (e) => {
        const selectedValue = e.target.value;
        onFilterChange(selectedValue);
    }
    return (
        <select name="filters" id="filters" className="filters" onChange={handleFilterChange}>
            <option value="0">Utwór</option>
            <option value="1">Wykonawca</option>
            <option value="2">Album</option>
        </select>
    )
}

export default Filters;