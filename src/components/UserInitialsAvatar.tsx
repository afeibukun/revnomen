const UserInitialsAvatar = ({initials}: any) => {
  return (
    <>
      <div className="user-avatar">
        <div className="inline-flex w-14 h-14 rounded-full justify-center items-center bg-gray-400">
          <h3 className="text-2xl font-medium">{ initials }</h3>
        </div>
      </div>
    </>
  );
};
export default UserInitialsAvatar;
