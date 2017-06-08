import React, { Component } from 'react';
import Settings from '../../container-components/settings';
import gearImage from './images/gear.svg';
import Avatar from '../avatar';
import Timer from '../timer';
import './styles.css';

class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSettings: false
    };

    this.handleSettings = this.handleSettings.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
  }

  handleSettings(_event) {
    this.setState({
      showSettings: !this.state.showSettings
    });
  }

  render() {
    const {
      minesLeft,
      isOpening,
      isTicking,
      isGameOver,
      onReset,
      hasWon,
      timeSpent
    } = this.props;

    return (
      <div className="toolbar">
        <Settings
          isOpen={this.state.showSettings}
          onClose={this.handleSettings}
        />
        <div className="toolbar__settings">
          <button
            className="toolbar__settings__button"
            onClick={this.handleSettings}
          >
            <img src={gearImage} alt="settings" />
          </button>
        </div>
        <div className="toolbar_count">{minesLeft}</div>
        <Avatar
          className="toolbar__avatar"
          hasWon={hasWon}
          isOpening={isOpening}
          isTicking={isTicking}
          isGameOver={isGameOver}
          onClick={onReset}
        />
        <div className="toolbar_time">
          <Timer seconds={timeSpent} />
        </div>
      </div>
    );
  }
}

Toolbar.defaultProps = {
  onReset() {},
  minesLeft: 0,
  isGameOver: false,
  isTicking: false,
  isOpening: false,
  hasWon: false,
  timeSpent: 0
};

export default Toolbar;
