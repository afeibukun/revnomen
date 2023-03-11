import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

import { GameContext, GameDispatchContext } from "@/context/context";
import { useContext } from "react";

import { randomString } from "@/lib";
import GenericButton from "@/components/GenericButton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const gameData = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);
  const router = useRouter();

  const initializeGame = (event: any) => {
    // create game id
    let gameId = randomString(
      8,
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    );
    dispatch({
      type: "UPDATE_MULTIPLE",
      data: {
        game_id: gameId,
        is_completed: false,
        players: [],
        winner:[],
      },
    });

    router.push("/start");
  };
  return (
    <>
      <Head>
        <title>Revnomen App</title>
        <meta name="description" content="Reveal names of names" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        <div className="container min-h-screen mx-auto">
          <section className="app-intro h-screen flex flex-col justify-center items-center">
            <div>
              <div className="text-group">
                <div className="text-center">
                  <h1 className="mb-5 text-8xl font-bold">Welcome</h1>
                  <h3 className="mb-7 text-4xl font-medium">to Revnomen Game</h3>
                </div>
              </div>
              <div className="button-group">
                <div className="text-center">
                  <GenericButton
                    handleClick={initializeGame}
                    buttonClass="start-new-game"
                  >
                    Start New Game
                  </GenericButton>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
