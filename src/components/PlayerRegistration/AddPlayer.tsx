import { useState, useEffect, useContext } from "react";
import { GameContext } from "@/context/context";

const AddPlayer = ({ singlePlayerName, handleSavePlayer, handlePlayerNameChange }: any) => {

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
        </div>
      </div>
    </div>
  );
};
export default AddPlayer;
