import { defaultCoreState, getDerivedStateFromPropsForUrlParamsCore } from '@/utils/tools';
import CustomBase from '@/customComponents/Framework/CustomBase';

class Index extends CustomBase {
  lastLoadParams = null;

  constructor(props) {
    super(props);

    this.lastLoadParams = null;

    const defaultState = defaultCoreState();

    this.state = {
      ...defaultState,
    };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParamsCore(nextProps, prevState);
  }

  doDidMountTask = () => {
    this.adjustWhenDidMount();
  };

  adjustWhenDidMount = () => {};
}

export default Index;
