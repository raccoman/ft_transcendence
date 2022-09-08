import { gql } from '@apollo/client';

export const TWOFA_AUTHENTICATE = gql`
    mutation twofa_authenticate($token: String!) {
        twofa_authenticate(token: $token)
    }
`;

export const TWOFA_REFRESH_SECRET = gql`
    mutation {
        twofa_refresh_secret
    }
`;

export const TWOFA_ENABLE = gql`
    mutation {
        twofa_enable
    }
`;

export const TWOFA_DISABLE = gql`
    mutation {
        twofa_disable
    }
`;

export const UPLOAD_AVATAR = gql`
    mutation upload_avatar($file: Upload!) {
        upload_avatar(file: $file)
    }
`;

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
        }
    }
`;

export const UPSERT_PUNISHMENT = gql`
    mutation upsert_punishment($channel_id: String!, $profile_id: Int!, $type: String!, $removed: Boolean) {
        upsert_punishment(input: { channel_id: $channel_id, profile_id: $profile_id, type: $type, removed: $removed}) {
            id
        }
    }
`;

export const PURCHASE_BACKGROUND = gql`
    mutation purchase_background($id: String!) {
        purchase_background(id: $id)
    }
`;
