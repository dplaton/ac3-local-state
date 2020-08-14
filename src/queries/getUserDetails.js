import {gql} from '@apollo/client';

export default gql`
    query {
        customer {
            firstname
            lastname
        }
    }
`;
