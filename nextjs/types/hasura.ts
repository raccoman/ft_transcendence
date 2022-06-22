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
  json: any;
  timestamptz: any;
  uuid: any;
};

export type Int_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _cast?: InputMaybe<Int_Cast_Exp>;
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "channels" */
export type Channels = {
  __typename?: 'channels';
  id: Scalars['uuid'];
  members: Scalars['json'];
  messsages: Scalars['json'];
  mode: Scalars['String'];
  name: Scalars['String'];
};


/** columns and relationships of "channels" */
export type ChannelsMembersArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "channels" */
export type ChannelsMesssagesArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "channels" */
export type Channels_Aggregate = {
  __typename?: 'channels_aggregate';
  aggregate?: Maybe<Channels_Aggregate_Fields>;
  nodes: Array<Channels>;
};

/** aggregate fields of "channels" */
export type Channels_Aggregate_Fields = {
  __typename?: 'channels_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Channels_Max_Fields>;
  min?: Maybe<Channels_Min_Fields>;
};


/** aggregate fields of "channels" */
export type Channels_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Channels_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "channels". All fields are combined with a logical 'AND'. */
export type Channels_Bool_Exp = {
  _and?: InputMaybe<Array<Channels_Bool_Exp>>;
  _not?: InputMaybe<Channels_Bool_Exp>;
  _or?: InputMaybe<Array<Channels_Bool_Exp>>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  members?: InputMaybe<Json_Comparison_Exp>;
  messsages?: InputMaybe<Json_Comparison_Exp>;
  mode?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "channels" */
export enum Channels_Constraint {
  /** unique or primary key constraint on columns "id" */
  ChannelsPkey = 'channels_pkey'
}

/** input type for inserting data into table "channels" */
export type Channels_Insert_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  members?: InputMaybe<Scalars['json']>;
  messsages?: InputMaybe<Scalars['json']>;
  mode?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Channels_Max_Fields = {
  __typename?: 'channels_max_fields';
  id?: Maybe<Scalars['uuid']>;
  mode?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Channels_Min_Fields = {
  __typename?: 'channels_min_fields';
  id?: Maybe<Scalars['uuid']>;
  mode?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "channels" */
export type Channels_Mutation_Response = {
  __typename?: 'channels_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Channels>;
};

/** on_conflict condition type for table "channels" */
export type Channels_On_Conflict = {
  constraint: Channels_Constraint;
  update_columns?: Array<Channels_Update_Column>;
  where?: InputMaybe<Channels_Bool_Exp>;
};

/** Ordering options when selecting data from "channels". */
export type Channels_Order_By = {
  id?: InputMaybe<Order_By>;
  members?: InputMaybe<Order_By>;
  messsages?: InputMaybe<Order_By>;
  mode?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: channels */
export type Channels_Pk_Columns_Input = {
  id: Scalars['uuid'];
};

/** select columns of table "channels" */
export enum Channels_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Members = 'members',
  /** column name */
  Messsages = 'messsages',
  /** column name */
  Mode = 'mode',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "channels" */
export type Channels_Set_Input = {
  id?: InputMaybe<Scalars['uuid']>;
  members?: InputMaybe<Scalars['json']>;
  messsages?: InputMaybe<Scalars['json']>;
  mode?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

/** update columns of table "channels" */
export enum Channels_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Members = 'members',
  /** column name */
  Messsages = 'messsages',
  /** column name */
  Mode = 'mode',
  /** column name */
  Name = 'name'
}

export type Json_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "json". All fields are combined with logical 'AND'. */
export type Json_Comparison_Exp = {
  _cast?: InputMaybe<Json_Cast_Exp>;
  _eq?: InputMaybe<Scalars['json']>;
  _gt?: InputMaybe<Scalars['json']>;
  _gte?: InputMaybe<Scalars['json']>;
  _in?: InputMaybe<Array<Scalars['json']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['json']>;
  _lte?: InputMaybe<Scalars['json']>;
  _neq?: InputMaybe<Scalars['json']>;
  _nin?: InputMaybe<Array<Scalars['json']>>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "channels" */
  delete_channels?: Maybe<Channels_Mutation_Response>;
  /** delete single row from the table: "channels" */
  delete_channels_by_pk?: Maybe<Channels>;
  /** delete data from the table: "profiles" */
  delete_profiles?: Maybe<Profiles_Mutation_Response>;
  /** delete single row from the table: "profiles" */
  delete_profiles_by_pk?: Maybe<Profiles>;
  /** insert data into the table: "channels" */
  insert_channels?: Maybe<Channels_Mutation_Response>;
  /** insert a single row into the table: "channels" */
  insert_channels_one?: Maybe<Channels>;
  /** insert data into the table: "profiles" */
  insert_profiles?: Maybe<Profiles_Mutation_Response>;
  /** insert a single row into the table: "profiles" */
  insert_profiles_one?: Maybe<Profiles>;
  /** update data of the table: "channels" */
  update_channels?: Maybe<Channels_Mutation_Response>;
  /** update single row of the table: "channels" */
  update_channels_by_pk?: Maybe<Channels>;
  /** update data of the table: "profiles" */
  update_profiles?: Maybe<Profiles_Mutation_Response>;
  /** update single row of the table: "profiles" */
  update_profiles_by_pk?: Maybe<Profiles>;
};


/** mutation root */
export type Mutation_RootDelete_ChannelsArgs = {
  where: Channels_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Channels_By_PkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_ProfilesArgs = {
  where: Profiles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Profiles_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootInsert_ChannelsArgs = {
  objects: Array<Channels_Insert_Input>;
  on_conflict?: InputMaybe<Channels_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Channels_OneArgs = {
  object: Channels_Insert_Input;
  on_conflict?: InputMaybe<Channels_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ProfilesArgs = {
  objects: Array<Profiles_Insert_Input>;
  on_conflict?: InputMaybe<Profiles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Profiles_OneArgs = {
  object: Profiles_Insert_Input;
  on_conflict?: InputMaybe<Profiles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_ChannelsArgs = {
  _set?: InputMaybe<Channels_Set_Input>;
  where: Channels_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Channels_By_PkArgs = {
  _set?: InputMaybe<Channels_Set_Input>;
  pk_columns: Channels_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ProfilesArgs = {
  _inc?: InputMaybe<Profiles_Inc_Input>;
  _set?: InputMaybe<Profiles_Set_Input>;
  where: Profiles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Profiles_By_PkArgs = {
  _inc?: InputMaybe<Profiles_Inc_Input>;
  _set?: InputMaybe<Profiles_Set_Input>;
  pk_columns: Profiles_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "profiles" */
export type Profiles = {
  __typename?: 'profiles';
  avatar: Scalars['String'];
  email: Scalars['String'];
  gems: Scalars['Int'];
  id: Scalars['Int'];
  last_activity: Scalars['timestamptz'];
  username: Scalars['String'];
};

/** aggregated selection of "profiles" */
export type Profiles_Aggregate = {
  __typename?: 'profiles_aggregate';
  aggregate?: Maybe<Profiles_Aggregate_Fields>;
  nodes: Array<Profiles>;
};

/** aggregate fields of "profiles" */
export type Profiles_Aggregate_Fields = {
  __typename?: 'profiles_aggregate_fields';
  avg?: Maybe<Profiles_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Profiles_Max_Fields>;
  min?: Maybe<Profiles_Min_Fields>;
  stddev?: Maybe<Profiles_Stddev_Fields>;
  stddev_pop?: Maybe<Profiles_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Profiles_Stddev_Samp_Fields>;
  sum?: Maybe<Profiles_Sum_Fields>;
  var_pop?: Maybe<Profiles_Var_Pop_Fields>;
  var_samp?: Maybe<Profiles_Var_Samp_Fields>;
  variance?: Maybe<Profiles_Variance_Fields>;
};


/** aggregate fields of "profiles" */
export type Profiles_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Profiles_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Profiles_Avg_Fields = {
  __typename?: 'profiles_avg_fields';
  gems?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "profiles". All fields are combined with a logical 'AND'. */
export type Profiles_Bool_Exp = {
  _and?: InputMaybe<Array<Profiles_Bool_Exp>>;
  _not?: InputMaybe<Profiles_Bool_Exp>;
  _or?: InputMaybe<Array<Profiles_Bool_Exp>>;
  avatar?: InputMaybe<String_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  gems?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  last_activity?: InputMaybe<Timestamptz_Comparison_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "profiles" */
export enum Profiles_Constraint {
  /** unique or primary key constraint on columns "id" */
  ProfilesPkey = 'profiles_pkey'
}

/** input type for incrementing numeric columns in table "profiles" */
export type Profiles_Inc_Input = {
  gems?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "profiles" */
export type Profiles_Insert_Input = {
  avatar?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  gems?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  last_activity?: InputMaybe<Scalars['timestamptz']>;
  username?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Profiles_Max_Fields = {
  __typename?: 'profiles_max_fields';
  avatar?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  gems?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  last_activity?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Profiles_Min_Fields = {
  __typename?: 'profiles_min_fields';
  avatar?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  gems?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  last_activity?: Maybe<Scalars['timestamptz']>;
  username?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "profiles" */
export type Profiles_Mutation_Response = {
  __typename?: 'profiles_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Profiles>;
};

/** on_conflict condition type for table "profiles" */
export type Profiles_On_Conflict = {
  constraint: Profiles_Constraint;
  update_columns?: Array<Profiles_Update_Column>;
  where?: InputMaybe<Profiles_Bool_Exp>;
};

/** Ordering options when selecting data from "profiles". */
export type Profiles_Order_By = {
  avatar?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  gems?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_activity?: InputMaybe<Order_By>;
  username?: InputMaybe<Order_By>;
};

/** primary key columns input for table: profiles */
export type Profiles_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "profiles" */
export enum Profiles_Select_Column {
  /** column name */
  Avatar = 'avatar',
  /** column name */
  Email = 'email',
  /** column name */
  Gems = 'gems',
  /** column name */
  Id = 'id',
  /** column name */
  LastActivity = 'last_activity',
  /** column name */
  Username = 'username'
}

/** input type for updating data in table "profiles" */
export type Profiles_Set_Input = {
  avatar?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  gems?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  last_activity?: InputMaybe<Scalars['timestamptz']>;
  username?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Profiles_Stddev_Fields = {
  __typename?: 'profiles_stddev_fields';
  gems?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Profiles_Stddev_Pop_Fields = {
  __typename?: 'profiles_stddev_pop_fields';
  gems?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Profiles_Stddev_Samp_Fields = {
  __typename?: 'profiles_stddev_samp_fields';
  gems?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Profiles_Sum_Fields = {
  __typename?: 'profiles_sum_fields';
  gems?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "profiles" */
export enum Profiles_Update_Column {
  /** column name */
  Avatar = 'avatar',
  /** column name */
  Email = 'email',
  /** column name */
  Gems = 'gems',
  /** column name */
  Id = 'id',
  /** column name */
  LastActivity = 'last_activity',
  /** column name */
  Username = 'username'
}

/** aggregate var_pop on columns */
export type Profiles_Var_Pop_Fields = {
  __typename?: 'profiles_var_pop_fields';
  gems?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Profiles_Var_Samp_Fields = {
  __typename?: 'profiles_var_samp_fields';
  gems?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Profiles_Variance_Fields = {
  __typename?: 'profiles_variance_fields';
  gems?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "channels" */
  channels: Array<Channels>;
  /** fetch aggregated fields from the table: "channels" */
  channels_aggregate: Channels_Aggregate;
  /** fetch data from the table: "channels" using primary key columns */
  channels_by_pk?: Maybe<Channels>;
  /** fetch data from the table: "profiles" */
  profiles: Array<Profiles>;
  /** fetch aggregated fields from the table: "profiles" */
  profiles_aggregate: Profiles_Aggregate;
  /** fetch data from the table: "profiles" using primary key columns */
  profiles_by_pk?: Maybe<Profiles>;
};


export type Query_RootChannelsArgs = {
  distinct_on?: InputMaybe<Array<Channels_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Channels_Order_By>>;
  where?: InputMaybe<Channels_Bool_Exp>;
};


export type Query_RootChannels_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Channels_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Channels_Order_By>>;
  where?: InputMaybe<Channels_Bool_Exp>;
};


export type Query_RootChannels_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Query_RootProfilesArgs = {
  distinct_on?: InputMaybe<Array<Profiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Profiles_Order_By>>;
  where?: InputMaybe<Profiles_Bool_Exp>;
};


export type Query_RootProfiles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Profiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Profiles_Order_By>>;
  where?: InputMaybe<Profiles_Bool_Exp>;
};


export type Query_RootProfiles_By_PkArgs = {
  id: Scalars['Int'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "channels" */
  channels: Array<Channels>;
  /** fetch aggregated fields from the table: "channels" */
  channels_aggregate: Channels_Aggregate;
  /** fetch data from the table: "channels" using primary key columns */
  channels_by_pk?: Maybe<Channels>;
  /** fetch data from the table: "profiles" */
  profiles: Array<Profiles>;
  /** fetch aggregated fields from the table: "profiles" */
  profiles_aggregate: Profiles_Aggregate;
  /** fetch data from the table: "profiles" using primary key columns */
  profiles_by_pk?: Maybe<Profiles>;
};


export type Subscription_RootChannelsArgs = {
  distinct_on?: InputMaybe<Array<Channels_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Channels_Order_By>>;
  where?: InputMaybe<Channels_Bool_Exp>;
};


export type Subscription_RootChannels_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Channels_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Channels_Order_By>>;
  where?: InputMaybe<Channels_Bool_Exp>;
};


export type Subscription_RootChannels_By_PkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootProfilesArgs = {
  distinct_on?: InputMaybe<Array<Profiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Profiles_Order_By>>;
  where?: InputMaybe<Profiles_Bool_Exp>;
};


export type Subscription_RootProfiles_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Profiles_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Profiles_Order_By>>;
  where?: InputMaybe<Profiles_Bool_Exp>;
};


export type Subscription_RootProfiles_By_PkArgs = {
  id: Scalars['Int'];
};

export type Timestamptz_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _cast?: InputMaybe<Timestamptz_Cast_Exp>;
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

export type Uuid_Cast_Exp = {
  String?: InputMaybe<String_Comparison_Exp>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _cast?: InputMaybe<Uuid_Cast_Exp>;
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};
