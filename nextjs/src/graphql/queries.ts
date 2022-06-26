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

export const CHANNELS = gql`
    query {
        channels {
            id
            name
            type
            password
            messages {
                id
                profile {
                    id
                    username
                }
                text
                updated_at
            }
            partecipants {
                profile {
                    id
                    username
                }
                role
            }
        }
    }
`;