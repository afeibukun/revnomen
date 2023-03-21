import { useContext } from "react";
import { PlayerContext } from "@/context/context";

import RegisteredPlayerBlock from "./RegisteredPlayerBlock";

const PlayerList = ({
  togglePlayerRegView,
}: any) => {
  const [playerOption, playerDispatch] = useContext(PlayerContext);

  return (
    <div className="player-list flex gap-x-12">
      {playerOption.players.map((player: any, index: any) => {
        return (
          <RegisteredPlayerBlock
            key={index}
            playerName={player.name}
            playerId={player.id}
            isPlayerRegistrationComplete={playerOption.is_player_registration_complete}
            togglePlayerRegView={togglePlayerRegView}
          />
        );
      })}
    </div>
  );
};
export default PlayerList;
