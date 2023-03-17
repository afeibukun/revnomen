const UpdatePlayer = ({
  singlePlayer,
  singlePlayerName,
  handlePlayerNameChange,
  handlePlayerFormReset,
  handleUpdatePlayer,
}: any) => {
  return (
    <div>
      <div className="edit-player-group">
        <div className="section-header">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">
              Update Player - {singlePlayer.name}
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
                    <label
                      htmlFor="player_name"
                      className="text-3xl font-medium"
                    >
                      Player Name
                    </label>
                    <input
                      type="text"
                      id="player_name"
                      name="player_name"
                      className="inline-block w-full py-5 px-2 rounded-md bg-gray-300 text-3xl"
                      value={singlePlayerName}
                      onChange={handlePlayerNameChange}
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
                    onClick={handlePlayerFormReset}
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
