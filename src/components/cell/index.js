import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import bombImage from './images/bomb.svg';
import flagImage from './images/flag.svg';
import './styles.css';

class Cell extends Component {
  constructor(props) {
    super(props);

    this.handleFocus = this.handleFocus.bind(this);
  }

  handleFocus(event) {
    !this.props.isOpened && this.props.onFocus(event);
  }

  render() {
    const {
      hasFlag,
      isOpened,
      hasMine,
      isGameOver,
      neighborMineCount
    } = this.props;

    const className = classNames({
      cell: true,
      cell__opened: isOpened,
      cell__closed: !isOpened,
      cell__exploded: isOpened && hasMine
    });

    return (
      <button
        className={className}
        onBlur={this.props.onBlur}
        onFocus={this.handleFocus}
        onClick={this.props.onClick}
        onMouseUp={this.props.onBlur}
        onContextMenu={this.props.onFlag}
      >
        <div className="cell__face cell__face__front">
          {!isOpened &&
            hasFlag &&
            !isGameOver &&
            <img src={flagImage} alt="flag" />}
        </div>
        <div className="cell__face cell__face__back">
          {isOpened &&
            !hasMine &&
            neighborMineCount > 0 &&
            <span className={`cell__count-${neighborMineCount}`}>
              {neighborMineCount}
            </span>}
          {((hasMine && isOpened) || (hasMine && isGameOver)) &&
            <img src={bombImage} alt="bomb" />}
        </div>
      </button>
    );
  }
}

Cell.defaultProps = {
  hasFlag: false,
  hasMine: false,
  isOpened: false,
  neighborMineCount: 0,
  onBlur() {},
  onFocus() {},
  onClick() {},
  onFlag() {}
};

Cell.propTypes = {
  hasFlag: PropTypes.bool,
  hasMine: PropTypes.bool,
  isOpened: PropTypes.bool,
  neighborMineCount: PropTypes.number,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onClick: PropTypes.func,
  onFlag: PropTypes.func
};

export default Cell;
