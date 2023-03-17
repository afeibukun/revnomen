import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import styles from "@/styles/utils.module.css";

import Meta from "@/components/Meta";
import AppBranding from "@/components/AppBranding";
import UserAvatarGroup from "@/components/UserAvatarGroup";
import GenericButton from "@/components/GenericButton";
import AddPlayer from "@/components/PlayerRegistration/AddPlayer";
import UpdatePlayer from "@/components/PlayerRegistration/UpdatePlayer";
import DeletePlayer from "@/components/PlayerRegistration/DeletePlayer";
import PlayerList from "@/components/PlayerRegistration/PlayerList";
import RegisteredPlayerBlock from "@/components/PlayerRegistration/RegisteredPlayerBlock";

import { GameContext, GameDispatchContext } from "@/context/context";
import { SetStateAction, useContext, useEffect, useState } from "react";
import {
  generateCategoryLength,
  selectCategory,
  selectNoun,
} from "@/lib/loadGameData";

const inter = Inter({ subsets: ["latin"] });

export default function Start() {
  const gameData = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);
  const [singlePlayerName, setSinglePlayerName] = useState("");
  const [singlePlayer, setSinglePlayer] = useState({} as any);
  const [registrationView, setRegistrationView] = useState("add");
  const router = useRouter();

  useEffect(() => {
    if (!gameData.game_id) {
      //game has not been setup - go back to home page
      router.push("/");
    }
    dispatch({
      type: "UPDATE_MULTIPLE",
      data: {
        is_initializing: true,
        is_player_registration_complete: false,
        is_hidden_names_loaded: false,
        is_ready: false,
      },
    });
  }, [dispatch, gameData.game_id, router]);

  const handleSavePlayer = (event: any) => {
    event.preventDefault();
    let newPlayerId = Number(gameData.next_player_index);
    const singlePlayer = {
      id: newPlayerId,
      name: singlePlayerName,
      points: 0,
    };

    dispatch({
      type: "UPDATE_DATA",
      key: "players",
      data: [...gameData.players, singlePlayer],
    });
    dispatch({
      type: "UPDATE_DATA",
      key: "next_player_index",
      data: newPlayerId + 1,
    });
    setSinglePlayerName("");
  };

  const handlePlayerNameChange = (event: any) => {
    setSinglePlayerName(event.target.value);
  };

  const togglePlayerRegView = (
    view_id: String,
    player_id: Number | null
  ): any => {
    if (view_id == "edit" || view_id == "delete") {
      setSinglePlayer(
        gameData.players.filter((player: any) => player.id == player_id)[0]
      );
    }
    setRegistrationView(view_id as SetStateAction<string>);
  };

  useEffect(() => {
    if (singlePlayer && singlePlayer.name) {
      setSinglePlayerName(singlePlayer.name);
    }
  }, [singlePlayer]);

  const handleUpdatePlayer = (event: any) => {
    event.preventDefault();
    const updatedSinglePlayer = {
      id: singlePlayer.id,
      name: singlePlayerName,
      points: singlePlayer.points,
    };
    const updatedPlayersList = gameData.players.map((player: any) => {
      if (player.id == singlePlayer.id) return updatedSinglePlayer;
      else return player;
    });
    dispatch({
      type: "UPDATE_DATA",
      key: "players",
      data: updatedPlayersList,
    });
    setSinglePlayer(null);
    setSinglePlayerName("");
    setRegistrationView("add");
  };

  const handleDeletePlayer = (event: any) => {
    event.preventDefault();
    const updatedPlayersList = gameData.players.filter(
      (player: any) => player.id !== singlePlayer.id
    );
    dispatch({
      type: "UPDATE_DATA",
      key: "players",
      data: updatedPlayersList,
    });
    setSinglePlayer(null);
    setSinglePlayerName("");
    setRegistrationView("add");
  };

  const handlePlayerFormReset = (event: any) => {
    setSinglePlayer({});
    setSinglePlayerName("");
    setRegistrationView("add");
  };

  const completePlayerRegistration = () => {
    // check if added players are more than 2
    if (gameData.players.length >= 2) {
      // switch is_initializing to false, is_ready to true
      dispatch({
        type: "UPDATE_MULTIPLE",
        data: {
          is_initializing: true,
          is_player_registration_complete: true,
          is_hidden_names_loaded: false,
          is_ready: false,
        },
      });
      console.log("Initialization Complete");
    } else {
      console.log("Shey you dey whine me ni");
    }
  };
  const returnToPlayerRegistration = () => {
    dispatch({
      type: "UPDATE_MULTIPLE",
      data: {
        is_initializing: true,
        is_player_registration_complete: false,
        is_hidden_names_loaded: false,
        is_ready: false,
      },
    });
    console.log("Back to Initialization");
  };

  const completeInitialization = () => {
    const categoryLength = generateCategoryLength();
    const categoryList = selectCategory(categoryLength);
    const hiddenNounList = selectNoun(categoryList);

    // select the first player to start the game
    const firstPlayerId = gameData.players[0].id;
    dispatch({
      type: "UPDATE_MULTIPLE",
      data: {
        hidden_noun: hiddenNounList,
        active_player_id: firstPlayerId,
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
          {gameData.is_player_registration_complete ? (
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

          {!gameData.is_player_registration_complete ? (
            <section className="user-registration">
              <div>
                {registrationView == "add" ? (
                  <div>
                    <AddPlayer
                      singlePlayerName={singlePlayerName}
                      handleSavePlayer={handleSavePlayer}
                      handlePlayerNameChange={handlePlayerNameChange}
                    />
                  </div>
                ) : registrationView == "edit" ? (
                  <div>
                    <UpdatePlayer
                      singlePlayerName={singlePlayerName}
                      singlePlayer={singlePlayer}
                      handleUpdatePlayer={handleUpdatePlayer}
                      handlePlayerNameChange={handlePlayerNameChange}
                      handlePlayerFormReset={handlePlayerFormReset}
                    />
                  </div>
                ) : registrationView == "delete" ? (
                  <div>
                    <DeletePlayer
                      singlePlayerName={singlePlayerName}
                      singlePlayer={singlePlayer}
                      handlePlayerFormReset={handlePlayerFormReset}handleDeletePlayer ={handleDeletePlayer}
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
                    !gameData.is_player_registration_complete
                      ? "can-edit-user"
                      : ""
                  } p-10 rounded-md bg-gray-200`}
                >
                  <PlayerList
                    togglePlayerRegView={togglePlayerRegView}
                    playerList={gameData.players}
                    isPlayerRegistrationComplete={
                      gameData.is_player_registration_complete
                    }
                  />
                </div>
              </div>

              <div className="button-group">
                <div>
                  {!gameData.is_player_registration_complete ? (
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
                  {gameData.is_player_registration_complete ? (
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
