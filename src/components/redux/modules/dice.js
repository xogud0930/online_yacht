// dice.js
// action type
const SET_DICE = 'dice/SET_DICE';
const SET_KEEPSTATE = "dice/SET_KEEPSTATE";
const CLEAR_DICE = 'dice/CLEAR_DICE';

// action creator
export const setDice = (array) => {
  return {
    type: SET_DICE,
    array
  }
};

export const setKeepState = (array) => {
  return {
    type: SET_KEEPSTATE,
    array
  }
}

export const clearDice = () => {
  return {
    type: CLEAR_DICE,
  }
}

// initial state
const initialState = {
  array:[0,0,0,0,0],
  keepState:[false,false,false,false,false]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_DICE:
      return {...state,
        array: action.array
      };
    case SET_KEEPSTATE:
      return {...state,
        keepState: action.array
      };
    case CLEAR_DICE:
      return initialState;
    default:
      return state;
  }
}