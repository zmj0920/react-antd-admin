import ModalBase from '@/customComponents/Framework/CustomForm/ModalBase';

class AddFormModalBase extends ModalBase {
  constructor(props) {
    super(props);

    this.state = {
      ...this.state,
      ...{
        visible: false,
        needReset: false,
      },
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { visible } = nextProps;
    const { visible: visiblePre, externalData } = prevState;

    let needReset = false;

    if (visiblePre === false && visible === true) {
      needReset = true;
    }

    return { visible, needReset, externalData };
  }

  // eslint-disable-next-line no-unused-vars
  doWorkWhenDidUpdate = (preProps, preState, snapshot) => {
    const { needReset } = this.state;
    const { form } = this.props;

    if (needReset) {
      form.resetFields();

      this.setState({ needReset: false });
    }
  };
}

export default AddFormModalBase;
