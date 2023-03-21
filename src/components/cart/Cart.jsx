import React, { useEffect, useState } from 'react';
import './cart.css';
import { useDispatch, useSelector } from 'react-redux';
import { remove, removeAll } from '../../store/cartSlice';
import { incrementQuantity, decrementQuantity } from '../../store/cartSlice';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import { addToOder, removeOder } from '../../store/placeIdtemsSlice';
// import { NavLink } from '@mui/material';
import { NavLink } from 'react-router-dom';


const Cart = () => {

    const dispatch = useDispatch();
    const [total, setTotal] = useState(0);
    const [isorderPlaced, setIsorderPlaced] = useState(true);

    const CartProduct = useSelector((state) => state.cart);
    const placeItem = useSelector((state) => state.placeItem);
    // Array.prototype.push.apply(placeItem, CartProduct);



    const HandleIncreaseQuantity = (singleItem) => {
        dispatch(incrementQuantity(singleItem));

    };
    const HandleDecreaseQuantity = (singleItem) => {
        dispatch(decrementQuantity(singleItem));
    };

    useEffect(() => {
        const totalCost = CartProduct.reduce((sum, item) => sum + (+item.totalPrice), 0);
        setTotal(totalCost);

    }, [CartProduct]);

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const RemoveFromCart = (singleItem) => {
        dispatch(remove(singleItem));
        setOpen(false);

    };
    const handlePlaceOrder = () => {
        const TotalOrder = [...CartProduct, ...placeItem];
        console.log(TotalOrder);

        // const temp = TotalOrder.filter((item, index) => {
        //     return (index === TotalOrder.findIndex(obj => {
        //         return item.id === obj.id;
        //     }));
        // });
        // console.log(temp);


        if (isorderPlaced) {

            // dispatch(addToOder([...temp]));
            dispatch(addToOder(CartProduct));
            dispatch(removeAll());
            setIsorderPlaced(false);
        } else {
            setIsorderPlaced(true);

        }

    };

    return (
        <>
            <div className="outer_box">

                {
                    CartProduct.length > 0 ? CartProduct?.map(CartProduct => {
                        return (
                            <>
                                <div className="card_box">
                                    <div className="card_left">
                                        <img className="card_img" src={CartProduct.img} alt="img" />
                                        <span className="cost">$ {CartProduct.price} </span>
                                    </div>
                                    <div className="card_right">
                                        <div className="card_top"><span>$ {CartProduct.totalPrice} </span>
                                            <div className="close" onClick={() => setOpen(true)}>+</div>
                                        </div>
                                        <div className="card_middle">
                                            <h1 className="heading"> {CartProduct.title}</h1>
                                        </div>
                                        <div className="card_end">
                                            <div className="size"><span>Size: </span> Large</div>
                                            <div className="quantity">
                                                <button className="minus" onClick={() => { HandleDecreaseQuantity(CartProduct); }}>-</button>
                                                <span>{CartProduct.cartQuantity}</span>
                                                <button className="plus" onClick={() => { HandleIncreaseQuantity(CartProduct); }}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {
                                    <div>

                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >

                                            <DialogActions>
                                                <Button onClick={handleClose}>Disagree</Button>
                                                <Button onClick={() => { RemoveFromCart(CartProduct); }} autoFocus>
                                                    Agree
                                                </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </div>
                                }

                            </>

                        );
                    }) :
                        <NavLink to='/'>
                            <div className="empty">
                                <h1>Your Cart is empty</h1>
                                <Button variant="contained" className='fill_it'>Fill It</Button>
                            </div>
                        </NavLink>
                }
                <div className='placeOrder'>

                    {
                        CartProduct.length > 0 ?
                            <button button className='Add' style={{ 'backgroundColor': "#F4D03F" }}
                                onClick={() => {
                                    handlePlaceOrder();
                                }}>
                                Place Order
                            </button> : ""
                        // <button className='Add' style={{ 'backgroundColor': "rgb(118 121 119)" }} onClick={() => { }}>Canceled Order</button>
                    }

                </div>
            </div>


            {
                CartProduct.length > 0 ?
                    <footer className='TotalDiv'>
                        <p>Order Total : <span>${total}</span></p>
                    </footer> : null
            }
        </>
    );
};

export default Cart;