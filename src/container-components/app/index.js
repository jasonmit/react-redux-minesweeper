import classNames from 'classnames';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as appActionCreators from '../../store/actions/app';
import Toolbar from '../../components/toolbar';
import BoardContainer from '../board';
import './styles.css';

const TASK = Symbol();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpening: false
    };

    this.tick = this.tick.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleCellBlur = this.handleCellBlur.bind(this);
    this.handleCellFocus = this.handleCellFocus.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isTicking && nextProps.isTicking) {
      clearInterval(this[TASK]);
      this[TASK] = setInterval(this.tick, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this[TASK]);
  }

  handleCellFocus(_event, _cell) {
    this.setState({ isOpening: true });
  }

  handleCellBlur(_event, _cell) {
    this.setState({ isOpening: false });
  }

  handleReset() {
    if (this.props.isTicking) {
      this.props.appActions.endGame();
    }

    this.props.appActions.newGame();
  }

  tick() {
    if (!this.props.isTicking) {
      return;
    }

    this.props.appActions.incrementTime();
  }

  render() {
    const {
      isGameOver,
      isTicking,
      hasWon,
      mineCount,
      minesLeft,
      timeSpent
    } = this.props;
    const { isOpening } = this.state;
    const className = classNames({
      app: true,
      app__is_ticking: isTicking
    });

    return (
      <div className={className}>
        <Toolbar
          hasWon={hasWon}
          isOpening={isOpening}
          isTicking={isTicking}
          mineCount={mineCount}
          minesLeft={minesLeft}
          timeSpent={timeSpent}
          onReset={this.handleReset}
        />
        <div className="app__container">
          <BoardContainer
            mineCount={mineCount}
            isTicking={isTicking}
            isGameOver={isGameOver}
            onMouseUp={this.handleCellBlur}
            onMouseDown={this.handleCellFocus}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    hasWon: state.get('hasWon'),
    timeSpent: state.get('timeSpent'),
    mineCount: state.get('mineCount'),
    isTicking: state.get('isTicking'),
    minesLeft: state.get('minesLeft'),
    isGameOver: state.get('isGameOver')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
