import { getDerivedStateFromPropsForUrlParams } from '../../../utils/tools';
import CustomCommonSupplement from '@/customSpecialComponents/CustomCommonSupplement';

class Index extends CustomCommonSupplement {
  static getDerivedStateFromProps(nextProps, prevState) {
    return getDerivedStateFromPropsForUrlParams(nextProps, prevState);
  }
}

export default Index;
