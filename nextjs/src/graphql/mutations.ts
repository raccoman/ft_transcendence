import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
    mutation send_message($id: String!, $text: String!){
        send_message(input: { id: $id, text: $text }) {
            id
            name
            password
            type
            messages {
                profile {
                    username
                }
                text
            }
        }
    }
`;
