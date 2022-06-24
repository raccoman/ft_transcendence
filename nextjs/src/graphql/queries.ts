import { gql } from '@apollo/client';

export const ME = gql`
    query {
        me {
            id
            username
            email
            avatar
            gems
            updated_at
        }
    }
`;