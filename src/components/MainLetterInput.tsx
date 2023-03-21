import { useState, useContext, useEffect, useRef } from "react";
import { GameContext, PlayerContext, TurnContext } from "@/context/context";
import GenericButton from "./GenericButton";

const MainLetterInput = () => {
  const [userLetterInput, setUserLetterInput] = useState("");

  const [gameOption, gameDispatch] = useContext(GameContext);
  const [playerOption, playerDispatch] = useContext(PlayerContext);
  const [turnOption, turnDispatch] = useContext(TurnContext);

  const inputRef = useRef<HTMLInputElement>(null);

  const validateUserLetterInput = (event: any) => {
    const val = event.target.value;
    const key = val.charCodeAt();
    if (
      val &&
      ((key >= 65 && key <= 90) || (key >= 97 && key <= 122)) &&
      val.length <= 1
    ) {
      setUserLetterInput(val);
    }
  };

  const handlePlayerTurn = () => {
    // check if game is completed,
    if (hasGameCompleted()) {
      recordGameCompletion(true);
      recordWinners(playerOption.players, true);
      return null;
    }
    // check if player letter matches (plus all occurrences) with alphabets in current category
    let currentCategory = findCurrentCategory();
    let hiddenContentObject =
      getHiddenContentObjectForCurrentCategory(currentCategory);
    let visibleContentArray = hiddenContentObject.nounArray;
    let hiddenContentArray = hiddenContentObject.hiddenNounArray;
    let occurenceIndexArray = [];
    let userLetterIndexInArray = visibleContentArray.indexOf(
      userLetterInput.toLowerCase()
    );
    if (
      letterAlreadyExistForCurrentCategory(hiddenContentArray, userLetterInput)
    ) {
      setUserLetterInput("");
      recordGameMessage(
        "The Letter exist in the name and it is already recorded, try another letter",
        "info"
      );
      return false;
    }

    // record the occurence index and the reveal the letter in the hidden noun array
    [hiddenContentArray, occurenceIndexArray] = recordOccurenceOfLetter(
      userLetterIndexInArray,
      visibleContentArray,
      hiddenContentArray,
      userLetterInput
    );

    const updatedHiddenNoun = updateHiddenContent(
      gameOption.hidden_noun,
      currentCategory,
      hiddenContentArray
    );

    const pointMultiplier = 10;
    const pointsObtained = occurenceIndexArray.length * pointMultiplier;

    const newUserInput = {
      player_id: playerOption.active_player_id,
      category: currentCategory,
      position: occurenceIndexArray.length > 0 ? occurenceIndexArray : null,
      points_obtained: pointsObtained,
    };
    updateTurnList(newUserInput);

    // update points
    const updatedPlayers = updatePlayer(pointsObtained);

    if (pointsObtained > 0) {
      recordGameMessage("Amazing, you guessed right!!!, Keep it up", "success");
    } else {
      recordGameMessage("Awww, Good try, better luck next time", "error");
    }
    if (!areThereStillHiddenContentInTheArray(updatedHiddenNoun)) {
      recordGameCompletion(true);
      recordWinners(updatedPlayers, true);
    }
    setUserLetterInput("");
    // Refocus the input
    inputRef.current?.focus();
  };

  const updateHiddenContent = (
    existingHiddenNoun: any,
    category: string,
    hiddenContentArray: any
  ) => {
    // update the whole hidden noun object
    let updatedHiddenNoun = existingHiddenNoun.map((singleHiddenNoun: any) => {
      if (singleHiddenNoun.category == category) {
        return {
          ...singleHiddenNoun,
          hiddenNounArray: hiddenContentArray,
        };
      } else {
        return singleHiddenNoun;
      }
    });
    gameDispatch({
      type: "UPDATE_MULTIPLE",
      data: {
        hidden_noun: updatedHiddenNoun,
      },
    });
    return updatedHiddenNoun;
  };

  const updatePlayer = (pointsObtained: number) => {
    // update points
    const updatedPlayers = playerOption.players.map((singlePlayer: any) => {
      if (singlePlayer.id == playerOption.active_player_id) {
        let updatedPoints = Number(singlePlayer.points) + pointsObtained;
        return { ...singlePlayer, points: updatedPoints };
      } else {
        return singlePlayer;
      }
    });
    playerDispatch({
      type: "UPDATE_MULTIPLE",
      data: {
        active_player_id: updateActivePlayer(),
        players: updatedPlayers,
      },
    });
    return updatedPlayers;
  };

  const hasGameCompleted = () => {
    const allHiddenLettersAreRevealed =
      gameOption.hidden_noun
        .map((singleHiddenNounObject: any) =>
          singleHiddenNounObject.hiddenNounArray.findIndex(
            (hiddenNoun: any) => hiddenNoun == ""
          )
        )
        .findIndex((singleObject: any) => singleObject !== -1) === -1;
    return allHiddenLettersAreRevealed;
  };

  const areThereStillHiddenContentInTheArray = (hiddenContentObject: any) => {
    const hiddenContentExist =
      hiddenContentObject
        .map((singleHiddenContentObject: any) =>
          singleHiddenContentObject.hiddenNounArray.some(
            (hiddenNoun: any) => hiddenNoun == ""
          )
        )
        .some((singleObject: any) => singleObject === true) === true;
    return hiddenContentExist;
  };

  const recordGameCompletion = (isGameCompleted: boolean) => {
    if (isGameCompleted) {
      gameDispatch({
        type: "UPDATE_MULTIPLE",
        data: {
          is_completed: true,
        },
      });
    } else {
    }
  };

  const findCurrentCategory = () => {
    let currentCategory = "";
    let i = 0;
    try {
      while (currentCategory == "") {
        if (gameOption.hidden_noun[i].hiddenNounArray.indexOf("") !== -1) {
          currentCategory = gameOption.hidden_noun[i].category;
        }
        i++;
      }
    } catch (error) {
      currentCategory = "";
    }
    return currentCategory;
  };

  const getHiddenContentObjectForCurrentCategory = (
    currentCategory: string
  ) => {
    try {
      return gameOption.hidden_noun.filter(
        ({ category }: any) => category == currentCategory
      )[0];
    } catch (error) {
      return null;
    }
  };

  const letterAlreadyExistForCurrentCategory = (
    hiddenNounArray: any,
    letter: String
  ) => {
    try {
      return hiddenNounArray.indexOf(letter.toLowerCase()) !== -1;
    } catch (error) {
      return false;
    }
  };
  const recordOccurenceOfLetter = (
    initialIndex: number,
    visibleNounArray: any,
    hiddenNounArray: any,
    letterInput: string
  ) => {
    let index = initialIndex;
    let updatedHiddenNounArray = hiddenNounArray;
    let indexArray = [] as number[];

    while (index !== -1) {
      indexArray.push(index);
      // record on the index
      updatedHiddenNounArray[index] = letterInput.toLowerCase();
      index = visibleNounArray.indexOf(letterInput.toLowerCase(), index + 1);
    }

    return [updatedHiddenNounArray, indexArray];
  };

  const updateTurnList = (newUserInput: any) => {
    // record data in turns
    let updatedTurnList = [];
    if (currentTurnExist(turnOption.turns, turnOption.current_turn)) {
      // create new turn
      let newTurn = {
        turn_id: turnOption.current_turn,
        user_input: [newUserInput],
      };
      updatedTurnList = [...turnOption.turns, newTurn];
    } else {
      // update existing turn
      updatedTurnList = turnOption.turns.map((singleTurn: any) => {
        if (singleTurn.turn_id == turnOption.current_turn) {
          let thisTurnUserInput = [...singleTurn.user_input, newUserInput];
          let thisTurn = { ...singleTurn, user_input: thisTurnUserInput };
          return thisTurn;
        } else {
          return singleTurn;
        }
      });
    }
    turnDispatch({
      type: "UPDATE_MULTIPLE",
      data: {
        turns: updatedTurnList,
        current_turn: updateCurrentTurn(),
      },
    });
  };

  const updateActivePlayer = () => {
    let playerIndex = playerOption.players.findIndex(
      ({ id }: any) => id == playerOption.active_player_id
    );
    if (playerIndex == playerOption.players.length - 1) {
      playerIndex = -1;
    }
    let newActivePlayerId = playerOption.players[playerIndex + 1].id;
    return newActivePlayerId;
  };
  const updateCurrentTurn = () => {
    let current_turn = turnOption.current_turn;
    if (
      turnOption.turns.findIndex(
        ({ turn_id }: any) => turn_id == turnOption.current_turn
      ) !== -1
    ) {
      if (
        turnOption.turns.filter(
          ({ turn_id }: any) => turn_id == turnOption.current_turn
        )[0].user_input.length == playerOption.players.length
      ) {
        current_turn = turnOption.current_turn + 1;
      }
    }
    return current_turn;
  };
  const recordWinners = (playerList: any, isGameCompleted: boolean) => {
    if (isGameCompleted) {
      const pointArray = playerList.map(({ points }: any) => points);
      const maximumPoint = Math.max(...pointArray);
      // find the players with the maximum point
      const playerWithTheMaximumPoint = playerList.filter(
        (singlePlayer: any) => singlePlayer.points == maximumPoint
      );
      playerDispatch({
        type: "UPDATE_MULTIPLE",
        data: {
          winner: playerWithTheMaximumPoint,
        },
      });
      return playerWithTheMaximumPoint;
    } else {
      return [];
    }
  };

  const currentTurnExist = (turnArray: any, currentTurn: Number) => {
    try {
      return (
        turnArray.findIndex(
          (singleTurn: any) => singleTurn.turn_id == currentTurn
        ) === -1
      );
    } catch (error) {
      return false;
    }
  };

  const recordGameMessage = (message: string, type: string) => {
    gameDispatch({
      type: "UPDATE_MULTIPLE",
      data: {
        comment: {
          message: message,
          type: type,
          time: Date.now(),
        },
      },
    });
  };

  return (
    <>
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
                value={userLetterInput}
                maxLength={1}
                onChange={validateUserLetterInput}
                className="w-12 border-b-2 border-black text-center text-3xl font-medium uppercase outline-0 bg-gray-200"
                ref={inputRef}
              />
            </div>
            <div>
              <GenericButton handleClick={handlePlayerTurn}>
                Submit
              </GenericButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainLetterInput;
