import React from 'react';
import {useQuery} from '@apollo/client';
import {CircularProgress, makeStyles} from '@material-ui/core';

import ProductItem from './productItem';
import GET_PRODUCTS_LIST from '../queries/getProductList';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridGap: '10px',
    },
}));

const Products = (props) => {
    const classes = useStyles();
    const {data, loading, error} = useQuery(GET_PRODUCTS_LIST, {
        variables: {categoryName: 'Equipment'},
    });

    if (loading) {
        return <CircularProgress />;
    }
    console.log(`Got data`, data);
    return (
        <div className={classes.root}>
            {data &&
                data.categoryList[0].products.items.map((product) => (
                    <ProductItem key={product.sku} product={product} />
                ))}
        </div>
    );
};

export default Products;
