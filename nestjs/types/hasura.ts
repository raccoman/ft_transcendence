import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import { gql } from 'graphql-request';
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

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "profiles" */
  delete_profiles: Maybe<Profiles_Mutation_Response>;
  /** delete single row from the table: "profiles" */
  delete_profiles_by_pk: Maybe<Profiles>;
  /** insert data into the table: "profiles" */
  insert_profiles: Maybe<Profiles_Mutation_Response>;
  /** insert a single row into the table: "profiles" */
  insert_profiles_one: Maybe<Profiles>;
  /** update data of the table: "profiles" */
  update_profiles: Maybe<Profiles_Mutation_Response>;
  /** update single row of the table: "profiles" */
  update_profiles_by_pk: Maybe<Profiles>;
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
export type Mutation_RootInsert_ProfilesArgs = {
  objects: Array<Profiles_Insert_Input>;
  on_conflict: InputMaybe<Profiles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Profiles_OneArgs = {
  object: Profiles_Insert_Input;
  on_conflict: InputMaybe<Profiles_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_ProfilesArgs = {
  _inc: InputMaybe<Profiles_Inc_Input>;
  _set: InputMaybe<Profiles_Set_Input>;
  where: Profiles_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Profiles_By_PkArgs = {
  _inc: InputMaybe<Profiles_Inc_Input>;
  _set: InputMaybe<Profiles_Set_Input>;
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
  id: Scalars['Int'];
  username: Scalars['String'];
};

/** aggregated selection of "profiles" */
export type Profiles_Aggregate = {
  __typename?: 'profiles_aggregate';
  aggregate: Maybe<Profiles_Aggregate_Fields>;
  nodes: Array<Profiles>;
};

/** aggregate fields of "profiles" */
export type Profiles_Aggregate_Fields = {
  __typename?: 'profiles_aggregate_fields';
  avg: Maybe<Profiles_Avg_Fields>;
  count: Scalars['Int'];
  max: Maybe<Profiles_Max_Fields>;
  min: Maybe<Profiles_Min_Fields>;
  stddev: Maybe<Profiles_Stddev_Fields>;
  stddev_pop: Maybe<Profiles_Stddev_Pop_Fields>;
  stddev_samp: Maybe<Profiles_Stddev_Samp_Fields>;
  sum: Maybe<Profiles_Sum_Fields>;
  var_pop: Maybe<Profiles_Var_Pop_Fields>;
  var_samp: Maybe<Profiles_Var_Samp_Fields>;
  variance: Maybe<Profiles_Variance_Fields>;
};


/** aggregate fields of "profiles" */
export type Profiles_Aggregate_FieldsCountArgs = {
  columns: InputMaybe<Array<Profiles_Select_Column>>;
  distinct: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Profiles_Avg_Fields = {
  __typename?: 'profiles_avg_fields';
  id: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "profiles". All fields are combined with a logical 'AND'. */
export type Profiles_Bool_Exp = {
  _and?: InputMaybe<Array<Profiles_Bool_Exp>>;
  _not?: InputMaybe<Profiles_Bool_Exp>;
  _or?: InputMaybe<Array<Profiles_Bool_Exp>>;
  avatar?: InputMaybe<String_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  username?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "profiles" */
export enum Profiles_Constraint {
  /** unique or primary key constraint on columns "id" */
  ProfilesPkey = 'profiles_pkey'
}

/** input type for incrementing numeric columns in table "profiles" */
export type Profiles_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "profiles" */
export type Profiles_Insert_Input = {
  avatar?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Profiles_Max_Fields = {
  __typename?: 'profiles_max_fields';
  avatar: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  username: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Profiles_Min_Fields = {
  __typename?: 'profiles_min_fields';
  avatar: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  id: Maybe<Scalars['Int']>;
  username: Maybe<Scalars['String']>;
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
  id?: InputMaybe<Order_By>;
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
  Id = 'id',
  /** column name */
  Username = 'username'
}

/** input type for updating data in table "profiles" */
export type Profiles_Set_Input = {
  avatar?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  username?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Profiles_Stddev_Fields = {
  __typename?: 'profiles_stddev_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Profiles_Stddev_Pop_Fields = {
  __typename?: 'profiles_stddev_pop_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Profiles_Stddev_Samp_Fields = {
  __typename?: 'profiles_stddev_samp_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Profiles_Sum_Fields = {
  __typename?: 'profiles_sum_fields';
  id: Maybe<Scalars['Int']>;
};

/** update columns of table "profiles" */
export enum Profiles_Update_Column {
  /** column name */
  Avatar = 'avatar',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Username = 'username'
}

/** aggregate var_pop on columns */
export type Profiles_Var_Pop_Fields = {
  __typename?: 'profiles_var_pop_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Profiles_Var_Samp_Fields = {
  __typename?: 'profiles_var_samp_fields';
  id: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Profiles_Variance_Fields = {
  __typename?: 'profiles_variance_fields';
  id: Maybe<Scalars['Float']>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "profiles" */
  profiles: Array<Profiles>;
  /** fetch aggregated fields from the table: "profiles" */
  profiles_aggregate: Profiles_Aggregate;
  /** fetch data from the table: "profiles" using primary key columns */
  profiles_by_pk: Maybe<Profiles>;
};


export type Query_RootProfilesArgs = {
  distinct_on: InputMaybe<Array<Profiles_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Profiles_Order_By>>;
  where: InputMaybe<Profiles_Bool_Exp>;
};


export type Query_RootProfiles_AggregateArgs = {
  distinct_on: InputMaybe<Array<Profiles_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Profiles_Order_By>>;
  where: InputMaybe<Profiles_Bool_Exp>;
};


export type Query_RootProfiles_By_PkArgs = {
  id: Scalars['Int'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "profiles" */
  profiles: Array<Profiles>;
  /** fetch aggregated fields from the table: "profiles" */
  profiles_aggregate: Profiles_Aggregate;
  /** fetch data from the table: "profiles" using primary key columns */
  profiles_by_pk: Maybe<Profiles>;
};


export type Subscription_RootProfilesArgs = {
  distinct_on: InputMaybe<Array<Profiles_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Profiles_Order_By>>;
  where: InputMaybe<Profiles_Bool_Exp>;
};


export type Subscription_RootProfiles_AggregateArgs = {
  distinct_on: InputMaybe<Array<Profiles_Select_Column>>;
  limit: InputMaybe<Scalars['Int']>;
  offset: InputMaybe<Scalars['Int']>;
  order_by: InputMaybe<Array<Profiles_Order_By>>;
  where: InputMaybe<Profiles_Bool_Exp>;
};


export type Subscription_RootProfiles_By_PkArgs = {
  id: Scalars['Int'];
};

export type Profiles_By_PkQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type Profiles_By_PkQuery = { __typename?: 'query_root', profiles_by_pk: { __typename?: 'profiles', avatar: string, email: string, id: number, username: string } | null };

export type Insert_Profiles_OneMutationVariables = Exact<{
  id: Scalars['Int'];
  username: Scalars['String'];
  email: Scalars['String'];
  avatar: Scalars['String'];
}>;


export type Insert_Profiles_OneMutation = { __typename?: 'mutation_root', insert_profiles_one: { __typename?: 'profiles', avatar: string, email: string, username: string, id: number } | null };


export const Profiles_By_PkDocument = gql`
    query profiles_by_pk($id: Int!) {
  profiles_by_pk(id: $id) {
    avatar
    email
    id
    username
  }
}
    `;
export const Insert_Profiles_OneDocument = gql`
    mutation insert_profiles_one($id: Int!, $username: String!, $email: String!, $avatar: String!) {
  insert_profiles_one(
    object: {id: $id, username: $username, email: $email, avatar: $avatar}
  ) {
    avatar
    email
    username
    id
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    profiles_by_pk(variables: Profiles_By_PkQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Profiles_By_PkQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<Profiles_By_PkQuery>(Profiles_By_PkDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'profiles_by_pk', 'query');
    },
    insert_profiles_one(variables: Insert_Profiles_OneMutationVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<Insert_Profiles_OneMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<Insert_Profiles_OneMutation>(Insert_Profiles_OneDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'insert_profiles_one', 'mutation');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;