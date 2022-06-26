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
  /** `Date` type as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
};

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['String'];
  messages: Array<Message>;
  name: Scalars['String'];
  partecipants: Array<Partecipant>;
  password?: Maybe<Scalars['String']>;
  punishments: Array<Punishment>;
  type: Scalars['String'];
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
  send_message: Channel;
};


export type MutationCreate_ChannelArgs = {
  name: Scalars['String'];
};


export type MutationJoin_ChannelArgs = {
  input: JoinChannelInput;
};


export type MutationSend_MessageArgs = {
  input: SendMessageInput;
};

export type Partecipant = {
  __typename?: 'Partecipant';
  channel: Channel;
  channel_id: Scalars['String'];
  id: Scalars['String'];
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

export type Punishment = {
  __typename?: 'Punishment';
  channel: Channel;
  channel_id: Scalars['String'];
  duration: Scalars['Timestamp'];
  id: Scalars['String'];
  issued_at: Scalars['Timestamp'];
  profile: Profile;
  profile_id: Scalars['Int'];
  type: Scalars['String'];
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
