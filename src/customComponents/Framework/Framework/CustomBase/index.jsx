/* eslint-disable no-unused-vars */
import { PureComponent } from 'react';
import { history } from 'umi';
import { defaultBaseState } from '@/utils/tools';

class Index extends PureComponent {
  mounted = false;

  constructor(props) {
    super(props);

    this.mounted = false;

    const defaultState = defaultBaseState();

    this.state = defaultState;
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }

  componentDidMount() {
    this.mounted = true;

    this.doDidMountTask();
  }

  // eslint-disable-next-line react/sort-comp
  getSnapshotBeforeUpdate(preProps, preState) {
    return this.doWhenGetSnapshotBeforeUpdate(preProps, preState);
  }

  componentDidUpdate(preProps, preState, snapshot) {
    this.doWorkWhenDidUpdate(preProps, preState, snapshot);
  }

  componentWillUnmount() {
    this.beforeUnmount();

    this.mounted = false;

    this.setState = () => {};

    this.afterUnmount();
  }

  doDidMountTask = () => {};

  doWhenGetSnapshotBeforeUpdate = (preProps, preState) => {
    return null;
  };

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {};

  beforeUnmount = () => {};

  afterUnmount = () => {};

  goToPath = path => {
    const { dispatch } = this.props;

    const location = {
      pathname: path,
    };

    dispatch(history.push(location));
  };

  redirectToPath = path => {
    const { dispatch } = this.props;

    const location = {
      pathname: path,
    };
     dispatch(history.replace(location));
  };

  checkHasMore = (pageNo, pageSize, total) => {
    if ((total || 0) <= 0) {
      return false;
    }

    return (pageNo || 0) * (pageSize || 0) < (total || 0);
  };

  render() {
    return null;
  }
}

export default Index;
