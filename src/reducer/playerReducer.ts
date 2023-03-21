export default function playerReducer(playerContext: any, action: any) {
  switch (action.type) {
    case "SAVE_DATA": {
      return [
        ...playerContext,
        {
          id: action.id,
          text: action.text,
          done: false,
        },
      ];
    }
    case "UPDATE_DATA": {
      playerContext[action.key] = action.data;
      return playerContext;
    }
    case "UPDATE_MULTIPLE": {
        return {...playerContext, ...action.data};
      }

    case "changed": {
      return playerContext.map((t: any) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "deleted": {
      return playerContext.filter((t: any) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
