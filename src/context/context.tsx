import { createContext, useState, useReducer, type Dispatch } from "react";
import gameDataReducer from "@/lib/gameDataReducer";

export const GameContext = createContext({} as any);
export const GameDispatchContext = createContext({} as Dispatch<any>);

export const INITIAL_STATE = {
  game_id: null,
  is_player_registration_complete:false,
  is_initializing:false,
  is_hidden_names_loaded:false,
  is_ready:false,
  has_started: false,
  players: [
  ],
  next_player_index:1,
  hidden_noun: [],
  turns: [],
  active_player_id:1,
  current_turn: 0,
  is_completed: false,
  winner: null,
};

function Context({ children }: any) {
  const [gameData, dispatch] = useReducer(gameDataReducer, INITIAL_STATE);

  return (
    <GameContext.Provider value={gameData}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
}

export default Context;
