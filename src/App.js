import React, {useState} from 'react';

import {useMutation, useLazyQuery} from '@apollo/client';

import SignIn from './SignIn';
import CustomerData from './CustomerData';

import GET_USER_TOKEN from './queries/getUserToken';
import GET_USER_DETAILS from './queries/getUserDetails';
import {isUserLoggedIn} from './queries/localState';

import cache, {customerStateVar} from './cache';

import {makeStyles, Grid, CircularProgress} from '@material-ui/core';

import Products from './products/productsList';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: theme.spacing(4),
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8),
    },
}));

function App() {
    const classes = useStyles();
    const [signedIn, setSignedIn] = useState(false);

    const [generateCustomerToken, {data, error, loading}] = useMutation(
        GET_USER_TOKEN
    );

    const [
        getUserDetails,
        {data: userData, loading: userDataLoading},
    ] = useLazyQuery(GET_USER_DETAILS);

    const signInHandler = ({email, password}) => {
        generateCustomerToken({variables: {email, password}});
    };

    let content;

    if (error) {
        console.log(error);
    }
    if (data && !signedIn) {
        setSignedIn(true);
        getUserDetails({
            context: {
                headers: {
                    authorization: `Bearer ${data.generateCustomerToken.token}`,
                },
            },
        });
    }

    if (!signedIn) {
        content = <SignIn signInHandler={signInHandler} />;
    }

    if (loading || userDataLoading) {
        content = <CircularProgress />;
    }

    if (userData) {
        // we write the data to the local state using a reactive variable
        customerStateVar({
            firstname: userData.customer.firstname,
            lastname: userData.customer.lastname,
        });

        //...or we can write this data using the cache API
        cache.writeQuery({
            query: isUserLoggedIn,
            data: {
                isUserLoggedIn: true,
            },
        });
        content = <CustomerData />;
    }

    return (
        <Grid container spacing={4} justify="center" className={classes.root}>
            <Grid item xs={3}>
                {content}
            </Grid>
            <Grid item xs>
                <Products />
            </Grid>
        </Grid>
    );
}

export default App;
