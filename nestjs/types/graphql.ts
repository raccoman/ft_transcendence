
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateChannelInput {
    name: string;
    password?: Nullable<string>;
    type?: Nullable<string>;
}

export interface SendMessageInput {
    channel_id: string;
    text: string;
}

export interface Channel {
    id: string;
    messages: Message[];
    name: string;
    password: string;
    type: string;
}

export interface Message {
    channel: Channel;
    channel_id: string;
    id: string;
    sender: Profile;
    sender_id: number;
    text: string;
    updated_at: DateTime;
}

export interface IMutation {
    createChannel(input: CreateChannelInput): Channel | Promise<Channel>;
    sendMessage(input: SendMessageInput): Message | Promise<Message>;
}

export interface Profile {
    avatar: string;
    email: string;
    gems: number;
    id: number;
    updated_at: DateTime;
    username: string;
}

export interface IQuery {
    me(): Nullable<Profile> | Promise<Nullable<Profile>>;
}

export interface ISubscription {
    onMessage(): Message | Promise<Message>;
}

export type DateTime = any;
type Nullable<T> = T | null;
