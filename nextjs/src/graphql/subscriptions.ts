import { gql } from '@apollo/client';

export const ON_CHANNEL_UPDATE = gql`
    subscription {
        channel {
            id
        }
    }
`;