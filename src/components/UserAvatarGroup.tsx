import UserInitialsAvatar from "./UserInitialsAvatar";

const UserAvatarGroup = ({ initials, userName }: any) => {
  return (
    <div className="user-avatar-group cursor-pointer">
      <UserInitialsAvatar initials={initials} />
      <div className="user-name">
        <div className="w-14">
          <p className="text-center text-xs font-light capitalize">{userName}</p>
        </div>
      </div>
    </div>
  );
};
export default UserAvatarGroup;
