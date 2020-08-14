import {gql} from '@apollo/client';

const MUTATION_GET_USER_TOKEN = gql`
    mutation generateCustomerToken($email: String!, $password: String!) {
        generateCustomerToken(email: $email, password: $password) {
            token
        }
    }
`;

export default MUTATION_GET_USER_TOKEN;
