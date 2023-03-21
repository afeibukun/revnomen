export default function gameReducer(gameContext: any, action: any) {
  switch (action.type) {
    case "SAVE_DATA": {
      return [
        ...gameContext,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "UPDATE_DATA": {
      gameContext[action.key] = action.data;
      return gameContext;
    }
    case "UPDATE_MULTIPLE": {
      return { ...gameContext, ...action.data };
    }

    case "changed": {
      return gameContext.map((t: any) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return gameContext.filter((t: any) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
