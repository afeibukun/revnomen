import { createContext, useState, useReducer, type Dispatch } from "react";
import gameReducer from "@/reducer/gameReducer";
import {
  GAME_INITIAL_STATE,
  PLAYER_INITIAL_STATE,
  TURN_INITIAL_STATE,
} from "./contextInitialState";

export const GameContext = createContext({} as any);
export const PlayerContext = createContext({} as any);
export const TurnContext = createContext({} as any);

function Context({ children }: any) {
  // const [game, dispatch] = useReducer(gameReducer, GAME_INITIAL_STATE);
  // const [player, dispatch] = useReducer(
  //   gameReducer,
  //   PLAYER_INITIAL_STATE
  // );
  // const [turn, dispatchTurn] = useReducer(gameReducer, TURN_INITIAL_STATE);

  return (
    <GameContext.Provider value={useReducer(gameReducer, GAME_INITIAL_STATE)}>
      <PlayerContext.Provider
        value={useReducer(gameReducer, PLAYER_INITIAL_STATE)}
      >
        <TurnContext.Provider
          value={useReducer(gameReducer, TURN_INITIAL_STATE)}
        >
          {children}
        </TurnContext.Provider>
      </PlayerContext.Provider>
    </GameContext.Provider>
  );
}

export default Context;
