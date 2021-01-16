import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';

import useStyles from './styles';
import { commerce } from '../../lib/commerce';
import Product from '../Product/Product';

const Products = ({ onAddToCart }) => {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchProducts();
        console.log(products);
    }, []);

    async function fetchProducts() {
        const { data } = await commerce.products.list();
        setProducts(data);
    }

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify="center" spacing={4}>
                {products.length > 0 &&
                    products.map((product) => (
                        <Grid
                            item
                            key={product.id}
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                        >
                            <Product
                                product={product}
                                onAddToCart={onAddToCart}
                            />
                        </Grid>
                    ))}
            </Grid>
        </main>
    );
};

export default Products;
