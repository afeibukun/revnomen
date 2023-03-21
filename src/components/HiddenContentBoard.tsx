import { useState, useContext, useEffect } from "react";
import { GameContext, PlayerContext, TurnContext } from "@/context/context";

import HiddenContentCategoryName from "@/components/HiddenContentCategoryName";
import styles from "@/styles/utils.module.css";

const HiddenContentBoard = () => {
  const [gameOption, gameDispatch] = useContext(GameContext);
  const findCurrentCategory = () => {
    let currentCategory = "";
    let i = 0;
    try {
      while (currentCategory == "") {
        if (gameOption.hidden_noun[i].hiddenNounArray.indexOf("") !== -1) {
          currentCategory = gameOption.hidden_noun[i].category;
        }
        i++;
      }
    } catch (error) {
      currentCategory = "";
    }
    return currentCategory;
  };
  return (
    <>
      {gameOption.hidden_noun.map((singleHiddenNoun: any, index: any) => (
        <div
          className={`hidden-name-category category-${index + 1}`}
          key={singleHiddenNoun.category}
        >
          <div
            className={`flex mb-5 items-center py-1 px-2 rounded-md ${
              findCurrentCategory() == singleHiddenNoun.category
                ? "bg-gray-200"
                : ""
            }`}
          >
            <div className="category-name">
              <div>
                <HiddenContentCategoryName>
                  {singleHiddenNoun.category}
                </HiddenContentCategoryName>
              </div>
            </div>
            <div className="hidden-name-container">
              <div className="flex gap-x-4 flex-wrap">
                {singleHiddenNoun.hiddenNounArray.map(
                  (singleHiddenNoun: String, index: any) => (
                    <div className="hidden-name-letter" key={index + 1}>
                      <div>
                        <span
                          className={`${styles.hiddenLetterDisplay} hidden-letter-display relative inline-block w-8 h-8 border-b-2 border-black text-center text-2xl font-medium uppercase outline-0 bg-transparent`}
                        >
                          <span className="absolute">{singleHiddenNoun}</span>
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default HiddenContentBoard;
