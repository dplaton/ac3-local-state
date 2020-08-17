import {ApolloClient} from '@apollo/client';
import cache from './cache';

const uri = process.env.REACT_APP_GRAPHQL_ENDPOINT;

export default new ApolloClient({
    uri,
    cache,
    connectToDevTools: true,
});
