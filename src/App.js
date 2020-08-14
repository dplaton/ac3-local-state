import React, {useState} from 'react';

import {useMutation, useLazyQuery} from '@apollo/client';

import Container from '@material-ui/core/Container';

import SignIn from './SignIn';
import CustomerData from './CustomerData';

import GET_USER_TOKEN from './queries/getUserToken';
import GET_USER_DETAILS from './queries/getUserDetails';
import {customerStateVar} from './cache';

function App() {
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

    if (loading) {
        content = <p>Signing in...</p>;
    }

    if (userDataLoading) {
        content = <p>Loading data...</p>;
    }

    if (userData) {
        customerStateVar({
            isSignedIn: true,
            firstname: userData.customer.firstname,
            lastname: userData.customer.lastname,
        });
    }

    return (
        <Container component="main" maxWidth="xs">
            {content}
            {!signedIn && (
                <SignIn error={error} signInHandler={signInHandler} />
            )}

            {signedIn && <CustomerData />}
        </Container>
    );
}

export default App;
