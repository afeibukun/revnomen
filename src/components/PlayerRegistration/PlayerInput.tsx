const PlayerInput = ({inputId, inputName, inputLabel, playerName, handlePlayerNameChange} : any) => {
  return (
    <>
      <label htmlFor={inputId} className="text-3xl font-medium">
        {inputLabel}
      </label>
      <input
        type="text"
        id={inputId}
        name={inputName}
        className="inline-block w-full py-5 px-2 rounded-md bg-gray-300 text-3xl"
        value={playerName}
        onChange={handlePlayerNameChange}
      />
    </>
  );
};
export default PlayerInput;
