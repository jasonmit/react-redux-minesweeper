import randomizer from './randomizer';

/* List<Any>.getIn() without the wrapping behavior */
function getIn(grid, rowIndex, columnIndex) {
  if (rowIndex < 0 || columnIndex < 0) {
    /* out of bounds */
    return null;
  }

  const row = grid.get(rowIndex);

  if (!row) {
    return null;
  }

  return row.get(columnIndex) || null;
}

export default (board, { mineCount = 0, exclusions = [] }) => {
  return board.withMutations(mutatableBoard => {
    while (mineCount > 0) {
      const x = randomizer(0, mutatableBoard.size);
      const y = randomizer(0, mutatableBoard.get(0).size);
      const cell = getIn(mutatableBoard, x, y);

      if (cell && !cell.get('hasMine') && !exclusions.includes(`${x},${y}`)) {
        mutatableBoard.setIn([x, y], cell.set('hasMine', true));
        mineCount--;
      }
    }

    mutatableBoard.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const neighbors = [
          getIn(mutatableBoard, rowIndex - 1, columnIndex) /* top */,
          getIn(mutatableBoard, rowIndex + 1, columnIndex) /* bottom */,
          getIn(mutatableBoard, rowIndex, columnIndex - 1) /* left */,
          getIn(mutatableBoard, rowIndex, columnIndex + 1) /* right */,
          getIn(mutatableBoard, rowIndex - 1, columnIndex + 1) /* top, right */,
          getIn(mutatableBoard, rowIndex - 1, columnIndex - 1) /* top, left */,
          getIn(
            mutatableBoard,
            rowIndex + 1,
            columnIndex - 1
          ) /* bottom, left */,
          getIn(
            mutatableBoard,
            rowIndex + 1,
            columnIndex + 1
          ) /* bottom, right */
        ].filter(c => c !== null);

        mutatableBoard.updateIn([rowIndex, columnIndex], cell => {
          return cell.merge({
            neighbors: neighbors.map(c => [
              c.get('rowIndex'),
              c.get('columnIndex')
            ]),
            neighborMineCount: neighbors
              .map(c => c.get('hasMine'))
              .filter(hasMine => hasMine === true).length
          });
        });
      });
    });
  });
};
