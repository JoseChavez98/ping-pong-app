import Users from './data/users';
import Games from './data/games';
import find from 'lodash/find';
import filter from 'lodash/filter';
import sumBy from 'lodash/sumBy';
import {
GraphQLInt,
        GraphQLBoolean,
        GraphQLString,
        GraphQLList,
        GraphQLObjectType,
        GraphQLNonNull,
        GraphQLSchema,
} from 'graphql';

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Users',
    fields: () => ({
            id: {type: new GraphQLNonNull(GraphQLInt)},
            first_name: {type: new GraphQLNonNull(GraphQLString)},
            last_name: {type: new GraphQLNonNull(GraphQLString)},
            email: {type: GraphQLString},
            country: {type: new GraphQLNonNull(GraphQLString)},
            games: {
                type: new GraphQLList(GameType),
                resolve: (user, args) => {
                    return filter(Games, game => game.userId === user.id);
                }
            }
        })
});

const GameType = new GraphQLObjectType({
    name: 'Game',
    description: 'Game',
    fields: () => ({
            id: {type: new GraphQLNonNull(GraphQLInt)},
            title: {type: GraphQLString},
            completed: {type: new GraphQLNonNull(GraphQLBoolean)},
            user: {
                type: UserType,
                resolve: (todo, args) => {
                    return find(Users, user => user.id === todo.userId);
                }
            }
        })
});

const PingPongQueryRootType = new GraphQLObjectType({
    name: 'PingPongAppSchema',
    description: 'Root PingPong App Schema',
    fields: () => ({
            users: {
                args: {
                    first_name: {type: GraphQLString},
                    last_name: {type: GraphQLString},
                    country: {type: GraphQLString},
                },
                type: new GraphQLList(UserType),
                description: 'List of Users',
                resolve: (parent, args) => {
                    if (Object.keys(args).length) {
                        return filter(Users, args);
                    }
                    return Users;
                }
            },
            games: {
                args: {
                    userId: {type: GraphQLInt},
                    completed: {type: GraphQLBoolean},
                },
                type: new GraphQLList(GameType),
                description: 'List of Games',
                resolve: (parent, args) => {
                    if (Object.keys(args).length) {
                        return filter(Games, args);
                    }
                    return Games;
                }
            }
        })
});

const schema = new GraphQLSchema({
    query: PingPongQueryRootType,
});

export default schema;
