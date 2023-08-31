import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { message } from 'antd';
import { currentOrg } from '@/utils';
import { AUTH_TOKEN } from './constants';

let uri = `http://${window.location.hostname}:3000/graphql`;

if (process.env.NODE_ENV === 'production') {
  uri = 'https://it-run.com/graphql';
}

const httpLink = createHttpLink({
  // uri: '//localhost:3000/graphql',
  uri,
});

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem(AUTH_TOKEN) || localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
      orgId: currentOrg()?.value,
    },
  };
});

const errorLink = onError(({
  graphQLErrors,
  networkError,
}) => {
  if (graphQLErrors) {
    message.error('Format of req params or data returned is wrong');
    graphQLErrors.forEach((item) => {
      if (item.message === 'Unauthorized') {
        message.error('Auth expired! Please log in');
      }
    });
  }
  if (networkError) {
    message.error(networkError.message);
  }
});

export const client = new ApolloClient({
  // uri: 'http://localhost:3000/graphql',
  // link: authLink.concat(httpLink),
  link: errorLink.concat(authLink.concat(httpLink)),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
    },
  },
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
