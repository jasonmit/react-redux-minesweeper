import React from 'react';

export default ({ seconds }) => {
  let minutes = Math.floor(seconds / 60);
  let secondsFormat = seconds - minutes * 60 || 0;

  if (secondsFormat < 10) {
    secondsFormat = `0${secondsFormat}`;
  }

  return <span className="timer">{minutes}:{secondsFormat}</span>;
};
