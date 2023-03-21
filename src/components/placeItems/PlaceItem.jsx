import React, { useEffect, useState } from 'react';
import './placeItems.css';
import { useDispatch, useSelector } from 'react-redux';
import { decrementQuantity, incrementQuantity } from '../../store/placeIdtemsSlice';


const PlaceItem = () => {
    const dispatch = useDispatch();
    const [total, setTotal] = useState();
    const placeItem = useSelector((state) => state.placeItem);

    const HandleIncreaseQuantity = (singleItem) => {
        dispatch(incrementQuantity(singleItem));

    };

    useEffect(() => {
        const totalCost = placeItem.reduce((sum, item) => sum + (+item.totalPrice), 0);
        setTotal(totalCost);

    }, [placeItem]);

    return (

        <>
            <div className="placed_container_box">
                {
                    placeItem?.length > 0 ? placeItem?.map(CartProduct => {
                        return (
                            <>
                                <div className="place_outer_box">
                                    <div className="place_box">
                                        <div className="place_left">
                                            <img className="" src={CartProduct.img} alt="img" />
                                            <span className="" >$ {CartProduct.price} </span>
                                        </div>
                                        <div className="place_right">
                                            <div className="total_cost"><span style={{ 'color': "#228b22" }} >$ {CartProduct.totalPrice} </span>
                                            </div>
                                            <div className="right_tital">
                                                <p className=""> {CartProduct.title}</p>
                                            </div>
                                            <div className="right_quantity">
                                                <p className=""> Quantity : {CartProduct.cartQuantity}</p>
                                            </div>
                                            <div className="footer">
                                                <div className="Size"><span>Size: </span> Large</div>
                                                <button className="buy_button" onClick={() => { HandleIncreaseQuantity(CartProduct); }}>Buy Again </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    }) : <h2 className='NO_oder'>"No Oder Yet"</h2>
                }
            </div>
            {
                placeItem.length > 0 ?
                    <footer className='TotalDiv'>
                        <p>Order Total : <span>${total}</span></p>
                    </footer> : null
            }
        </>
    );
};

export default PlaceItem;