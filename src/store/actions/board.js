import * as types from '../constants/action-types';
import reveal from '../../lib/reveal';

function openCellAction(cell) {
  return {
    type: types.OPEN_CELL,
    cell
  };
}

function isBoardComplete(board, openCount, mineCount) {
  if (!board || !board.size) {
    return false;
  }

  return board.get(0).size * board.size - openCount === mineCount;
}

export function openCell(cell) {
  return (dispatch, getState) => {
    if (cell.get('isOpened')) {
      return;
    }

    if (getState().get('isGameOver')) {
      return dispatch({ type: types.CONFIGURE_ROUND });
    }

    /* first selection.  plant mines and notify mine planter to exclude `cell` */
    if (getState().get('openCount') === 0) {
      dispatch({
        type: types.PLANT_MINES,
        exclusions: [`${cell.get('rowIndex')},${cell.get('columnIndex')}`]
      });

      // update ref to cell since planting can create new cells
      cell = getState().getIn([
        'board',
        cell.get('rowIndex'),
        cell.get('columnIndex')
      ]);
    }

    if (cell.get('hasFlag')) {
      return dispatch(removeFlagAction(cell));
    }

    if (cell.get('hasMine')) {
      dispatch({ type: types.OPEN_CELL, cell });
      dispatch({ type: types.STOP_ROUND });
    } else {
      reveal(cell, {
        board: getState().get('board')
      }).forEach(revealableCell => dispatch(openCellAction(revealableCell)));

      // grade the board
      const state = getState();

      if (
        isBoardComplete(
          state.get('board'),
          state.get('openCount'),
          state.get('mineCount')
        )
      ) {
        dispatch({
          type: types.WINNER_WINNER_CHICKEN_DINNER
        });
      }
    }
  };
}

function toggleFlagAction(cell) {
  if (cell.get('hasFlag')) {
    return removeFlagAction(cell);
  }

  return {
    type: types.ADD_FLAG,
    cell
  };
}

function removeFlagAction(cell) {
  return {
    type: types.REMOVE_FLAG,
    cell
  };
}

export function flagCell(cell) {
  return (dispatch, getState) => {
    const isGameOver = getState().get('isGameOver');

    if (!isGameOver && !cell.get('isOpened')) {
      dispatch(toggleFlagAction(cell));
    }
  };
}
