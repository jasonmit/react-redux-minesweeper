function reveal(cell, { board, seen }) {
  if (!seen) {
    seen = [];
  }

  if (!seen.includes(cell)) {
    seen.push(cell);
  }

  if (cell.get('neighborMineCount') > 0) {
    return seen;
  }

  cell
    .get('neighbors')
    .map(coord => board.getIn(coord))
    .filter(
      neighbor =>
        !seen.includes(neighbor) &&
        !neighbor.get('hasFlag') &&
        !neighbor.get('isOpened')
    )
    .forEach(neighbor => reveal(neighbor, { board, seen }));

  return seen;
}

export default reveal;
