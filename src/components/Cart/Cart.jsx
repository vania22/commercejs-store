import React from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';

import makeStyles from './styles';
import CartItem from '../CartItem/CartItem';

const Cart = ({ cart }) => {
    const classes = makeStyles();
    console.log(cart);

    const EmptyCart = () => (
        <Typography variant="subtitle1">
            You have no items in your shopping cart, start adding some!
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {cart.line_items.map((product) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                        <CartItem product={product} key={product.id} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cartDetails}>
                <Typography variant="h4">
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button
                        className={classes.emptyButton}
                        size="large"
                        type="button"
                        variant="contained"
                        color="secondary"
                    >
                        Empty Cart
                    </Button>
                    <Button
                        className={classes.checkoutButton}
                        size="large"
                        type="button"
                        variant="contained"
                        color="primary"
                    >
                        Checkout
                    </Button>
                </div>
            </div>
        </>
    );

    return (
        <Container>
            <div className={classes.toolbaer} />
            <Typography className={classes.title} variant="h3" gutterBottom>
                Your shopping cart
            </Typography>
            {cart?.line_items.length > 0 ? <FilledCart /> : <EmptyCart />}
        </Container>
    );
};

export default Cart;
