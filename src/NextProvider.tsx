"use client";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { RecoilRoot } from "recoil";

interface Props {
  children?: React.ReactNode;
}

export const client = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
  cache: new InMemoryCache(),
});

export const NextProvider = ({ children }: Props) => {
  return (
    <RecoilRoot>
      <ApolloProvider client={client}>{children}</ApolloProvider>;
    </RecoilRoot>
  );
};
