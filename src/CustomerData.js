import React from 'react';
import {
    Card,
    CardContent,
    CircularProgress,
    Typography,
} from '@material-ui/core';
import {useQuery} from '@apollo/client';
import {getCustomerState, getCustomerWishlist} from './queries/localState';
import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
    },
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: '1.5rem',
    },
}));

const CustomerData = () => {
    const classes = useStyles();
    const {data, loading, error} = useQuery(getCustomerState);
    const {data: wishlistData, loading: wishlistLoading} = useQuery(
        getCustomerWishlist
    );

    let content;

    if (loading && wishlistLoading) {
        content = <CircularProgress />;
    }

    if (error) {
        console.log(`Error? `, error);
        content = <p>Error!</p>;
    }

    if (data && data.customerData) {
        content = (
            <Typography
                className={
                    classes.title
                }>{`Hello, ${data.customerData.firstname}`}</Typography>
        );
    }

    let wishlistContent;
    if (wishlistData && wishlistData.customerWishlist) {
        wishlistContent = `You have ${wishlistData.customerWishlist.items.length} items in your wishlist`;
    }
    return (
        <div className={classes.paper}>
            <Card className={classes.root}>
                <CardContent>{content}</CardContent>
                <CardContent>{wishlistContent}</CardContent>
            </Card>
        </div>
    );
};

export default CustomerData;
