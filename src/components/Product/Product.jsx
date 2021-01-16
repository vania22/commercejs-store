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

const Product = ({
    product: { id, name, description, price, media },
    onAddToCart,
}) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={media.source}
                title={name}
            />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography
                        variant="h5"
                        className={classes.text}
                        gutterBottom
                        noWrap
                    >
                        {name}
                    </Typography>
                    <Typography variant="h5" className={classes.text} noWrap>
                        {price.formatted_with_code}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{ __html: description }} />
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton
                    aria-label="Add to cart"
                    onClick={() => onAddToCart(id, 1)}
                >
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Product;
