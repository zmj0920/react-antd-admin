import React from 'react';
import { Modal } from 'antd';

const UpdateForm = (props) => {
  const { updateModalVisible, onCancel, modalTitle } = props;
  let values = props.children.props.values
  let columns = props.children.props.columns
  let array = Object.keys(values)
  let arr = Object.values(values)
  for (let i = 0; i < array.length; i++) {
    const key = array[i];
    for (let index = 0; index < columns.length; index++) {
      const dataIndex = columns[index].dataIndex;
      if (key == dataIndex) {
        props.children.props.columns[index]['initialValue'] = arr[i]
        // if (props.children.props.columns[index]['initialValue'] == "") {
        //   props.children.props.columns[index]['initialValue'] = arr[i]
        // }
      }
    }
  }
  return (
    <Modal
      title={modalTitle}
      visible={updateModalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      {props.children}
    </Modal>
  );
};

export default UpdateForm;