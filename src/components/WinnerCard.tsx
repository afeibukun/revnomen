import { useContext } from "react";
import { PlayerContext } from "@/context/context";

import styles from "@/styles/utils.module.css";

const WinnerCard = () => {
  const [playerOption, playerDispatch] = useContext(PlayerContext);

  const winnerArrayExist = () => {
    try {
      return Array.isArray(playerOption.winner);
    } catch (error) {
      return false;
    }
  };

  return (
    <>
      <div className="winner-box">
        <div className="flex justify-center items-center py-28 rounded-md mb-6 bg-gray-200">
          <div className="px-4">
            {winnerArrayExist() ? (
              <div>
                {playerOption.winner.length == 1 ? (
                  <div>
                    <h2 className="text-6xl font-bold mb-2">Woohoo</h2>
                    <h3 className="text-4xl font-medium text-center">
                      <span className="capitalize bg-green-100 px-2">
                        {playerOption.winner[0].name}
                      </span>{" "}
                      Wins
                    </h3>
                  </div>
                ) : playerOption.winner.length ==
                  playerOption.players.length ? (
                  <div>
                    <h2 className="text-6xl font-bold">Oh my!!!</h2>
                    <h4 className="text-4xl">The game was a tie</h4>
                    <h5 className="text-3xl">Great Job guys</h5>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-6xl font-bold">
                      And Your winners are !!!
                    </h2>
                    <ul>
                      {playerOption.winner.map((singleWinner: any) => {
                        return (
                          <li
                            key={singleWinner.id}
                            className="text-2xl capitalize bg-green-100 my-1 font-medium"
                          >
                            {singleWinner.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
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
export default WinnerCard;
