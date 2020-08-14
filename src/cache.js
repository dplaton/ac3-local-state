import {InMemoryCache, makeVar} from '@apollo/client';

export const customerStateVar = makeVar({
    isSignedIn: false,
});

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                customerState: {
                    read() {
                        return customerStateVar();
                    },
                },
            },
        },
    },
});

export default cache;
