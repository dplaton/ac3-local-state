import {gql} from '@apollo/client';

export const getCustomerState = gql`
    query GetCustomerState {
        customerState @client {
            firstname
            lastname
        }
    }
`;
