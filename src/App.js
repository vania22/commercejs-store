import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { commerce } from './lib/commerce';
import Products from './components/Products/Products';
import Navbar from './components/Navbar/Navbar';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';

const App = () => {
    const [cart, setCart] = useState();

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleAddToCart = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity);
        setCart(cart);
    };

    const handleUpdateCartQty = async (productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity });
        setCart(cart);
    };

    const removeFromCart = async (productId) => {
        const { cart } = await commerce.cart.remove(productId);
        setCart(cart);
    };

    const emptyCart = async () => {
        const { cart } = await commerce.cart.empty();
        setCart(cart);
    };

    return (
        <Router>
            <Navbar totalItems={cart?.total_items} />
            <Switch>
                <Route exact path="/">
                    <Products onAddToCart={handleAddToCart} />
                </Route>
                <Route exact path="/cart">
                    <Cart
                        cart={cart}
                        updateQuantity={handleUpdateCartQty}
                        removeItem={removeFromCart}
                        emptyCart={emptyCart}
                    />
                </Route>
                <Route exact path="/checkout">
                    <Checkout cart={cart} />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
