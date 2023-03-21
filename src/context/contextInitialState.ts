export const GAME_INITIAL_STATE = {
  game_id: null,
  is_initializing: false,
  is_hidden_names_loaded: false,
  is_ready: false,
  has_started: false,
  hidden_noun: [],
  is_completed: false,
  comment:{
    message:'',
    type:'info',
    time:null
  }
};

export const PLAYER_INITIAL_STATE = {
  is_player_registration_complete: false,
  players: [],
  next_player_index: 1,
  active_player_id: 1,
  winner: [],
};

export const TURN_INITIAL_STATE = {
  turns: [],
  current_turn: 0,
};
