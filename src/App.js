import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { commerce } from './lib/commerce';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';

const App = () => {
    const [cart, setCart] = useState();

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item.cart);
    };

    return (
        <Router>
            <Navbar totalItems={cart?.total_items} />
            <Switch>
                <Route exact path="/">
                    <Products onAddToCart={handleAddToCart} />
                </Route>
                <Route exact path="/cart">
                    <Cart cart={cart} />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
