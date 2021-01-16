import React from 'react';
import { Grid } from '@material-ui/core';

import Product from '../Product/Product';

const products = [
    { id: 1, name: 'Computer', description: 'Gaming computer', price: '$10' },
    { id: 2, name: 'Mouse', description: 'Gaming mouse', price: '$10' },
    { id: 3, name: 'Monitor', description: 'Gaming monitor', price: '$10' },
];

const Products = () => {
    return (
        <main>
            <Grid container justify="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </main>
    );
};

export default Products;
