import PropTypes from 'prop-types';
import React, { Component } from 'react';
import winnerImage from './images/winner.svg';
import restingImage from './images/resting.svg';
import gameoverImage from './images/gameover.svg';
import openingImage from './images/attempting.svg';
import './styles.css';

class Avatar extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.onClick && this.props.onClick(event);
  }

  render() {
    let src;

    if (this.props.hasWon) {
      src = winnerImage;
    } else if (this.props.isGameOver) {
      src = gameoverImage;
    } else if (this.props.isOpening) {
      src = openingImage;
    } else {
      src = restingImage;
    }

    return (
      <button
        className={`avatar ${this.props.className}`}
        onClick={this.handleClick}
      >
        <img src={src} className="avatar__image" alt="icon" />
      </button>
    );
  }
}

Avatar.defaultProps = {
  className: '',
  hasWon: false,
  isOpening: false,
  isGameOver: false,
  onClick() {}
};

Avatar.propTypes = {
  className: PropTypes.string,
  hasWon: PropTypes.bool,
  isOpening: PropTypes.bool,
  isGameOver: PropTypes.bool,
  onClick: PropTypes.func
};

export default Avatar;
