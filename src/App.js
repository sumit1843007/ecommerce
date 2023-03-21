import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from "./store/store";
import { Provider } from 'react-redux';
import Cart from './components/cart/Cart';
import SingleProductPage from './components/singleProductPage/SingleProductPage';
import ProductsPage from './components/ProductsPage';
import PlaceItem from './components/placeItems/PlaceItem';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<ProductsPage />}></Route>
            <Route exact path="/order" element={<PlaceItem />}></Route>
            <Route exact path="/singlePage/:selectedId" element={<SingleProductPage />}></Route>
            <Route exact path="/cart" element={<Cart />}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
