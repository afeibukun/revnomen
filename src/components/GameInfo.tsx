import { useState, useContext, useEffect } from "react";
import { GameContext, PlayerContext } from "@/context/context";

import styles from "@/styles/utils.module.css";

const GameInfo = () => {
  const [playerOption, playerDispatch] = useContext(PlayerContext);
  const [gameOption, gameDispatch] = useContext(GameContext);

  const [showComment, setShowComment] = useState(false);

  const getActivePlayerName = () => {
    try {
      return playerOption.players.filter(
        ({ id }: any) => id == playerOption.active_player_id
      )[0].name;
    } catch (error) {
      return "";
    }
  };

  useEffect(() => {
    setShowComment(true);
    let commentTimeout = setTimeout(() => {
      setShowComment(false);
    }, 10 * 1000);
    return () => {
      clearTimeout(commentTimeout);
    };
  }, [gameOption.comment.time]);

  return (
    <>
      <div className="game-info-container">
        <div className="pt-3 py-2 mb-6 rounded-md bg-gray-300">
          <div className="turn-indicator">
            <div>
              <p className="font-bold text-xl text-center">
                <span className="capitalize">{getActivePlayerName()}</span>
                &apos;s <span className="capitalize">Turn</span>
              </p>
            </div>
          </div>
          <div className={styles.otherInfoLabel}>
            {showComment ? (
              <div className="text-center py-3 relative">
                {gameOption.comment.message ? (
                  <p
                    className={`inline-block rounded text-center mt-2 px-4 py-1 absolute ${
                      gameOption.comment.type == "success"
                        ? "bg-green-100 text-green-700"
                        : gameOption.comment.type == "error"
                        ? "bg-red-100 text-red-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {gameOption.comment.message}
                  </p>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default GameInfo;
