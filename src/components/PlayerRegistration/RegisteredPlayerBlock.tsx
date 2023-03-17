import UserAvatarGroup from "@/components/UserAvatarGroup";

import styles from "@/styles/utils.module.css";

const RegisteredPlayerBlock = ({
  playerName,
  playerId,
  isPlayerRegistrationComplete,
  togglePlayerRegView,
}: any) => {
  return (
    <div className="registered-user inline-block">
      <div className="relative">
        <div className="mb-4">
          <UserAvatarGroup
            initials={playerName.substring(0, 2).toUpperCase()}
            userName={playerName}
          />
        </div>
        {!isPlayerRegistrationComplete ? (
          <div className={`${styles.userAction} user-action`}>
            <div className="p-3.5 rounded-md bg-gray-400">
              <ul className="flex gap-x-2">
                <li className="hidden">
                  <span>{playerName}</span>
                </li>
                <li>
                  <button
                    className="underline"
                    onClick={() => togglePlayerRegView("edit", playerId)}
                  >
                    Update
                  </button>
                </li>
                <li>
                  <button
                    className="underline"
                    onClick={() => togglePlayerRegView("delete", playerId)}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default RegisteredPlayerBlock;
