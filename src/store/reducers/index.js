import { Map, List } from 'immutable';
import plantMines from '../../lib/plant-mines';
import createBoard from '../../lib/create-board';
import * as types from '../constants/action-types';

function cellPosition(cell) {
  return [cell.get('rowIndex'), cell.get('columnIndex')];
}

const initalState = Map({
  board: List(),
  rows: 9,
  columns: 9,
  difficulty: 'easy',
  isTicking: false,
  timeSpent: 0,
  hasWon: false,
  mineCount: 10,
  minesLeft: 10,
  openCount: 0
});

export default (state = initalState, action) => {
  switch (action.type) {
    case types.NEW_GAME:
      return state
        .mergeDeep({
          isGameOver: false,
          minesLeft: state.get('mineCount'),
          hasWon: false,
          openCount: 0,
          timeSpent: 0
        })
        .set(
          'board',
          createBoard({
            rows: state.get('rows'),
            columns: state.get('columns'),
            mineCount: state.get('mineCount')
          })
        );

    case types.CHANGE_DIFFICULTY:
      return state.set('difficulty', action.difficulty);

    case types.CHANGE_BOARD_DIMENSIONS:
      return state.merge({
        isTicking: false,
        rows: action.rows,
        columns: action.columns,
        mineCount: action.mineCount
      });

    case types.END_GAME:
      return state.merge({
        isTicking: false,
        isGameOver: true
      });

    case types.WINNER_WINNER_CHICKEN_DINNER:
      return state.merge({
        isTicking: false,
        isGameOver: true,
        hasWon: true
      });

    case types.PLANT_MINES:
      return state.update('board', board => {
        return plantMines(board, {
          mineCount: state.get('mineCount'),
          exclusions: action.exclusions
        });
      });

    case types.OPEN_CELL:
      return state
        .setIn(['board', ...cellPosition(action.cell), 'isOpened'], true)
        .update('openCount', openCount => ++openCount)
        .set('isTicking', true);

    case types.INCREMENT_TIME:
      return state.update('timeSpent', timeSpent => ++timeSpent);

    case types.ADD_FLAG:
      return state
        .setIn(['board', ...cellPosition(action.cell), 'hasFlag'], true)
        .update('minesLeft', minesLeft => --minesLeft)
        .set('isTicking', true);

    case types.REMOVE_FLAG:
      return state
        .setIn(['board', ...cellPosition(action.cell), 'hasFlag'], false)
        .update('minesLeft', minesLeft => ++minesLeft);

    default:
      return state;
  }
};
