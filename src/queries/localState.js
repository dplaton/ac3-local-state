/**
 * These are queries made to the local state.
 * Since they contain the @client directive they will *never* reach the GraphQL endpoint
 */
import {gql} from '@apollo/client';

export const getCustomerState = gql`
    query GetCustomerState {
        customerData @client {
            firstname
            lastname
        }
    }
`;

export const getCustomerWishlist = gql`
    query GetCustomerWishlist {
        customerWishlist @client {
            items {
                sku
                name
            }
        }
    }
`;

export const isUserLoggedIn = gql`
    query IsUserLoggedIn @client {
        isUserLoggedIn
    }
`;
