const GenericButton = ({ buttonLabel }: any) => {
  return (
    <>
      <button
        type="button"
        className="continue_button inline-block py-6 px-20 rounded-lg text-2xl font-semibold bg-gray-300"
      >
        {buttonLabel}
      </button>
    </>
  );
};
export default GenericButton;
