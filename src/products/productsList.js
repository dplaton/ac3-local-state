import React from 'react';
import {useQuery} from '@apollo/client';
import {CircularProgress, makeStyles} from '@material-ui/core';

import ProductItem from './productItem';
import GET_PRODUCTS_LIST from '../queries/getProductList';
import {isUserLoggedIn, getCustomerWishlist} from '../queries/localState';
import cache from '../cache';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridGap: '10px',
    },
}));

const Products = (props) => {
    const classes = useStyles();
    const {data, loading} = useQuery(GET_PRODUCTS_LIST, {
        variables: {categoryName: 'Equipment'},
    });

    const {data: userLoggedInData} = useQuery(isUserLoggedIn);
    const {data: wishlistData} = useQuery(getCustomerWishlist);

    if (loading) {
        return <CircularProgress />;
    }

    const addToWishlist = ({sku, name}) => {
        const newItems = [...wishlistData.customerWishlist.items, {sku, name}];
        // You must be extra careful here:
        // If your data doesn't conform the query definition this call will not fail,
        // but your queries will not return anything.

        // For example, writing something like
        // data: { customerWishlist: {bogusField: { items: newItems}}}
        // will not throw an error, but it will cause subsequent queries to customerWishlist to fail
        cache.writeQuery({
            query: getCustomerWishlist,
            data: {
                customerWishlist: {items: newItems},
            },
        });
    };

    const removeFromWishlist = ({sku}) => {
        const newItems = wishlistData.customerWishlist.items.filter(
            (item) => item.sku !== sku
        );
        cache.writeQuery({
            query: getCustomerWishlist,
            data: {
                customerWishlist: {items: newItems},
            },
        });
    };

    return (
        <div className={classes.root}>
            {data &&
                data.categoryList[0].products.items.map((product) => {
                    let fav;
                    if (wishlistData) {
                        fav = wishlistData.customerWishlist.items.find(
                            (item) => item.sku === product.sku
                        );
                    }

                    return (
                        <ProductItem
                            key={product.sku}
                            product={product}
                            addToWishlist={addToWishlist}
                            removeFromWishlist={removeFromWishlist}
                            fav={fav}
                            isUserLoggedIn={
                                userLoggedInData &&
                                userLoggedInData.isUserLoggedIn
                            }
                        />
                    );
                })}
        </div>
    );
};

export default Products;
