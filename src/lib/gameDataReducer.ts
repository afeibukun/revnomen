export default function gameDataReducer(gameData: any, action: any) {
  switch (action.type) {
    case "SAVE_DATA": {
      return [
        ...gameData,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "UPDATE_DATA": {
      gameData[action.key] = action.data;
      return gameData;
    }
    case "UPDATE_MULTIPLE": {
        return {...gameData, ...action.data};
      }

    case "changed": {
      return gameData.map((t: any) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return gameData.filter((t: any) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
