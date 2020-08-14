import {gql} from '@apollo/client';

export default gql`
    query GetByCategory($categoryName: String!) {
        categoryList(filters: {name: {match: $categoryName}}) {
            name
            products {
                items {
                    sku
                    name
                    description {
                        html
                    }
                    media_gallery {
                        url
                    }
                }
            }
        }
    }
`;
