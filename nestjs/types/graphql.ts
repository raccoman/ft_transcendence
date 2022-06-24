
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
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

export type DateTime = any;
type Nullable<T> = T | null;
