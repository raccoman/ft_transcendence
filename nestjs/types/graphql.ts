
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

export interface Match {
    id: string;
    loser: Profile;
    loser_id: number;
    started_at: DateTime;
    type: string;
    winner: Profile;
    winner_id: number;
}

export interface MeResponse {
    avatar: string;
    defeats: Match[];
    email: string;
    gems: number;
    id: number;
    rp: number;
    twofa_authenticated: boolean;
    twofa_enabled: boolean;
    twofa_secret?: Nullable<string>;
    updated_at: DateTime;
    username: string;
    wins: Match[];
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
    twofa_authenticate(token: string): boolean | Promise<boolean>;
    twofa_disable(): boolean | Promise<boolean>;
    twofa_enable(): boolean | Promise<boolean>;
    twofa_refresh_secret(): boolean | Promise<boolean>;
    upload_avatar(file: Upload): boolean | Promise<boolean>;
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
    defeats: Match[];
    email: string;
    gems: number;
    id: number;
    rp: number;
    twofa_enabled: boolean;
    twofa_secret?: Nullable<string>;
    updated_at: DateTime;
    username: string;
    wins: Match[];
}

export interface IQuery {
    channels(): Channel[] | Promise<Channel[]>;
    me(): Nullable<MeResponse> | Promise<Nullable<MeResponse>>;
}

export interface ISubscription {
    channel(): Channel | Promise<Channel>;
}

export type DateTime = any;
export type Upload = any;
type Nullable<T> = T | null;
