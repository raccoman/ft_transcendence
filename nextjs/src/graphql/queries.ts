import { gql } from '@apollo/client';

export const profiles_by_pk = gql`
    query profiles_by_pk($id: Int!) {
        profiles_by_pk(id: $id) {
            id
            username
            email
            avatar
            gems
        }
    }
`;