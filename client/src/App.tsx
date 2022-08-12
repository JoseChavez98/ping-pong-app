import { ApolloProvider } from '@apollo/client'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import { store } from '@/store'

import client from '@/util/apollo/client'
import AppRouter from '@/routes'
import { ChakraProvider } from '@chakra-ui/react'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <ChakraProvider>
          <Router>
            <AppRouter />
          </Router>
        </ChakraProvider>
      </ReduxProvider>
    </ApolloProvider>
  )
}

export default App
