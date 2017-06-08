import React, { Component } from 'react';
import Cell from '../cell';

class Board extends Component {
  constructor(props) {
    super(props);

    this.handleCellClicked = this.handleCellClicked.bind(this);
    this.handleCellFlagged = this.handleCellFlagged.bind(this);
  }

  handleCellClicked(_event, cell) {
    this.props.boardActions.openCell(cell);
  }

  handleContextMenu(event) {
    event.preventDefault();
  }

  handleCellFlagged(event, cell) {
    event.preventDefault();

    this.props.boardActions.flagCell(cell);
  }

  render() {
    return (
      <div onContextMenu={this.handleContextMenu}>
        {this.props.board &&
          this.props.board.map((row, idx) => {
            return (
              <div key={idx}>
                {row.map((cell, idx) => {
                  return (
                    <Cell
                      key={idx}
                      hasMine={cell.get('hasMine')}
                      hasFlag={cell.get('hasFlag')}
                      isOpened={cell.get('isOpened')}
                      isGameOver={this.props.isGameOver}
                      neighborMineCount={cell.get('neighborMineCount')}
                      onBlur={this.props.onMouseUp}
                      onFocus={this.props.onMouseDown}
                      onFlag={e => this.handleCellFlagged(e, cell)}
                      onClick={e => this.handleCellClicked(e, cell)}
                    />
                  );
                })}
              </div>
            );
          })}
      </div>
    );
  }
}

Board.defaultProps = {
  onMouseDown() {},
  onMouseUp() {},
  isGameOver: false,
  isTicking: false,
  mineCount: 10,
  columns: 9,
  rows: 9
};

export default Board;
