import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SingleProduct from './SingleProduct';
import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';
import { Rating } from '@mui/material';
import { fetchProducts } from '../store/productSlice';
import { STATUES } from '../store/productSlice';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const [filterBox, setFilterBox] = useState(false);
    const { data: products, status } = useSelector((state) => state.product);
    const Categories = products.map(item => item.category);

    const uniqueCategories = ['ALL', ...new Set(Categories)];

    let maximumPrice = Math.ceil(Math.max(...products.map(item => item.price)));
    let defaultPrice = maximumPrice ? 1000 : maximumPrice;

    const [initialPriceRange, setInitialPriceRange] = useState([0, 1000]);

    const [maxPrice, setMaxPrice] = useState();
    const [sortedBy, setSortedBy] = useState('');
    const [PageNo, setPageNo] = useState(1);

    const [FilterBy, setFilterBy] = useState(
        {
            category: null,
            price: [],
            rating: 0,
            fast: false,
            Query: '',
            activeCategory: "ALL",
            filterCategory: null,
            gridView: true,
            productSearchQuery: '',
            productSearch: []
        }
    );

    useEffect(() => {
        dispatch(fetchProducts());
    }, []);

    const handleClear = () => {
        setFilterBy(
            {
                category: null,
                price: [0, defaultPrice],
                rating: 0,
                fast: false,
                Query: '',
                activeCategory: 'ALL',
                productSearchQuery: '',
                productSearch: []
            }
        );
        setInitialPriceRange([0, maximumPrice]);
        setSortedBy('');
    };
    const SingleCategory = (index, item) => {

        setFilterBy((prev) => ({ ...prev, category: item }));
        setFilterBy((prev) => ({ ...prev, activeCategory: item }));
        let selectedCategoryProduct = products.filter((value) => { return value.category === item; });
        let maximumPrice1 = Math.ceil(Math.max(...selectedCategoryProduct.map(item => item.price)));


        if (item === 'ALL') {
            console.log(item);
            setInitialPriceRange([0, maximumPrice]);
            setMaxPrice(maximumPrice);

        } else {
            setInitialPriceRange([0, maximumPrice1]);
            setMaxPrice(maximumPrice1);
        }
        setPageNo(1);

    };


    const HandleSelect = (e) => {
        setSortedBy(e.target.value);
    };


    const handlePriceRange = (e) => {
        setInitialPriceRange(e.target.value);
        setFilterBy((prev) => ({ ...prev, price: e.target.value }));
        setPageNo(1);

    };

    const handleFastDelivery = (data) => {
        if (data === "fast") {

            if (FilterBy.fast === true) {
                setFilterBy((prev) => ({ ...prev, fast: false }));

            } else {
                console.log("second");
                setFilterBy((prev) => ({ ...prev, fast: true }));
            }
        }
        setPageNo(1);
    };

    const handleStartClick = (e) => {
        setFilterBy((prev) => ({ ...prev, rating: e.target.value }));
        setPageNo(1);
    };


    const handleSearch = (value) => {
        let filterCategory = uniqueCategories?.filter((item) => item.toLowerCase().includes(value));
        setFilterBy({ ...FilterBy, filterCategory, Query: value });
        setPageNo(1);
    };


    const filteredFunction = () => {
        const { category, rating, price, fast, productSearch, productSearchQuery } = FilterBy;
        let filterProduct = products.filter((item) => item.title.toLowerCase().includes(productSearchQuery));

        return (filterProduct || products).filter(product => {
            let generateRating = Math.floor((product.rating) % 5) || 5;
            var min = Math.min(...price);
            var max = Math.max(...price);

            return (
                ((category === "ALL" && product) || (category === null || product.category === category))
                && (rating === null || generateRating >= ((+rating)))
                && (fast === false || product.delivery === true)
                && ((!price[0] && !price[1]) || (product.price >= min && product.price <= max))
            );
        });

    };

    const sortedByFunction = () => {

        if (sortedBy === 'ATOZ') {
            return (filteredFunction()?.sort((a, b) => a.title.localeCompare(b.title)));
        }
        if (sortedBy === 'ZTOA') {
            return (filteredFunction()?.sort((a, b) => b.title.localeCompare(a.title)));
        }
        if (sortedBy === 'ASCENDING') {
            return (filteredFunction().sort((a, b) => { return a.price - b.price; }));
        }
        if (sortedBy === 'DESCENDING') {
            return (filteredFunction().sort((a, b) => { return b.price - a.price; }));
        }
        if (sortedBy === 'rating') {
            return (
                filteredFunction().sort((a, b) => {
                    let first = Math.floor((a.rating) % 5) || 5;
                    let second = Math.floor((b.rating) % 5) || 5;
                    return second - first;
                })
            );
        }
    };

    const handleProductSearch = (value) => {
        let filterProduct = filteredFunction().filter((item) => item.title.toLowerCase().includes(value));
        setFilterBy((prev) => ({ ...prev, productSearchQuery: value }));
        setFilterBy((prev) => ({ ...prev, productSearch: filterProduct }));
        setPageNo(1);

    };

    const handleFilterBox = () => {
        setFilterBox(true);
    };

    const handlePage = (page) => {
        setPageNo(page);
    };

    console.log(FilterBy);

    if (status === STATUES.LOADING) {
        return (
            <div className='loading'>
                <h1 style={{ 'color': "#228b22" }} >Loading....</h1>
            </div>
        );
    }
    return (
        <div className="container">
            <div className={filterBox ? 'leftBar active' : "leftBar"}>
                <div className="cross " onClick={() => {
                    setFilterBox(false);

                }}>
                    <span><i class="fa-sharp fa-solid fa-xmark"></i></span>
                </div>
                <div className="search">
                    <input type="search" name='search' value={FilterBy.Query} placeholder='search category' onChange={(e) => {
                        handleSearch(e.target.value);
                    }} />
                </div>
                <div className="innerLeft">
                    <div className="category">
                        <h3>category</h3>
                        {
                            (FilterBy.filterCategory?.length > 0 ? FilterBy.filterCategory : uniqueCategories).map((item, index) => {
                                return (
                                    <span key={index} className={FilterBy.activeCategory === item ? 'active' : ""} onClick={() => { SingleCategory(index + 1, item); }}>{item}</span>
                                );
                            })

                        }
                    </div>
                    <div className="company">
                        <h3>Delivery</h3>
                        <div className="checkBox">
                            <span>Fast</span>
                            <input value={FilterBy.fast} checked={FilterBy.fast} type="checkbox" onChange={(e) => { handleFastDelivery("fast"); }} />
                        </div>
                    </div>
                    <div className="price">
                        <h3>Price</h3>
                        <Box sx={{ width: 200 }}>
                            <Slider
                                getAriaLabel={() => 'Temperature range'}
                                value={initialPriceRange}
                                onChange={handlePriceRange}
                                valueLabelDisplay="auto"
                                min={0}
                                max={maxPrice ? maxPrice : maximumPrice}
                                step={10}
                            />
                        </Box>
                    </div>
                    <div className="starBox">
                        <h3>Rating</h3>
                        <Rating value={FilterBy.rating} onChange={(e) => {
                            setFilterBy((prev) => ({ ...prev, rating: e.target.value }));
                            ; handleStartClick(e);
                        }} />
                    </div>
                    <div className="clear">
                        <button onClick={handleClear}>Clear</button>
                    </div>
                </div>
            </div>
            <div className="rightBar">
                <div className="productSearch">
                    <input type="text" placeholder='product search...' onChange={(e) => { handleProductSearch(e.target.value); }} />
                </div>
                <div className='sortDiv'>
                    <div className='totalCount'>
                        <span style={{ "color": "forestgreen" }}>{filteredFunction().length}</span>
                        <span >Products Found</span>
                    </div>
                    <div className="select-dropdown">
                        <div className="sortedBy">
                            <span><button className='Filter' onClick={handleFilterBox}>Filters</button></span>
                        </div>
                        <div className='select'>
                            <select value={sortedBy} onChange={(e) => { HandleSelect(e); }}>
                                <option name='' >Default</option>
                                <option value="rating" name=''>Rating</option>
                                <option value="ASCENDING" name=''>Price(lowest)</option>
                                <option value="DESCENDING" name=''>Price(Highest)</option>
                                <option value="ATOZ" name=''>Name(A-Z)</option>
                                <option value="ZTOA" name=''>Name(Z-A)</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="AllProduct">
                    {
                        ((sortedByFunction() || filteredFunction()))?.length > 0 ?
                            (sortedByFunction() || filteredFunction())?.slice(PageNo * 10 - 10, PageNo * 10).map((item, index) => { return <SingleProduct item={item} id={index} />; })
                            :
                            <div className="product_not_found">
                                <p>Sorry, no products matched your search.</p>
                            </div>
                    }
                </div>
                <div className='pages'>
                    <div className="prev">
                        {
                            <span onClick={() => { setPageNo(prev => prev === 1 ? 1 : prev - 1); }}><KeyboardArrowLeftIcon /></span>
                        }
                    </div>
                    <div className="pageNo">
                        {
                            [...Array(Math.ceil(((sortedByFunction() || filteredFunction()))?.length / 10))]
                                .map((singleStar, index) => {

                                    return (

                                        <span className={PageNo === index + 1 ? 'active' : ''} onClick={() => { handlePage(index + 1); }}>{index + 1}</span>

                                    );
                                })
                        }
                    </div>
                    <div className="next">
                        {
                            <span
                                onClick={
                                    () => {
                                        setPageNo(prev => prev === Math.ceil(((sortedByFunction() || filteredFunction()))?.length / 10) ?
                                            Math.ceil(((sortedByFunction() || filteredFunction()))?.length / 10) : prev + 1);
                                    }
                                }>
                                <NavigateNextIcon />
                            </span>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;