import { gql } from '@apollo/client';

export const subscription_channels = gql`
    subscription channels {
        channels {
            id
            members
            messsages
            mode
            name
        }
    }
`;