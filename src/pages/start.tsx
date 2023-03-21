import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import styles from "@/styles/utils.module.css";

import Meta from "@/components/Meta";
import AppBranding from "@/components/AppBranding";
import GenericButton from "@/components/GenericButton";
import AddPlayer from "@/components/PlayerRegistration/AddPlayer";
import UpdatePlayer from "@/components/PlayerRegistration/UpdatePlayer";
import DeletePlayer from "@/components/PlayerRegistration/DeletePlayer";
import PlayerList from "@/components/PlayerRegistration/PlayerList";

import { GameContext, PlayerContext, TurnContext } from "@/context/context";
import { SetStateAction, useContext, useEffect, useState } from "react";
import {
  generateCategoryLength,
  selectCategory,
  selectNoun,
} from "@/lib/loadGameData";

const inter = Inter({ subsets: ["latin"] });

export default function Start() {
  const [gameOption, gameDispatch] = useContext(GameContext);
  const [playerOption, playerDispatch] = useContext(PlayerContext);
  const [turnOption, turnDispatch] = useContext(TurnContext);

  const [singlePlayer, setSinglePlayer] = useState({} as any);
  const [registrationView, setRegistrationView] = useState("add");
  const router = useRouter();

  useEffect(() => {
    if (!gameOption.game_id) {
      //game has not been setup - go back to home page
      router.push("/");
    }
    gameDispatch({
      type: "UPDATE_MULTIPLE",
      data: {
        is_initializing: true,
        is_player_registration_complete: false,
        is_hidden_names_loaded: false,
        is_ready: false,
      },
    });
    playerDispatch({
      type: "UPDATE_MULTIPLE",
      data: {
        is_player_registration_complete: false,
      },
    });
  }, [gameDispatch, playerDispatch, gameOption.game_id, router]);

  const togglePlayerRegView = (
    view_id: String,
    player_id: Number | null
  ): any => {
    if (view_id == "edit" || view_id == "delete") {
      setSinglePlayer(
        playerOption.players.filter((player: any) => player.id == player_id)[0]
      );
    }
    setRegistrationView(view_id as SetStateAction<string>);
  };

  const handleViewReset = (event: any) => {
    setSinglePlayer({});
    setRegistrationView("add");
  };

  const completePlayerRegistration = () => {
    // check if added players are more than 2
    if (playerOption.players.length >= 2) {
      // switch is_initializing to false, is_ready to true
      gameDispatch({
        type: "UPDATE_MULTIPLE",
        data: {
          is_initializing: true,
          is_hidden_names_loaded: false,
          is_ready: false,
        },
      });
      playerDispatch({
        type: "UPDATE_MULTIPLE",
        data: {
          is_player_registration_complete: true,
        },
      });
      console.log("Initialization Complete");
    } else {
      console.log("Shey you dey whine me ni");
    }
  };
  const returnToPlayerRegistration = () => {
    gameDispatch({
      type: "UPDATE_MULTIPLE",
      data: {
        is_initializing: true,
        is_hidden_names_loaded: false,
        is_ready: false,
      },
    });
    playerDispatch({
      type: "UPDATE_MULTIPLE",
      data: {
        is_player_registration_complete: false,
      },
    });
    console.log("Back to Initialization");
  };

  const completeInitialization = () => {
    const categoryLength = generateCategoryLength();
    const categoryList = selectCategory(categoryLength);
    const hiddenNounList = selectNoun(categoryList);

    // select the first player to start the game
    const firstPlayerId = playerOption.players[0].id;
    gameDispatch({
      type: "UPDATE_MULTIPLE",
      data: {
        hidden_noun: hiddenNounList,
      },
    });
    playerDispatch({
      type: "UPDATE_MULTIPLE",
      data: {
        active_player_id: firstPlayerId,
      },
    });
    turnDispatch({
      type: "UPDATE_MULTIPLE",
      data: {
        current_turn: 1,
      },
    });
    router.push("/game");
  };
  return (
    <>
      <Meta pageTitle="Start Game - Revnomen" />
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
          {playerOption.is_player_registration_complete ? (
            <section className="getting-started-section">
              <div className="h-96 flex items-center justify-center mb-12 rounded-md bg-gray-300 ">
                <div className="text-group">
                  <div>
                    <h4 className="text-3xl font-medium">Getting Started</h4>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            ""
          )}

          {!playerOption.is_player_registration_complete ? (
            <section className="user-registration">
              <div>
                {registrationView == "add" ? (
                  <div>
                    <AddPlayer />
                  </div>
                ) : registrationView == "edit" ? (
                  <div>
                    <UpdatePlayer
                      selectedPlayer={singlePlayer}
                      handleViewReset={handleViewReset}
                    />
                  </div>
                ) : registrationView == "delete" ? (
                  <div>
                    <DeletePlayer
                      singlePlayer={singlePlayer}
                      handleViewReset={handleViewReset}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </section>
          ) : (
            ""
          )}

          <section className="">
            <div>
              <div className={`${styles.waitingArea} waiting-area mb-12`}>
                <div
                  className={`${
                    !playerOption.is_player_registration_complete
                      ? "can-edit-user"
                      : ""
                  } p-10 rounded-md bg-gray-200`}
                >
                  <PlayerList togglePlayerRegView={togglePlayerRegView} />
                </div>
              </div>

              <div className="button-group">
                <div>
                  {!playerOption.is_player_registration_complete ? (
                    <div className="button-group-01">
                      <div>
                        <GenericButton
                          handleClick={completePlayerRegistration}
                          buttonClass="continue_button"
                        >
                          Continue
                        </GenericButton>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {playerOption.is_player_registration_complete ? (
                    <div className="button-group-02">
                      <div className="flex justify-between">
                        <GenericButton
                          url="/game"
                          buttonClass="proceed-to-game"
                          handleClick={completeInitialization}
                        >
                          Proceed to Game
                        </GenericButton>
                        <GenericButton
                          buttonClass="goback_button"
                          handleClick={returnToPlayerRegistration}
                        >
                          Go Back
                        </GenericButton>
                      </div>
                    </div>
                  ) : (
                    ""
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
