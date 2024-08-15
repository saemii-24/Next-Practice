"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";

interface Props {
  children?: React.ReactNode;
}

export const client = new ApolloClient({
  uri: "https://beta.pokeapi.co/graphql/v1beta",
  cache: new InMemoryCache(),
});

export const NextProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <RecoilRoot>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </RecoilRoot>
    </SessionProvider>
  );
};
