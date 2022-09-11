import { gql } from '@apollo/client';

export const ON_CHANNEL_UPDATE = gql`
    subscription {
        channel {
            id
        }
    }
`;

export const ON_MATCH_UPDATE = gql`
    subscription {
        matches {
            id
            players {
                id
                username
                avatar
                lives
            }
            type
            state
            elapsed
        }
    }
`;