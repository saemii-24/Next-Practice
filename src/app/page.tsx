"use client";
// import Pokemon from "@/components/Pokemon";

import Card from "@/components/Card";
import Header from "@/components/Header";
import { header } from "@/props/props";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "@/query/Pokemon";
import { pokemonInterface } from "@/types/type";
import { useInView } from "react-intersection-observer";
import { signOut, useSession } from "next-auth/react";

const limit = 10;
export default function Home() {
  let [offset, setOffset] = useState<number>(0);

  const { loading, error, data, fetchMore } = useQuery(GET_POKEMONS, {
    variables: {
      offset,
      limit,
    },
  });

  const [pokemons, setPokemons] = useState<null | pokemonInterface[]>(null);

  useEffect(() => {
    if (data) {
      setPokemons(data.pokemon_v2_pokemonspeciesname);
    }
  }, [data]);

  const [ref, inView] = useInView();

  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session);
    if (status === "loading") {
      // 로딩 중일 때는 아무것도 하지 않음
      return;
    }

    if (!session) {
      // 세션이 없으면 만료된 것으로 간주하고 로그아웃
      // console.log("세션이 만료되었습니다.");
      // signOut(); // 로그아웃 또는 다른 동작 수행
    }
  }, [session, status]);

  useEffect(() => {
    if (inView) {
      setOffset((prev) => prev + limit);
      fetchMore({
        variables: {
          limit: limit,
          offset: offset,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }
          return {
            pokemon_v2_pokemonspeciesname: [
              ...previousResult.pokemon_v2_pokemonspeciesname,
              ...fetchMoreResult.pokemon_v2_pokemonspeciesname,
            ],
          };
        },
      });
    }
    console.log(data);
  }, [inView]);
  if (loading) {
    return <h1>로딩중!</h1>;
  }

  return (
    <>
      <Header text={header.root} />
      <button
        onClick={() => {
          signOut();
        }}
      >
        로그아웃
      </button>
      <main className="my-20 flex justify-center items-center">
        <div className="container grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {pokemons?.map((pokemon: any, i: number) => {
            return (
              <React.Fragment key={i}>
                <Card pokemon={pokemon} />
              </React.Fragment>
            );
          })}
          {/* <div ref={ref} className="w-full h-10 bg-blue-400"></div> */}
        </div>
      </main>
    </>
  );
}
