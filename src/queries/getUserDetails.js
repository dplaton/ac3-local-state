import {gql} from '@apollo/client';

export default gql`
    query GetUserDetails {
        customer {
            firstname
            lastname
        }
    }
`;
