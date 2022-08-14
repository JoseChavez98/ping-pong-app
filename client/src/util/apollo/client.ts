import { ApolloClient, InMemoryCache } from '@apollo/client'
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist'

export const cache = new InMemoryCache({
  // addTypename: false,
})

persistCache({
  cache,
  storage: new LocalStorageWrapper(window.localStorage)
})
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache
})

export default client
