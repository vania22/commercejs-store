import React from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    CardActions,
    Typography,
    Button,
} from '@material-ui/core';

import useStyles from './styles';

const CartItem = ({
    product: { id, name, description, quantity, line_total: price, media },
    updateQuantity,
    removeItem,
}) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardMedia
                image={media.source}
                className={classes.media}
                alt={name}
            />
            <CardContent className={classes.cardContent}>
                <Typography variant="h5" className={classes.text} noWrap>
                    {name}
                </Typography>
                <Typography variant="h5" className={classes.text} noWrap>
                    {price.formatted_with_symbol}
                </Typography>
            </CardContent>
            <CardActions className={classes.cartActions}>
                <div className={classes.buttons}>
                    <Button
                        type="button"
                        size="small"
                        onClick={() => updateQuantity(id, quantity - 1)}
                    >
                        -
                    </Button>
                    <Typography>{quantity}</Typography>
                    <Button
                        type="button"
                        size="small"
                        onClick={() => updateQuantity(id, quantity + 1)}
                    >
                        +
                    </Button>
                </div>
                <Button
                    variant="contained"
                    type="button"
                    color="secondary"
                    style={{ marginLeft: 'auto' }}
                    onClick={() => removeItem(id)}
                >
                    Remove
                </Button>
            </CardActions>
        </Card>
    );
};

export default CartItem;
