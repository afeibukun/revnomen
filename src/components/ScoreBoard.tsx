import { useState, useContext, useEffect } from "react";
import { GameContext, PlayerContext, TurnContext } from "@/context/context";

import styles from "@/styles/utils.module.css";
import ScoreCard from "./ScoreCard";

const ScoreBoard = () => {
  const [gameOption, gameDispatch] = useContext(GameContext);
  const [playerOption, playerDispatch] = useContext(PlayerContext);
  return (
    <>
      <div className="score-board">
        <div className="flex mb-6 rounded-md bg-gray-200 ">
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
              {playerOption.players.map((singlePlayer: any) => (
                <ScoreCard
                  key={singlePlayer.id}
                  initials={singlePlayer.name.substring(0, 2).toUpperCase()}
                  userName={singlePlayer.name}
                  points={singlePlayer.points}
                  winner={playerOption.winner.some(
                    (singleWinner: any) => singleWinner.id === singlePlayer.id
                  )}
                  active={
                    playerOption.active_player_id === singlePlayer.id &&
                    !gameOption.is_completed
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ScoreBoard;
