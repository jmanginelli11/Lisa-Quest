import axios from 'axios';

//Action types
const GET_SCORES = 'GET_SCORES';
const ADD_SCORES = 'ADD_SCORES';

//Action creators
const getScores = (scores) => {
  return {
    type: GET_SCORES,
    scores,
  };
};

const addScores = (score) => {
  return {
    type: ADD_SCORES,
    score,
  };
};

//Thunk creators
export const fetchScores = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/scores');
      dispatch(getScores(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const persistAddedScores = (score) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('/api/scores', score, {
        headers: {
          authorization: `${process.env.SECRET_AUTH}`,
        },
      });
      dispatch(addScores(data));
      dispatch(fetchScores());
    } catch (error) {
      console.error(error);
    }
  };
};

//Reducer
const scoresReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SCORES:
      return action.scores;
    case ADD_SCORES:
      return action.score;
    default:
      return state;
  }
};

export default scoresReducer;
