import React from 'react';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
    IconButton,
} from '@material-ui/core';

import useStyles from './styles';

const Product = ({ product: { price, name, description } }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image="" title={name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {name}
                    </Typography>
                    <Typography variant="h5">{price}</Typography>
                </div>
                <Typography>{description}</Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label="Add to cart">
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Product;
