import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavBar = () => {
    const [Toggle, setToggle] = useState(false);
    const CartProduct = useSelector((state) => state.cart);
    return (
        <>

            <nav>

                <a href="/">
                    <svg id="logo-35" width="50" height="39" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" class="ccompli1" fill="#007AFF"></path> <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" class="ccustom" fill="#312ECB"></path> </svg>
                </a>
                <div>
                    <ul id='navbar' className={Toggle ? 'navbar active' : 'navbar'}>
                        <li>
                            <NavLink to='/'>Product</NavLink>
                        </li>
                        <li>
                            <NavLink to='/order'>Oder's</NavLink>
                        </li>
                        <li>
                            <NavLink to='/cart'>
                                <i class="fa-solid fa-cart-shopping"></i>
                            </NavLink>
                            {
                                CartProduct.length === 0 ? "" :
                                    <span>{CartProduct.length}</span>
                            }
                        </li>
                    </ul>
                </div>
                <div className="mobile">
                    {

                        Toggle ? <i className="fa-solid fa-xmark Cross" onClick={() => { setToggle(!Toggle); }}></i>
                            : <i class="fa-solid fa-bars" onClick={() => { setToggle(!Toggle); }}></i>
                    }
                </div>
                {
                    Toggle ? <span className={Toggle ? 'nave_overlay active' : 'nave_overlay'} onClick={() => { setToggle(false); }}></span> : ""
                }
            </nav>
        </>
    );
};

export default NavBar;