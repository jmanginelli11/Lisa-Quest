//Action types
GET_SCORES = 'GET_SCORES';

//Action creators
const getScores = (scores) => {
  return {
    type: GET_SCORES,
    scores,
  };
};

const scoresReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SCORES:
      return action.scores;
    default:
      return state;
  }
};

export default scoresReducer;
