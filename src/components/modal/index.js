import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

export default ({ children, name }) => {
  return (
    <CSSTransitionGroup
      transitionName={name}
      transitionAppear={true}
      transitionAppearTimeout={800}
      transitionEnter={true}
      transitionEnterTimeout={0}
      transitionLeave={true}
      transitionLeaveTimeout={800}
    >
      {children}
    </CSSTransitionGroup>
  );
};
