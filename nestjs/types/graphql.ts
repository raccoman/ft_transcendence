
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface JoinChannelInput {
    id: string;
    password?: Nullable<string>;
}

export interface SendMessageInput {
    id: string;
    text: string;
}

export interface Channel {
    id: string;
    messages: Message[];
    name: string;
    partecipants: Partecipant[];
    password?: Nullable<string>;
    punishments: Punishment[];
    type: string;
}

export interface Message {
    channel: Channel;
    channel_id: string;
    id: string;
    profile: Profile;
    profile_id: number;
    text: string;
    updated_at: DateTime;
}

export interface IMutation {
    create_channel(name: string): Channel | Promise<Channel>;
    join_channel(input: JoinChannelInput): Channel | Promise<Channel>;
    send_message(input: SendMessageInput): Channel | Promise<Channel>;
}

export interface Partecipant {
    channel: Channel;
    channel_id: string;
    id: string;
    profile: Profile;
    profile_id: number;
    role: string;
}

export interface Profile {
    avatar: string;
    email: string;
    gems: number;
    id: number;
    updated_at: DateTime;
    username: string;
}

export interface Punishment {
    channel: Channel;
    channel_id: string;
    duration: Timestamp;
    id: string;
    issued_at: Timestamp;
    profile: Profile;
    profile_id: number;
    type: string;
}

export interface IQuery {
    channels(): Channel[] | Promise<Channel[]>;
    me(): Nullable<Profile> | Promise<Nullable<Profile>>;
}

export interface ISubscription {
    channel(): Channel | Promise<Channel>;
}

export type DateTime = any;
export type Timestamp = any;
type Nullable<T> = T | null;
