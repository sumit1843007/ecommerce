import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';
import { Rating } from '@mui/material';
import SingleProduct from './SingleProduct';


const Filter = ({ sortedByFunction, filterFunction, filterData }) => {
    const { data: products, status } = useSelector((state) => state.product);

    console.log(filterData);
    const [sortedBy, setSortedBy] = useState('');

    const HandleSelect = (e) => {
        console.log(e.target.value);
        setSortedBy(e.target.value);
    };


    return (
        <div className="rightBar">
            <div className='sortDiv'>
                <p>
                    <span style={{ "color": "forestgreen" }}>{filterFunction?.length}</span>
                    <span style={{ "color": "#ffc107" }}>Products Found</span>
                </p>
                <div className="select-dropdown">
                    <select value={sortedBy} onChange={(e) => { HandleSelect(e); }}>
                        <option name='' >--Select--</option>
                        <option value="rating" name=''>Rating</option>
                        <option value="ASCENDING" name=''>Price(lowest)</option>
                        <option value="DESCENDING" name=''>Price(Highest)</option>
                        <option value="ATOZ" name=''>Name(A-Z)</option>
                        <option value="ZTOA" name=''>Name(Z-A)</option>
                    </select>
                </div>
            </div>
            <div className="AllProduct">

                {
                    // filterFunction?.length > 0 ?
                    // : "product not  found"
                    (filterFunction || products)?.map((item) => { return <SingleProduct item={item} />; })
                }

            </div>
        </div>
    );
};

export default Filter;