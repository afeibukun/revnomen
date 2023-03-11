import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import styles from "@/styles/utils.module.css";

import AppBranding from "@/components/AppBranding";
import HiddenLetterInput from "@/components/HiddenLetterInput";
import HiddenContentCategoryName from "@/components/HiddenContentCategoryName";
import UserAvatarGroup from "@/components/UserAvatarGroup";
import ScoreCard from "@/components/ScoreCard";
import GenericButton from "@/components/GenericButton";
import LinkButton from "@/components/LinkButton";

import { GameContext, GameDispatchContext } from "@/context/context";

import { useState, useContext, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Game() {
  const gameData = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);
  const router = useRouter();

  const [letterInput, setLetterInput] = useState("");

  // useEffect(() => {
  //   if (!gameData.game_id) {
  //     //game has not been setup - go back to home page
  //     router.push("/");
  //   }
  //   if (gameData.player.length < 2 || gameData.hidden_noun.length < 5) {
  //     router.push("/start");
  //   }
  // }, [gameData.game_id, router, gameData.player,gameData.hidden_noun]);

  const validateLetterInput = (event: any) => {
    const val = event.target.value;
    const key = val.charCodeAt();

    if (
      val &&
      ((key >= 65 && key <= 90) || (key >= 97 && key <= 122)) &&
      val.length <= 1
    ) {
      setLetterInput(val);
    }
  };

  const findCurrentCategory = () => {
    let currentCategory = "";
    let i = 0;
    while (currentCategory == "") {
      if (gameData.hidden_noun[i].hiddenNounArray.indexOf("") !== -1) {
        currentCategory = gameData.hidden_noun[i].category;
      }
      i++;
    }
    return currentCategory;
  };

  const recordPlayerTurn = () => {
    // check if player letter matches (plus all occurrences) with alphabets in current category
    let currentCategory = findCurrentCategory();
    let nounObjectForCurrentCategory = gameData.hidden_noun.filter(
      ({ category }: any) => category == currentCategory
    )[0];
    let nounArrayForCurrentCategory = nounObjectForCurrentCategory.nounArray;
    let hiddenNounArrayForCurrentCategory =
      nounObjectForCurrentCategory.hiddenNounArray;
    const occurenceIndices = [];
    let letterIndex = nounArrayForCurrentCategory.indexOf(
      letterInput.toLowerCase()
    );
    while (letterIndex !== -1) {
      occurenceIndices.push(letterIndex);
      // record on the index
      hiddenNounArrayForCurrentCategory[letterIndex] =
        letterInput.toLowerCase();
      letterIndex = nounArrayForCurrentCategory.indexOf(
        letterInput.toLowerCase(),
        letterIndex + 1
      );
    }
    let updatedHiddenNoun = gameData.hidden_noun.map(
      (singleHiddenNoun: any) => {
        if (singleHiddenNoun.category == currentCategory) {
          return {
            ...singleHiddenNoun,
            hiddenNounArray: hiddenNounArrayForCurrentCategory,
          };
        } else {
          return singleHiddenNoun;
        }
      }
    );

    const pointMultiplier = 10;
    const pointsObtained = occurenceIndices.length * pointMultiplier;

    const newUserInput = {
      player_id: gameData.active_player_id,
      category: currentCategory,
      position: occurenceIndices.length > 0 ? occurenceIndices : null,
      points_obtained: pointsObtained,
    };

    // record data in turns
    let updatedTurnList = [];
    if (
      gameData.turns.findIndex(
        (singleTurn: any) => singleTurn.turn_id == gameData.current_turn
      ) === -1
    ) {
      // create new turn
      let newTurn = {
        turn_id: gameData.current_turn,
        user_input: [newUserInput],
      };
      updatedTurnList = [...gameData.turns, newTurn];
    } else {
      updatedTurnList = gameData.turns.map((singleTurn: any) => {
        if (singleTurn.turn_id == gameData.current_turn) {
          let thisTurnUserInput = [...singleTurn.user_input, newUserInput];
          let thisTurn = { ...singleTurn, user_input: thisTurnUserInput };
          return thisTurn;
        } else {
          return singleTurn;
        }
      });
    }
    // console.log(updatedTurnList);

    // update points
    const updatedPlayers = gameData.players.map((singlePlayer: any) => {
      if (singlePlayer.id == gameData.active_player_id) {
        let updatedPoints = Number(singlePlayer.points) + pointsObtained;
        return { ...singlePlayer, points: updatedPoints };
      } else {
        return singlePlayer;
      }
    });

    dispatch({
      type: "UPDATE_MULTIPLE",
      data: {
        hidden_noun: updatedHiddenNoun,
        turns: updatedTurnList,
        active_player_id: updateActivePlayer(),
        current_turn: updateCurrentTurn(),
        players: updatedPlayers,
      },
    });
    setLetterInput("");
  };

  const updateActivePlayer = () => {
    let playerIndex = gameData.players.findIndex(
      ({ id }: any) => id == gameData.active_player_id
    );
    if (playerIndex == gameData.players.length - 1) {
      playerIndex = -1;
    }
    let newActivePlayerId = gameData.players[playerIndex + 1].id;
    console.log(newActivePlayerId);
    return newActivePlayerId;
  };
  const updateCurrentTurn = () => {
    let current_turn = gameData.current_turn;
    if (
      gameData.turns.findIndex(
        ({ turn_id }: any) => turn_id == gameData.current_turn
      ) !== -1
    ) {
      if (
        gameData.turns.filter(
          ({ turn_id }: any) => turn_id == gameData.current_turn
        )[0].user_input.length == gameData.players.length
      ) {
        current_turn = gameData.current_turn + 1;
      }
    }
    console.log(current_turn);
    return current_turn;
  };

  return (
    <>
      <Head>
        <title>Game - Revnomen</title>
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

          <section className="main-game">
            <div>
              {!gameData.is_completed ? (
                <div className="section-header">
                  <div className="py-5 mb-12 rounded-md bg-gray-300">
                    <div className="game-info">
                      <div>
                        <p className="font-bold text-xl text-center capitalize">
                          {
                            gameData.players.filter(
                              ({ id }: any) => id == gameData.active_player_id
                            )[0].name
                          }
                          &apos;s Turn
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="hidden-name-box">
                <div className="p-12 mb-12 rounded-md bg-gray-300">
                  {gameData.hidden_noun.map(
                    (singleHiddenNoun: any, index: any) => (
                      <div
                        className={`hidden-name-category category-${index + 1}`}
                        key={singleHiddenNoun.category}
                      >
                        <div className="flex mb-5 items-center">
                          <div className="category-name">
                            <div>
                              <HiddenContentCategoryName>
                                {singleHiddenNoun.category}
                              </HiddenContentCategoryName>
                            </div>
                          </div>
                          <div className="hidden-name-container">
                            <div className="flex gap-x-4 flex-wrap">
                              {singleHiddenNoun.hiddenNounArray.map(
                                (singleHiddenNoun: String, index: any) => (
                                  <div
                                    className="hidden-name-letter"
                                    key={index + 1}
                                  >
                                    <div>
                                      <span
                                        className={`${styles.hiddenLetterDisplay} hidden-letter-display relative inline-block w-8 h-8 border-b-2 border-black text-center text-2xl font-medium uppercase outline-0 bg-transparent`}
                                      >
                                        <span className="absolute">
                                          {singleHiddenNoun}
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* <div>
                <div className="hidden-name-letter">
                  <div>
                    <HiddenLetterInput categoryLabel="Cat 01 Letter 02" />
                  </div>
                </div>
                <div className="hidden-name-letter">
                  <div>
                    <HiddenLetterInput categoryLabel="Cat 01 Letter 03" />
                  </div>
                </div>
                <div className="hidden-name-letter">
                  <div>
                    <HiddenLetterInput categoryLabel="Cat 01 Letter 04" />
                  </div>
                </div>
                <div className="hidden-name-letter">
                  <div>
                    <HiddenLetterInput categoryLabel="Cat 01 Letter 05" />
                  </div>
                </div>
                <div className="hidden-name-letter">
                  <div>
                    <HiddenLetterInput categoryLabel="Cat 01 Letter 06" />
                  </div>
                </div>
              </div> */}
              {gameData.is_completed ? (
                <div className="winner-box">
                  <div className="flex justify-center items-center py-28 rounded-md mb-12 bg-gray-200">
                    <h1 className="text-8xl font-bold">Tomi Wins</h1>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="score-board">
                <div className="flex mb-12 rounded-md bg-gray-200 ">
                  <div className="board-labels">
                    <div className="px-6">
                      <div className="players-labels">
                        <div className="py-7">
                          <h4 className="text-xl">Players</h4>
                        </div>
                      </div>
                      <div className="points-labels">
                        <div className="mt-1.5">
                          <h4 className="text-xl">Points</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="player-scores">
                    <div className="flex gap-x-5">
                      {gameData.players.map((singlePlayer: any) => (
                        <ScoreCard
                          key={singlePlayer.id}
                          initials={singlePlayer.name
                            .substring(0, 2)
                            .toUpperCase()}
                          userName={singlePlayer.name}
                          points={singlePlayer.points}
                          winner={gameData.winner === singlePlayer.id}
                          active={gameData.active_player_id === singlePlayer.id}
                        />
                      ))}
                      {/* <ScoreCard
                        initials="TO"
                        userName="Tomi"
                        points="0"
                        winner={true}
                      />
                      <ScoreCard initials="TE" userName="Temi" points="0" active={true}/> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="button-group">
                <div>
                  {!gameData.is_completed ? (
                    <div className="button-group-game">
                      <div>
                        <div className="text-center">
                          <div className="letter-input-container mb-4">
                            <label htmlFor="letter-input" className="mr-4">
                              Your Input Goes here:
                            </label>
                            <input
                              type="text"
                              id="letter-input"
                              value={letterInput}
                              maxLength={1}
                              onChange={validateLetterInput}
                              className="w-12 border-b-2 border-black text-center text-3xl font-medium uppercase outline-0 bg-gray-200"
                            />
                          </div>
                          <div>
                            <GenericButton handleClick={recordPlayerTurn}>
                              Submit
                            </GenericButton>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="button-group-finished">
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
