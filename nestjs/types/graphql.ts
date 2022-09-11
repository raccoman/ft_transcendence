
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

export interface UploadBackgroundInput {
    name: string;
    price: number;
    rarity: string;
}

export interface UpsertPunishmentInput {
    channel_id: string;
    profile_id: number;
    removed?: Nullable<boolean>;
    type: string;
}

export interface Background {
    id: string;
    name: string;
    price: number;
    rarity: string;
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
    active_bg: number;
    avatar: string;
    backgrounds: Background[];
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
    equip_background(id?: Nullable<string>): boolean | Promise<boolean>;
    join_channel(input: JoinChannelInput): Channel | Promise<Channel>;
    leave_channel(id: string): Channel | Promise<Channel>;
    purchase_background(id: string): boolean | Promise<boolean>;
    send_message(input: SendMessageInput): Channel | Promise<Channel>;
    twofa_authenticate(token: string): boolean | Promise<boolean>;
    twofa_disable(): boolean | Promise<boolean>;
    twofa_enable(): boolean | Promise<boolean>;
    twofa_refresh_secret(): boolean | Promise<boolean>;
    upload_avatar(file: Upload): boolean | Promise<boolean>;
    upload_background(file: Upload, input: UploadBackgroundInput): boolean | Promise<boolean>;
    upsert_punishment(input: UpsertPunishmentInput): Channel | Promise<Channel>;
}

export interface OnGoingMatch {
    elapsed: number;
    id: string;
    players: OnGoingMatchProfile[];
    state: string;
    type: string;
}

export interface OnGoingMatchProfile {
    avatar: string;
    id: number;
    lives: number;
    username: string;
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
    active_bg: number;
    avatar: string;
    backgrounds: Background[];
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
    backgrounds(): Background[] | Promise<Background[]>;
    channels(): Channel[] | Promise<Channel[]>;
    find_profile(id: number): Nullable<Profile> | Promise<Nullable<Profile>>;
    matches(): OnGoingMatch[] | Promise<OnGoingMatch[]>;
    me(): Nullable<MeResponse> | Promise<Nullable<MeResponse>>;
    top_100(): Profile[] | Promise<Profile[]>;
}

export interface ISubscription {
    channel(): Channel | Promise<Channel>;
    matches(): OnGoingMatch | Promise<OnGoingMatch>;
}

export type DateTime = any;
export type Upload = any;
type Nullable<T> = T | null;
