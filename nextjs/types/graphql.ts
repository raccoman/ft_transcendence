export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['String'];
  messages: Array<Message>;
  name: Scalars['String'];
  partecipants: Array<Partecipant>;
  password?: Maybe<Scalars['String']>;
  type: Scalars['String'];
};

export type CreateChannelInput = {
  name: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
};

export type JoinChannelInput = {
  id: Scalars['String'];
  password?: InputMaybe<Scalars['String']>;
};

export type Message = {
  __typename?: 'Message';
  channel: Channel;
  channel_id: Scalars['String'];
  id: Scalars['String'];
  profile: Profile;
  profile_id: Scalars['Int'];
  text: Scalars['String'];
  updated_at: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  create_channel: Channel;
  join_channel: Channel;
  leave_channel: Channel;
  send_message: Channel;
  upsert_punishment: Channel;
};


export type MutationCreate_ChannelArgs = {
  input: CreateChannelInput;
};


export type MutationJoin_ChannelArgs = {
  input: JoinChannelInput;
};


export type MutationLeave_ChannelArgs = {
  id: Scalars['String'];
};


export type MutationSend_MessageArgs = {
  input: SendMessageInput;
};


export type MutationUpsert_PunishmentArgs = {
  input: UpsertPunishmentInput;
};

export type Partecipant = {
  __typename?: 'Partecipant';
  banned: Scalars['Boolean'];
  channel: Channel;
  channel_id: Scalars['String'];
  id: Scalars['String'];
  muted: Scalars['Boolean'];
  profile: Profile;
  profile_id: Scalars['Int'];
  role: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  avatar: Scalars['String'];
  email: Scalars['String'];
  gems: Scalars['Int'];
  id: Scalars['Int'];
  updated_at: Scalars['DateTime'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  channels: Array<Channel>;
  me?: Maybe<Profile>;
};

export type SendMessageInput = {
  id: Scalars['String'];
  text: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  channel: Channel;
};

export type UpsertPunishmentInput = {
  channel_id: Scalars['String'];
  profile_id: Scalars['Int'];
  removed?: InputMaybe<Scalars['Boolean']>;
  type: Scalars['String'];
};
