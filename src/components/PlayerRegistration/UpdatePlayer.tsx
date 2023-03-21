import { useState, useEffect, useContext } from "react";
import { GameContext, PlayerContext } from "@/context/context";

import PlayerInput from "./PlayerInput";

const UpdatePlayer = ({ selectedPlayer, handleViewReset }: any) => {
  const [gameOption, gameDispatch] = useContext(GameContext);
  const [playerOption, playerDispatch] = useContext(PlayerContext);
  const [player, setPlayer] = useState(selectedPlayer);

  const handlePlayerNameChange = (event: any) => {
    setPlayer({ ...player, name: event.target.value });
  };

  const handleUpdatePlayer = (event: any) => {
    event.preventDefault();
    const updatedSinglePlayer = {
      id: player.id,
      name: player.name,
      points: player.points,
    };
    const updatedPlayersList = playerOption.players.map((thisPlayer: any) => {
      if (thisPlayer.id == player.id) return updatedSinglePlayer;
      else return thisPlayer;
    });
    playerDispatch({
      type: "UPDATE_DATA",
      key: "players",
      data: updatedPlayersList,
    });
    setPlayer(null);
    handleViewReset();
  };

  return (
    <div>
      <div className="edit-player-group">
        <div className="section-header">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">
              Update Player - {selectedPlayer.name}
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
                    <PlayerInput
                      inputId="player_name"
                      inputName="player_name"
                      inputLabel="Player Name"
                      playerName={player.name}
                      handlePlayerNameChange={handlePlayerNameChange}
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
                    onClick={handleViewReset}
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
    </div>
  );
};
export default UpdatePlayer;
