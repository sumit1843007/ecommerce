import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import './singlePage.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add, decrementQuantity, incrementQuantity, remove } from '../../store/cartSlice';
import { addToOder, removeOder } from '../../store/placeIdtemsSlice';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const SinglePage = () => {
    const dispatch = useDispatch();
    const { selectedId } = useParams();

    const { data: products } = useSelector((state) => state.product);
    const CartProduct = useSelector((state) => state.cart);
    const placeItem = useSelector((state) => state.placeItem);
    const [singleQuantity, setSingleQuantity] = useState(1);

    const singleProductItem = products.filter((item) => { return item.id === selectedId; });
    const singleCartItem = CartProduct.filter(product => {
        return (product.id === selectedId);
    });
    console.log("product", singleProductItem, "cart", singleCartItem);

    const isAvailableInCart = CartProduct.findIndex((main) => (main.id === selectedId));
    const isPlaceItem = placeItem.findIndex((main) => (main.id === selectedId));
    console.log(isAvailableInCart);


    const individualQuantity = CartProduct[isAvailableInCart]?.cartQuantity;
    // const selectedProduct = products.filter(product => {
    //     return (product.id === selectedId);
    // });

    const AddToCart = (singleItem) => {
        dispatch(add(singleItem));
    };

    const HandleIncreaseQuantity = (singleItem) => {
        setSingleQuantity(prev => prev + 1);
        dispatch(incrementQuantity(singleItem));

    };

    const HandleDecreaseQuantity = (singleItem) => {
        setSingleQuantity(prev => prev - 1);

        dispatch(decrementQuantity(singleItem));
    };

    const RemoveCart = (itemId) => {
        dispatch(remove(itemId));

    };
    const handlePlaceOrder = (singleItem) => {
        dispatch(addToOder({ singleItem, singleQuantity }));

    };
    const handleRemoveOrder = (singleItem) => {
        dispatch(removeOder(singleItem));

    };

    useEffect(() => {

    }, []);

    return (
        <>
            {
                (singleProductItem).map(product => {


                    return (
                        <div className='singleContainer'>
                            <div className="SinglePageImg">
                                <img src={product.img} alt="" />
                            </div>
                            <div className="singleContent">
                                <h2>{product.title}</h2>
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
                                            value={3}
                                            readOnly
                                            precision={0.5}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                        <Box sx={{ ml: 2 }}></Box>
                                    </Box>
                                </div>
                                <h3>${product.price}</h3>
                                <p>{product.description}</p>
                                {
                                    isAvailableInCart >= 0 ?
                                        <div className="button">
                                            <button onClick={() => { HandleDecreaseQuantity(product); }}> <span style={{ "color": "#DC143C", "fontSize": "20px" }} >-</span> </button>
                                            <p>{individualQuantity}</p>
                                            <button onClick={() => { HandleIncreaseQuantity(product); }}> <span style={{ "color": "#228b22", "fontSize": "20px" }}> + </span></button>
                                        </div> : ""
                                }


                                {
                                    isAvailableInCart >= 0 ?
                                        <button className='Add' style={{ 'backgroundColor': "#DC143C" }} onClick={() => { RemoveCart(product); }}> <span>Remove</span> <span><i class="fa-sharp fa-solid fa-cart-shopping"></i></span></button> :
                                        <button className='Add' style={{ 'backgroundColor': "#228b22" }} onClick={() => { AddToCart(product); }}>  <span>Add</span> <span><i class="fa-sharp fa-solid fa-cart-shopping"></i></span></button>
                                }


                                <div className="placeOrder">
                                    {
                                        isPlaceItem >= 0 ?
                                            <button className='Add' style={{ 'backgroundColor': "#DC143C" }}> Already Order</button>
                                            :
                                            <button className='Add' style={{ 'backgroundColor': "#F4D03F" }} onClick={() => { handlePlaceOrder(product); }}>Place Order</button>
                                    }
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </>
    );
};

export default SinglePage;