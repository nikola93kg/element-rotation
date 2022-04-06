import React, { useState, useEffect } from 'react';

function SearchBar({ data, rotateElements }) {

    const [filteredData, setFilteredData] = useState([]);

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         rotateElements()
    //     }, 3000)
    //     return () => clearInterval(interval)
    // }, [])

    const handleSearch = (e) => {
        let search = e.target.value;
        const newFilter = data.filter((value) => {
            return value.collectionName.toLowerCase().includes(search.toLowerCase());
        });
        if (search === '') {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    }

    return (
        <div className='search'>
            <div className="searchInputs">
                <input type="text" onChange={handleSearch} placeholder="Search Band" />
            </div>
            {filteredData.length !== 0 && (
                <div className="dataResult">
                    {filteredData.map((item, index) => {
                        const { collectionName } = item;
                        return <p key={index}>{collectionName}</p>
                    })}
                </div>
            )
            }

        </div>
    )
}

export default SearchBar