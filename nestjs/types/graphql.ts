
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
}

export interface JoinChannelInput {
    id: string;
    password?: Nullable<string>;
}

export interface SendMessageInput {
    id: string;
    text: string;
}

export interface UpsertPunishmentInput {
    channel_id: string;
    profile_id: number;
    removed?: Nullable<boolean>;
    type: string;
}

export interface Channel {
    id: string;
    messages: Message[];
    name: string;
    partecipants: Partecipant[];
    password?: Nullable<string>;
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
    create_channel(input: CreateChannelInput): Channel | Promise<Channel>;
    join_channel(input: JoinChannelInput): Channel | Promise<Channel>;
    leave_channel(id: string): Channel | Promise<Channel>;
    send_message(input: SendMessageInput): Channel | Promise<Channel>;
    upsert_punishment(input: UpsertPunishmentInput): Channel | Promise<Channel>;
}

export interface Partecipant {
    banned: boolean;
    channel: Channel;
    channel_id: string;
    id: string;
    muted: boolean;
    profile: Profile;
    profile_id: number;
    role: string;
}

export interface Profile {
    avatar: string;
    email: string;
    gems: number;
    id: number;
    rp: number;
    updated_at: DateTime;
    username: string;
}

export interface IQuery {
    channels(): Channel[] | Promise<Channel[]>;
    me(): Nullable<Profile> | Promise<Nullable<Profile>>;
}

export interface ISubscription {
    channel(): Channel | Promise<Channel>;
}

export type DateTime = any;
type Nullable<T> = T | null;
