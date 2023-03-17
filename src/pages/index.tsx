import { useRouter } from "next/router";
import { useContext } from "react";
import { GameDispatchContext } from "@/context/context";

import { Inter } from "next/font/google";

import Meta from "@/components/Meta";
import GenericButton from "@/components/GenericButton";

import { randomString } from "@/lib";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const dispatch = useContext(GameDispatchContext);
  const router = useRouter();

  const handleGameInitialization = (event: any) => {
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
      <Meta pageTitle="Revnomen App" />
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
                    handleClick={handleGameInitialization}
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
