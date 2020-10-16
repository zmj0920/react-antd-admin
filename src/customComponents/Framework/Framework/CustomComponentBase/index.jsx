import { Component } from 'react';

import { isEqual, cloneWithoutMethod } from '@/utils/tools';

class CustomComponentBase extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    const sourceProps = cloneWithoutMethod(this.props);
    const targetProps = cloneWithoutMethod(nextProps);

    const isEqualProps = isEqual(sourceProps, targetProps);

    if (!isEqualProps) {
      return true;
    }

    const sourceState = cloneWithoutMethod(this.state);
    const targetState = cloneWithoutMethod(nextState);

    const isEqualState = isEqual(sourceState, targetState);

    if (!isEqualState) {
      return true;
    }

    return false;
  }

  render() {
    return null;
  }
}

export default CustomComponentBase;
