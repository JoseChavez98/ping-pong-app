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
  details?: Maybe<Scalars['String']>;
  first_user: User;
  id: Scalars['Int'];
  second_user: User;
  winner_id: Scalars['Int'];
};

export type GameInput = {
  completed: Scalars['Boolean'];
  details: Scalars['String'];
  first_user_id: Scalars['Int'];
  second_user_id: Scalars['Int'];
  winner_id: Scalars['Int'];
};

export type GamePayload = {
  __typename?: 'GamePayload';
  game?: Maybe<Game>;
};

/** Root PingPong App Schema */
export type PingPongAppSchema = {
  __typename?: 'PingPongAppSchema';
  /** List of Games */
  games?: Maybe<Array<Maybe<Game>>>;
  /** List of Users */
  users?: Maybe<Array<Maybe<User>>>;
};

/** PingPongMutations */
export type PingPongMutations = {
  __typename?: 'PingPongMutations';
  gameCreate?: Maybe<GamePayload>;
  userCreate?: Maybe<UserPayload>;
};


/** PingPongMutations */
export type PingPongMutationsGameCreateArgs = {
  input: GameInput;
};


/** PingPongMutations */
export type PingPongMutationsUserCreateArgs = {
  input: UserInput;
};

/** Users */
export type User = {
  __typename?: 'User';
  country: Scalars['String'];
  email?: Maybe<Scalars['String']>;
  first_name: Scalars['String'];
  gender: Scalars['String'];
  id: Scalars['Int'];
  last_name: Scalars['String'];
  won_games?: Maybe<Array<Maybe<Game>>>;
};

export type UserInput = {
  country: Scalars['String'];
  email: Scalars['String'];
  first_name: Scalars['String'];
  gender: Scalars['String'];
  last_name: Scalars['String'];
};

export type UserPayload = {
  __typename?: 'UserPayload';
  user?: Maybe<User>;
};

export type CreateGameMutationVariables = Exact<{
  firstUserId: Scalars['Int'];
  secondUserId: Scalars['Int'];
  winnerId: Scalars['Int'];
  details: Scalars['String'];
  completed: Scalars['Boolean'];
}>;


export type CreateGameMutation = { __typename?: 'PingPongMutations', gameCreate?: { __typename?: 'GamePayload', game?: { __typename?: 'Game', details?: string | null, completed: boolean, winner_id: number } | null } | null };

export type GetGamesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGamesQuery = { __typename?: 'PingPongAppSchema', games?: Array<{ __typename?: 'Game', winner_id: number, details?: string | null, completed: boolean, first_user: { __typename?: 'User', id: number, first_name: string, last_name: string, email?: string | null, gender: string }, second_user: { __typename?: 'User', id: number, first_name: string, last_name: string, email?: string | null, gender: string } } | null> | null };

export type UserItemFragment = { __typename?: 'User', id: number, first_name: string, last_name: string, email?: string | null, gender: string };

export type GetPlayersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPlayersQuery = { __typename?: 'PingPongAppSchema', users?: Array<{ __typename?: 'User', id: number, first_name: string, last_name: string, email?: string | null, gender: string } | null> | null };

export const UserItemFragmentDoc = gql`
    fragment UserItem on User {
  id
  first_name
  last_name
  email
  gender
}
    `;
export const CreateGameDocument = gql`
    mutation CreateGame($firstUserId: Int!, $secondUserId: Int!, $winnerId: Int!, $details: String!, $completed: Boolean!) {
  gameCreate(
    input: {first_user_id: $firstUserId, second_user_id: $secondUserId, winner_id: $winnerId, details: $details, completed: $completed}
  ) {
    game {
      details
      completed
      winner_id
    }
  }
}
    `;
export type CreateGameMutationFn = Apollo.MutationFunction<CreateGameMutation, CreateGameMutationVariables>;

/**
 * __useCreateGameMutation__
 *
 * To run a mutation, you first call `useCreateGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGameMutation, { data, loading, error }] = useCreateGameMutation({
 *   variables: {
 *      firstUserId: // value for 'firstUserId'
 *      secondUserId: // value for 'secondUserId'
 *      winnerId: // value for 'winnerId'
 *      details: // value for 'details'
 *      completed: // value for 'completed'
 *   },
 * });
 */
export function useCreateGameMutation(baseOptions?: Apollo.MutationHookOptions<CreateGameMutation, CreateGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGameMutation, CreateGameMutationVariables>(CreateGameDocument, options);
      }
export type CreateGameMutationHookResult = ReturnType<typeof useCreateGameMutation>;
export type CreateGameMutationResult = Apollo.MutationResult<CreateGameMutation>;
export type CreateGameMutationOptions = Apollo.BaseMutationOptions<CreateGameMutation, CreateGameMutationVariables>;
export const GetGamesDocument = gql`
    query GetGames {
  games {
    first_user {
      ...UserItem
    }
    second_user {
      ...UserItem
    }
    winner_id
    details
    completed
  }
}
    ${UserItemFragmentDoc}`;

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
export const GetPlayersDocument = gql`
    query GetPlayers {
  users {
    ...UserItem
  }
}
    ${UserItemFragmentDoc}`;

/**
 * __useGetPlayersQuery__
 *
 * To run a query within a React component, call `useGetPlayersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPlayersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPlayersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPlayersQuery(baseOptions?: Apollo.QueryHookOptions<GetPlayersQuery, GetPlayersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPlayersQuery, GetPlayersQueryVariables>(GetPlayersDocument, options);
      }
export function useGetPlayersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPlayersQuery, GetPlayersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPlayersQuery, GetPlayersQueryVariables>(GetPlayersDocument, options);
        }
export type GetPlayersQueryHookResult = ReturnType<typeof useGetPlayersQuery>;
export type GetPlayersLazyQueryHookResult = ReturnType<typeof useGetPlayersLazyQuery>;
export type GetPlayersQueryResult = Apollo.QueryResult<GetPlayersQuery, GetPlayersQueryVariables>;