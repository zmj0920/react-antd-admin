import { getDerivedStateFromPropsForUrlParams } from '@/utils/tools';
import CustomAuthorization from '@/customComponents/Framework/CustomAuthorization';

class Index extends CustomAuthorization {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }
}

export default Index;
