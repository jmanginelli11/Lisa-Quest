import axios from 'axios';

//Action types
const SET_SCORES = 'SET_SCORES';

//Action creators
const setScores = (scores) => {
  return {
    type: SET_SCORES,
    scores,
  };
};

//Thunk
export const fetchScores = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/scores');
      dispatch(setScores(data));
    } catch (error) {
      console.error(error);
    }
  };
};

//Reducer
const scoresReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SCORES:
      return action.scores;
    default:
      return state;
  }
};

export default scoresReducer;
