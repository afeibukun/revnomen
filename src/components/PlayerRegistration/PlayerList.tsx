import { useState, useEffect, useContext } from "react";
import { GameContext } from "@/context/context";

import RegisteredPlayerBlock from "./RegisteredPlayerBlock";

const PlayerList = ({
  togglePlayerRegView,
  playerList,
  isPlayerRegistrationComplete,
}: any) => {
  const gameData = useContext(GameContext);
  useEffect(() => {
    console.log(gameData.players);
  }, [gameData, gameData.players]);

  return (
    <div className="player-list flex gap-x-12">
      {gameData.players.map((player: any, index: any) => {
        return (
          <RegisteredPlayerBlock
            key={index}
            playerName={player.name}
            playerId={player.id}
            isPlayerRegistrationComplete={isPlayerRegistrationComplete}
            togglePlayerRegView={togglePlayerRegView}
          />
        );
      })}
    </div>
  );
};
export default PlayerList;
