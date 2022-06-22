import { gql } from '@apollo/client';

export const update_last_activity_profiles_by_pk = gql`
    mutation update_profiles_by_pk($id: Int!, $last_activity: timestamptz!) {
        update_profiles_by_pk(pk_columns: {id: $id}, _set: {last_activity: $last_activity}) {
            id
        }
    }
`;