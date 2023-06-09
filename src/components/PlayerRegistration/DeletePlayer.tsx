import { GameContext, PlayerContext } from "@/context/context";
import { SetStateAction, useContext, useEffect, useState } from "react";

const DeletePlayer = ({ singlePlayer, handleViewReset }: any) => {
  const [gameOption, gameDispatch] = useContext(GameContext);
  const [playerOption, playerDispatch] = useContext(PlayerContext);

  const handleDeletePlayer = (event: any) => {
    event.preventDefault();
    const updatedPlayersList = playerOption.players.filter(
      (player: any) => player.id !== singlePlayer.id
    );
    playerDispatch({
      type: "UPDATE_DATA",
      key: "players",
      data: updatedPlayersList,
    });
    handleViewReset();
  };
  return (
    <div>
      <div className="delete-player-group">
        <div className="section-header">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">
              Remove Player - {singlePlayer.name}
            </h2>
          </div>
        </div>
        <div className="delete-form-group">
          <div>
            <form
              action=""
              className="delete-form"
              onSubmit={handleDeletePlayer}
            >
              <div>
                <div className="name-input">
                  <div className="mb-4">
                    <p>
                      Are you sure you want to delete Player -{" "}
                      <em>{singlePlayer.name}</em>
                    </p>
                  </div>
                </div>
                <div className="form-button mb-12 flex gap-x-12">
                  <button
                    type="submit"
                    className="inline-block py-6 px-20 rounded-lg text-2xl font-semibold bg-gray-300"
                  >
                    Delete Player
                  </button>
                  <button
                    type="button"
                    onClick={handleViewReset}
                    className="inline-block py-6 px-20 rounded-lg text-2xl font-semibold bg-gray-300"
                  >
                    Cancel
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
export default DeletePlayer;
