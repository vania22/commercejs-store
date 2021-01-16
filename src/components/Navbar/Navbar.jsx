import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ShoppingCart from '@material-ui/icons/ShoppingCart';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
} from '@material-ui/core';

import logo from '../../assets/commerce.png';
import useStyles from './styles';

const Navbar = ({ totalItems }) => {
    const classes = useStyles();
    const { pathname } = useLocation();

    return (
        <>
            <AppBar position="fixed" className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography
                        variant="h6"
                        className={classes.title}
                        color="inherit"
                        component={Link}
                        to="/"
                    >
                        <img
                            src={logo}
                            alt="Commerce.js"
                            height="25px"
                            className={classes.image}
                        />
                        Commerce.js
                    </Typography>
                    <div className={classes.grow} />
                    {!pathname.includes('cart') && (
                        <div className={classes.cartButton}>
                            <IconButton
                                aria-label="Show cart items"
                                color="inherit"
                                component={Link}
                                to="/cart"
                            >
                                <Badge
                                    badgeContent={totalItems}
                                    color="secondary"
                                >
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;
