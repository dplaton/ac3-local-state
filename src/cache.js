import {InMemoryCache, makeVar} from '@apollo/client';

export const customerStateVar = makeVar({
    isSignedIn: false,
});

const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                customerData: {
                    read() {
                        // we'll use this function to read or write data
                        return customerStateVar();
                    },
                },
                customerWishlist: {
                    read(currentData) {
                        // this type policy is optional, but highly recommended.
                        return currentData || {items: []};
                    },
                },
            },
        },
    },
});

export default cache;
