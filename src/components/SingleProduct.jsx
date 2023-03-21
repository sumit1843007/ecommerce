import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

import StarIcon from '@mui/icons-material/Star';
import React from 'react';
import { Link } from 'react-router-dom';

import { add, remove } from '../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

const SingleProduct = ({ item, id }) => {
    const dispatch = useDispatch();
    const CartProduct = useSelector((state) => state.cart);
    var generateRating = Math.floor((item.rating) % 5) || 5;
    const isAvailableInCart = CartProduct.findIndex((main) => (main.id === item.id));

    const AddToCart = (singleItem) => {
        dispatch(add(singleItem));
    };

    const RemoveCart = (itemId) => {
        dispatch(remove(itemId));

    };

    return (
        <div className='ProductContainer' key={id}>
            <article>
                <Link to={`/singlePage/${item.id}`}>

                    <div className="singleImg">
                        <img src={item.img} alt="" />
                        {

                            item.delivery ? <span className='fast' >FAST</span> : ""
                        }
                        <span className='overlay overlayRight'> <i className="fa-solid fa-magnifying-glass searchIcon"></i> </span>
                    </div>
                </Link>
            </article>
            <footer>
                <h2>{item.title}</h2>
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

                        isAvailableInCart >= 0 ?
                            <button style={{ 'backgroundColor': "#DC143C" }} onClick={() => { RemoveCart(item); }}> <span>Remove</span> <span><i class="fa-sharp fa-solid fa-cart-shopping"></i></span>
                            </button>
                            : <button onClick={() => { AddToCart(item); }}> <span>ADD</span> <span><i class="fa-sharp fa-solid fa-cart-shopping"></i></span></button>
                    }
                </div>
            </footer>
        </div>
    );
};

export default SingleProduct;