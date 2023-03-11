import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import styles from "@/styles/utils.module.css";

import AppBranding from "@/components/AppBranding";
import UserAvatarGroup from "@/components/UserAvatarGroup";
import LinkButton from "@/components/LinkButton";
import GenericButton from "@/components/GenericButton";

import { GameContext, GameDispatchContext } from "@/context/context";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { generateCategoryLength, selectCategory, selectNoun} from "@/lib/loadGameData"

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

  const handlePlayerNameChange = (event: any) => {
    setSinglePlayerName(event.target.value);
  };

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

  const completeInitialization = () =>{
    const categoryLength = generateCategoryLength()
    const categoryList = selectCategory(categoryLength)
    const hiddenNounList = selectNoun(categoryList)
    
    // select the first player to start the game
    const firstPlayerId = gameData.players[0].id
    dispatch({
      type: "UPDATE_MULTIPLE",
      data: {
        "hidden_noun":hiddenNounList,
        "active_player_id":firstPlayerId,
        "current_turn": 1
      }
    });
    
    router.push('/game')
  }
  return (
    <>
      <Head>
        <title>Start Game - Revnomen</title>
        <meta name="description" content="Reveal names of names" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
                  <div className="add-player-group">
                    <div className="section-header">
                      <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold">Add Players</h2>
                      </div>
                    </div>
                    <div className="registration-group">
                      <div>
                        <form
                          action=""
                          className="registration-form"
                          onSubmit={handleSavePlayer}
                        >
                          <div>
                            <div className="name-input">
                              <div className="mb-4">
                                <label
                                  htmlFor="new_player_name"
                                  className="text-3xl font-medium"
                                >
                                  Player Name
                                </label>
                                <input
                                  type="text"
                                  id="new_player_name"
                                  name="player_name"
                                  className="inline-block w-full py-5 px-2 rounded-md bg-gray-300 text-3xl"
                                  value={singlePlayerName}
                                  onChange={handlePlayerNameChange}
                                />
                              </div>
                            </div>
                            <div className="form-button mb-12">
                              <button
                                type="submit"
                                className="inline-block py-6 px-20 rounded-lg text-2xl font-semibold bg-gray-300"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                ) : registrationView == "edit" ? (
                  <div className="edit-player-group">
                    <div className="section-header">
                      <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold">
                          Update Player - {singlePlayer.name}
                        </h2>
                      </div>
                    </div>
                    <div className="update-form-group">
                      <div>
                        <form
                          action=""
                          className="update-form"
                          onSubmit={handleUpdatePlayer}
                        >
                          <div>
                            <div className="name-input">
                              <div className="mb-4">
                                <label
                                  htmlFor="player_name"
                                  className="text-3xl font-medium"
                                >
                                  Player Name
                                </label>
                                <input
                                  type="text"
                                  id="player_name"
                                  name="player_name"
                                  className="inline-block w-full py-5 px-2 rounded-md bg-gray-300 text-3xl"
                                  value={singlePlayerName}
                                  onChange={handlePlayerNameChange}
                                />
                              </div>
                            </div>
                            <div className="form-button mb-12 flex gap-x-12">
                              <button
                                type="submit"
                                className="inline-block py-6 px-20 rounded-lg text-2xl font-semibold bg-gray-300"
                              >
                                Update Player
                              </button>
                              <button
                                type="button"
                                onClick={handlePlayerFormReset}
                                className="inline-block py-6 px-20 rounded-lg text-2xl font-semibold bg-gray-300"
                              >
                                Go Back
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                ) : registrationView == "delete" ? (
                  <div className="delete-player-group">
                    <div className="section-header">
                      <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold">
                          Remove Player - {singlePlayer.name}
                        </h2>
                      </div>
                    </div>
                    <div className="delete-form-group">
                      <div>
                        <form
                          action=""
                          className="delete-form"
                          onSubmit={handleDeletePlayer}
                        >
                          <div>
                            <div className="name-input">
                              <div className="mb-4">
                                <p>
                                  Are you sure you want to delete Player -{" "}
                                  <em>{singlePlayerName}</em>
                                </p>
                              </div>
                            </div>
                            <div className="form-button mb-12 flex gap-x-12">
                              <button
                                type="submit"
                                className="inline-block py-6 px-20 rounded-lg text-2xl font-semibold bg-gray-300"
                              >
                                Delete Player
                              </button>
                              <button
                                type="button"
                                onClick={handlePlayerFormReset}
                                className="inline-block py-6 px-20 rounded-lg text-2xl font-semibold bg-gray-300"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
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
                  } flex gap-x-12 p-10 rounded-md bg-gray-200`}
                >
                  {gameData.players.map((player: any, index: any) => {
                    return (
                      <div key={index} className="registered-user inline-block">
                        <div className="relative">
                          <div className="mb-4">
                            <UserAvatarGroup
                              initials={player.name
                                .substring(0, 2)
                                .toUpperCase()}
                              userName={player.name}
                            />
                          </div>
                          {!gameData.is_player_registration_complete ? (
                            <div className={`${styles.userAction} user-action`}>
                              <div className="p-3.5 rounded-md bg-gray-400">
                                <ul className="flex gap-x-2">
                                  <li className="hidden">
                                    <span>{player.name}</span>
                                  </li>
                                  <li>
                                    <button
                                      className="underline"
                                      onClick={() =>
                                        togglePlayerRegView("edit", player.id)
                                      }
                                    >
                                      Update
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      className="underline"
                                      onClick={() =>
                                        togglePlayerRegView("delete", player.id)
                                      }
                                    >
                                      Delete
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    );
                  })}
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
                        <GenericButton url="/game" buttonClass="proceed-to-game"
                        handleClick={completeInitialization}>Proceed to Game</GenericButton>
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
