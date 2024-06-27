"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

interface Props {
  children?: React.ReactNode;
}

export const client = new ApolloClient({
  uri: "https://graphql-pokeapi.graphcdn.app/",
  cache: new InMemoryCache(),
});

export const NextProvider = ({ children }: Props) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
