import { useState, useContext } from "react";
import { PlayerContext } from "@/context/context";

import PlayerInput from "./PlayerInput";

const AddPlayer = () => {
  const [playerOption, playerDispatch] = useContext(PlayerContext);
  const [playerName, setPlayerName] = useState("");

  const handlePlayerNameChange = (event: any) => {
    setPlayerName(event.target.value);
  };

  const handleSavePlayer = (event: any) => {
    event.preventDefault();
    let newPlayerId = Number(playerOption.next_player_index);
    const singlePlayer = {
      id: newPlayerId,
      name: playerName,
      points: 0,
    };

    playerDispatch({
      type: "UPDATE_MULTIPLE",
      data: {
        players: [...playerOption.players, singlePlayer],
        next_player_index: newPlayerId + 1,
      },
    });
    setPlayerName("");
  };

  return (
    <div>
      <div className="player-registration-group">
        <div>
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
                        <PlayerInput
                          inputId="new_player_name"
                          inputName="player_name"
                          inputLabel="Player Name"
                          playerName={playerName}
                          handlePlayerNameChange={handlePlayerNameChange}
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
        </div>
      </div>
    </div>
  );
};
export default AddPlayer;
