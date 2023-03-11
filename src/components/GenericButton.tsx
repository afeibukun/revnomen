const GenericButton = ({ buttonClass, children, handleClick }: any) => {

 
  return (
    <>
      <button
        type="button"
        className={`${buttonClass} generic-button inline-block py-6 px-20 rounded-lg text-2xl font-semibold bg-gray-300`}
        onClick={handleClick}
      >
        {children}
      </button>
    </>
  );
};
export default GenericButton;
