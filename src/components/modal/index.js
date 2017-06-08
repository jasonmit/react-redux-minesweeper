import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

function Modal({ children, name, ...transitionGroup }) {
  return (
    <CSSTransitionGroup transitionName={name} {...transitionGroup}>
      {children}
    </CSSTransitionGroup>
  );
}

Modal.defaultProps = {
  name: 'transition',
  transitionAppear: true,
  transitionAppearTimeout: 800,
  transitionEnter: true,
  transitionEnterTimeout: 0,
  transitionLeave: true,
  transitionLeaveTimeout: 800
};

Modal.propTypes = {
  name: PropTypes.string,
  transitionAppear: PropTypes.bool,
  transitionAppearTimeout: PropTypes.number,
  transitionEnter: PropTypes.bool,
  transitionEnterTimeout: PropTypes.number,
  transitionLeave: PropTypes.bool,
  transitionLeaveTimeout: PropTypes.number
};

export default Modal;
