import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Game */
export type Game = {
  __typename?: 'Game';
  completed: Scalars['Boolean'];
  id: Scalars['Int'];
  title?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

/** Root PingPong App Schema */
export type PingPongAppSchema = {
  __typename?: 'PingPongAppSchema';
  /** List of Games */
  games?: Maybe<Array<Maybe<Game>>>;
  /** List of Users */
  users?: Maybe<Array<Maybe<User>>>;
};


/** Root PingPong App Schema */
export type PingPongAppSchemaGamesArgs = {
  completed?: InputMaybe<Scalars['Boolean']>;
  userId?: InputMaybe<Scalars['Int']>;
};


/** Root PingPong App Schema */
export type PingPongAppSchemaUsersArgs = {
  country?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  last_name?: InputMaybe<Scalars['String']>;
};

/** Users */
export type User = {
  __typename?: 'User';
  country: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  first_name: Scalars['String'];
  games?: Maybe<Array<Maybe<Game>>>;
  id: Scalars['Int'];
  last_name: Scalars['String'];
};

export type GetGamesQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']>;
  completed?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetGamesQuery = { __typename?: 'PingPongAppSchema', games?: Array<{ __typename?: 'Game', id: number } | null> | null };


export const GetGamesDocument = gql`
    query GetGames($userId: Int, $completed: Boolean) {
  games(userId: $userId, completed: $completed) {
    id
  }
}
    `;

/**
 * __useGetGamesQuery__
 *
 * To run a query within a React component, call `useGetGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGamesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      completed: // value for 'completed'
 *   },
 * });
 */
export function useGetGamesQuery(baseOptions?: Apollo.QueryHookOptions<GetGamesQuery, GetGamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGamesQuery, GetGamesQueryVariables>(GetGamesDocument, options);
      }
export function useGetGamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGamesQuery, GetGamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGamesQuery, GetGamesQueryVariables>(GetGamesDocument, options);
        }
export type GetGamesQueryHookResult = ReturnType<typeof useGetGamesQuery>;
export type GetGamesLazyQueryHookResult = ReturnType<typeof useGetGamesLazyQuery>;
export type GetGamesQueryResult = Apollo.QueryResult<GetGamesQuery, GetGamesQueryVariables>;