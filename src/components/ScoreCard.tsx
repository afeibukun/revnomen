import UserAvatarGroup from "./UserAvatarGroup";

const ScoreCard = ({initials, userName, points, active, winner} : any) => {
  return (
    <div>
      <div className={`score-card`}>
        <div className={`py-4 px-4 ${active ? 'bg-gray-300 active-player-card':''} ${ winner ? 'winning-player': ''}`}>
          <UserAvatarGroup initials={initials} userName={userName} />
          <div className="player-point">
            <div className="text-center">
              <em className="text-2xl font-semibold">{ points }</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ScoreCard;
