import React from 'react';

import Card from '@material-ui/core/Card';
import {Typography, makeStyles} from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        padding: theme.spacing(2),
        maxWidth: 320,
    },
    header: {
        display: 'grid',
        gridTemplateColumns: '1fr auto',
    },
    title: {
        fontSize: '1.2rem',
    },
    productImage: {
        maxWidth: 150,
    },
    description: {
        fontSize: '0.9rem',
    },
}));

const ProductItem = ({
    product,
    fav,
    addToWishlist,
    removeFromWishlist,
    isUserLoggedIn,
}) => {
    const classes = useStyles();

    const handleRemoveFromWishlist = () => {
        removeFromWishlist({sku: product.sku});
    };

    const handleAddToWishlist = () => {
        addToWishlist({sku: product.sku, name: product.name});
    };

    let icon = null;
    if (isUserLoggedIn) {
        icon = fav ? (
            <FavoriteIcon onClick={handleRemoveFromWishlist} />
        ) : (
            <FavoriteBorderIcon onClick={handleAddToWishlist} />
        );
    }

    return (
        <Card className={classes.root}>
            <div className={classes.header}>
                <Typography className={classes.title}>
                    {product.name}
                </Typography>
                {icon}
            </div>
            <img
                src={product.media_gallery[0].url}
                alt={product.name}
                className={classes.productImage}
            />
            <Typography className={classes.description}>
                {product.description.html}
            </Typography>
        </Card>
    );
};

export default ProductItem;
