import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import * as appActionCreators from '../../store/actions/app';
import Modal from '../../components/modal';
import './styles.css';

class Settings extends Component {
  constructor(props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  handleChange(difficulty) {
    this.props.appActions.updateDifficulty(difficulty);
  }

  handleClose() {
    this.props.onClose();
  }

  render() {
    return (
      <Modal name="modal__settings">
        {this.props.isOpen &&
          <div className="settings">
            <h2>Settings</h2>
            <div className="settings__section settings__difficulty">
              <h3>Difficulty</h3>
              {['easy', 'medium', 'hard'].map((difficulty, idx) => {
                return (
                  <label key={idx}>
                    <input
                      type="radio"
                      name="difficulty"
                      onChange={() => this.handleChange(difficulty)}
                      checked={difficulty === this.props.difficulty}
                    />
                    {difficulty}
                  </label>
                );
              })}
            </div>
            <button className="primary" onClick={this.handleClose}>
              Close
            </button>
          </div>}
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    difficulty: state.get('difficulty')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActionCreators, dispatch)
  };
}

Settings.propTypes = {
  difficulty: PropTypes.string,
  appActions: PropTypes.object,
  onClose: PropTypes.func,
  isOpen: PropTypes.bool
};

Settings.defaultProps = {
  onClose() {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
