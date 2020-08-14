import {ApolloClient} from '@apollo/client';
import cache from './cache';

console.log(process.env);
const uri = process.env.REACT_APP_GRAPHQL_ENDPOINT;

console.log(`Client endpoint is ${uri}`);
export default new ApolloClient({
    uri,
    cache,
    connectToDevTools: true,
});
