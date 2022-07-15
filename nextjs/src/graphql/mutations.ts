import { gql } from '@apollo/client';

export const CREATE_CHANNEL = gql`
    mutation create_channel($name: String!, $password: String) {
        create_channel(input: { name: $name, password: $password }) {
            id
        }
    }
`;

export const JOIN_CHANNEL = gql`
    mutation join_channel($id: String!, $password: String) {
        join_channel(input: { id: $id, password: $password }) {
            id
        }
    }
`;

export const LEAVE_CHANNEL = gql`
    mutation leave_channel($id: String!) {
        leave_channel(id: $id) {
            id
        }
    }
`;

export const SEND_MESSAGE = gql`
    mutation send_message($id: String!, $text: String!) {
        send_message(input: { id: $id, text: $text }) {
            id
            name
            password
            type
            messages {
                id
                profile {
                    id
                    username
                }
                text
                updated_at
            }
        }
    }
`;

export const UPSERT_PUNISHMENT = gql`
    mutation upsert_punishment($channel_id: String!, $profile_id: Int!, $type: String!, $removed: Boolean) {
        upsert_punishment(input: { channel_id: $channel_id, profile_id: $profile_id, type: $type, removed: $removed}) {
            id
            name
            password
            type
            messages {
                id
                profile {
                    id
                    username
                }
                text
                updated_at
            }
        }
    }
`;
