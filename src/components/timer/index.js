import React from 'react';
import PropTypes from 'prop-types';

function Timer({ seconds }) {
  let minutes = Math.floor(seconds / 60);
  let secondsFormat = seconds - minutes * 60 || 0;

  if (secondsFormat < 10) {
    secondsFormat = `0${secondsFormat}`;
  }

  return <span className="timer">{minutes}:{secondsFormat}</span>;
}

Timer.defaultProps = {
  seconds: 0
};

Timer.propTypes = {
  seconds: PropTypes.number
};

export default Timer;
