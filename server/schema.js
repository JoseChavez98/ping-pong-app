import Users from './data/users'
import Games, { addGame } from './data/games'
import find from 'lodash/find'
import filter from 'lodash/filter'
import sumBy from 'lodash/sumBy'
import {
  GraphQLInt,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLInputObjectType
} from 'graphql'

let localGames = [...Games]

const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Users',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    first_name: { type: new GraphQLNonNull(GraphQLString) },
    last_name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLString },
    country: { type: new GraphQLNonNull(GraphQLString) },
    gender: { type: new GraphQLNonNull(GraphQLString) },
    won_games: {
      type: new GraphQLList(GameType),
      resolve: (user, args) => {
        return filter(localGames, (game) => game.winner_id === user.id)
      }
    }
  })
})

const UserInputType = new GraphQLInputObjectType({
  name: 'UserInputType',
  description: 'Users',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    first_name: { type: new GraphQLNonNull(GraphQLString) },
    last_name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLString },
    country: { type: new GraphQLNonNull(GraphQLString) },
    gender: { type: new GraphQLNonNull(GraphQLString) },
    won_games: {
      type: new GraphQLList(GameType),
      resolve: (user, args) => {
        return filter(localGames, (game) => game.winner_id === user.id)
      }
    }
  })
})

const GameType = new GraphQLObjectType({
  name: 'Game',
  description: 'Game',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    details: { type: GraphQLString },
    completed: { type: new GraphQLNonNull(GraphQLBoolean) },
    first_user: { type: new GraphQLNonNull(UserType) },
    second_user: { type: new GraphQLNonNull(UserType) },
    winner_id: { type: new GraphQLNonNull(GraphQLInt) }
  })
})

const GameInputType = new GraphQLInputObjectType({
  name: 'GameInputType',
  description: 'Game',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) },
    details: { type: GraphQLString },
    completed: { type: new GraphQLNonNull(GraphQLBoolean) },
    first_user: { type: new GraphQLNonNull(UserInputType) },
    second_user: { type: new GraphQLNonNull(UserInputType) },
    winner_id: { type: new GraphQLNonNull(GraphQLInt) }
  })
})

const PingPongQueryRootType = new GraphQLObjectType({
  name: 'PingPongAppSchema',
  description: 'Root PingPong App Schema',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      description: 'List of Users',
      resolve: (parent, args) => {
        if (Object.keys(args).length) {
          return filter(Users, args)
        }
        return Users
      }
    },
    games: {
      type: new GraphQLList(GameType),
      description: 'List of Games',
      resolve: (parent, args) => {
        if (Object.keys(args).length) {
          return filter(localGames, args)
        }
        return localGames
      }
    }
  })
})

const UserInput = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: () => ({
    first_name: { type: new GraphQLNonNull(GraphQLString) },
    last_name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    country: { type: new GraphQLNonNull(GraphQLString) },
    gender: { type: new GraphQLNonNull(GraphQLString) }
  })
})

const GameInput = new GraphQLInputObjectType({
  name: 'GameInput',
  fields: () => ({
    first_user_id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    second_user_id: {
      type: new GraphQLNonNull(GraphQLInt)
    },
    winner_id: { type: new GraphQLNonNull(GraphQLInt) },
    details: { type: new GraphQLNonNull(GraphQLString) },
    completed: { type: new GraphQLNonNull(GraphQLBoolean) }
  })
})

const UserPayload = new GraphQLObjectType({
  name: 'UserPayload',
  fields: () => ({
    user: { type: UserType }
  })
})

const GamePayload = new GraphQLObjectType({
  name: 'GamePayload',
  fields: () => ({
    game: { type: GameType }
  })
})

const PingPongMutationsRootType = new GraphQLObjectType({
  name: 'PingPongMutations',
  description: 'PingPongMutations',
  fields: () => ({
    userCreate: {
      type: UserPayload,
      args: {
        input: { type: new GraphQLNonNull(UserInput) }
      },
      resolve: async (source, { input }) => {
        return input
      }
    },
    gameCreate: {
      type: GamePayload,
      args: {
        input: { type: new GraphQLNonNull(GameInput) }
      },
      resolve: async (source, { input }) => {
        if (input) {
          let newGame = {
            id: localGames[localGames.length - 1].id + 1,
            first_user: Users.find((user) => user.id === input.first_user_id),
            second_user: Users.find((user) => user.id === input.second_user_id),
            winner_id: input.completed ? input.winner_id : 0,
            details: input.details,
            completed: input.completed
          }
          localGames = [...localGames, newGame]
          return newGame
        }
      }
    }
  })
})

const schema = new GraphQLSchema({
  query: PingPongQueryRootType,
  mutation: PingPongMutationsRootType
})

export default schema
