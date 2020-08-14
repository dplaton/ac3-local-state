import React from 'react';

import Card from '@material-ui/core/Card';
import {Typography, makeStyles, Paper} from '@material-ui/core';
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

const ProductItem = ({product}) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <div className={classes.header}>
                <Typography className={classes.title}>
                    {product.name}
                </Typography>
                <FavoriteBorderIcon />
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
