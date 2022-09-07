import { gql } from '@apollo/client';

export const ME = gql`
    query {
        me {
            id
            username
            email
            avatar
            gems
            rp
            twofa_enabled
            twofa_authenticated
            updated_at
            wins {
                id
                winner {
                    id
                    username
                }
                loser {
                    id
                    username
                }
                type
                started_at
            }
            defeats {
                id
                winner {
                    id
                    username
                }
                loser {
                    id
                    username
                }
                type
                started_at
            }
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
                muted
                banned
            }
        }
    }
`;

export const TOP_100 = gql`
    query {
        top_100 {
            id
            username
            avatar
            rp
        }
    }
`;