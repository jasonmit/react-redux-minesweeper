import * as types from '../constants/action-types';

export function changeDifficulty(difficulty) {
  return (dispatch, getState) => {
    if (getState().get('difficulty') === difficulty) {
      return;
    }

    dispatch({
      type: types.CHANGE_DIFFICULTY,
      difficulty: difficulty
    });

    let rows, columns, mineCount;

    switch (difficulty.toLowerCase()) {
      case 'medium':
        rows = 16;
        columns = 16;
        mineCount = 40;
        break;
      case 'hard':
        rows = 16;
        columns = 30;
        mineCount = 99;
        break;
      default:
        rows = 9;
        columns = 9;
        mineCount = 10;
    }

    dispatch({
      type: types.CHANGE_BOARD_DIMENSIONS,
      rows,
      columns,
      mineCount
    });

    dispatch(newGame());
  };
}

export function newGame() {
  return {
    type: types.NEW_GAME
  };
}

export function incrementTime() {
  return {
    type: types.INCREMENT_TIME
  };
}

export function endGame() {
  return {
    type: types.END_GAME
  };
}
