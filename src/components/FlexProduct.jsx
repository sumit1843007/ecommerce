import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

import StarIcon from '@mui/icons-material/Star';
import React from 'react';
import { Link } from 'react-router-dom';

import { add, remove } from '../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const FlexProduct = ({ item }) => {
    const dispatch = useDispatch();
    const CartProduct = useSelector((state) => state.cart);
    var generateRating = Math.floor((item.rating) % 5) || 5;
    const isAvailableInCart = CartProduct.findIndex((main) => (main.id === item.id));

    const AddToCart = (itemId) => {
        dispatch(add(itemId));
    };

    const RemoveCart = (itemId) => {
        dispatch(remove(itemId));

    };
    return (
        <div className='ProductContainer'>
            <div className="mainContainer">

                <article>
                    <Link to={`/singlePage/${item.id}`}>

                        <div className="singleImg">
                            <img src={item.img} alt="" />
                            {

                                item.delivery ? <span >FAST</span> : ""
                            }
                        </div>
                    </Link>
                </article>
                <footer>
                    <h5>{item.title}</h5>
                    {/* <span>{item.category}</span> */}
                    <div className="star">
                        <Box
                            sx={{
                                width: 200,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Rating
                                name="text-feedback"
                                value={generateRating}
                                readOnly
                                precision={0.5}
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                            <Box sx={{ ml: 2 }}></Box>
                        </Box>
                    </div>
                    <div className="AddOrRemove">
                        <p>${item.price}</p>
                        {

                            isAvailableInCart >= 0 ? <button style={{ 'backgroundColor': "#DC143C" }} onClick={() => { RemoveCart(item); }}>Remove</button> : <button onClick={() => { AddToCart(item); }}>Add</button>
                        }
                    </div>
                </footer>
            </div>

        </div>
    );
};

export default FlexProduct;