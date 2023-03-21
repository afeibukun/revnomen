import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import styles from "@/styles/utils.module.css";

import Meta from "@/components/Meta";

import AppBranding from "@/components/AppBranding";
import LinkButton from "@/components/LinkButton";

import { GameContext, PlayerContext, TurnContext } from "@/context/context";

import {useContext, useEffect } from "react";
import HiddenContentBoard from "@/components/HiddenContentBoard";
import WinnerCard from "@/components/WinnerCard";
import GameInfo from "@/components/GameInfo";
import ScoreBoard from "@/components/ScoreBoard";
import MainLetterInput from "@/components/MainLetterInput";

const inter = Inter({ subsets: ["latin"] });

export default function Game() {
  const [gameOption, gameDispatch] = useContext(GameContext);
  const [playerOption, playerDispatch] = useContext(PlayerContext);

  const router = useRouter();

  useEffect(() => {
    if (!gameOption.game_id) {
      //game has not been setup - go back to home page
      router.push("/");
    }
    if (playerOption.players.length < 2 || gameOption.hidden_noun.length < 1) {
      router.push("/start");
    }
  }, [
    gameOption.game_id,
    router,
    playerOption.players.length,
    gameOption.hidden_noun,
  ]);

  return (
    <>
      <Meta pageTitle="Game - Revnomen" />
      <main className="pb-8">
        <div className="container min-h-screen max-w-4xl mx-auto">
          <header className="app-header">
            <div className="mt-8">
              <div className="app-branding">
                <div className="py-12">
                  <AppBranding />
                </div>
              </div>
            </div>
          </header>

          <section className="main-game">
            <div>
              <div className="hidden-name-box">
                <div className="py-8 px-6 mb-6 rounded-md bg-gray-300">
                  <HiddenContentBoard />
                </div>
              </div>
              {gameOption.is_completed ? <WinnerCard /> : ""}
              {!gameOption.is_completed ? (
                <GameInfo />
              ) : (
                ""
              )}

              <ScoreBoard />

              <div className="button-group">
                <div>
                  {!gameOption.is_completed ? (
                    <MainLetterInput />
                  ) : (
                    <div className="button-group-finished mt-12">
                      <div className="flex gap-x-6 justify-center">
                        <LinkButton url="/">Go Home</LinkButton>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
