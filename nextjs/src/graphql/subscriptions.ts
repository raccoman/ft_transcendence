import { gql } from '@apollo/client';

export const ON_CHANNEL_UPDATE = gql`
    subscription {
        channel {
            id
            messages {
                profile {
                    id
                    username
                }
                text
                updated_at
            }
            name
            partecipants {
                profile {
                    id
                    username
                }
                role
            }
            password
            type
        }
    }
`;