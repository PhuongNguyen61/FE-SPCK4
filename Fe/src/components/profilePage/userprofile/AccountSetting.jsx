import { React, useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import './AccountSetting.css';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, Button, Col, DatePicker, Form, Input, Row, Select, message } from 'antd';
import axios from 'axios';
import { Store } from '../../../Store';
// import dayjs from "dayjs";
import moment from 'moment';

const { Option } = Select;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const AccountSetting = () => {
  const navigate = useNavigate();
  const store = useContext(Store);
  useEffect(() => {
    if (!store.currentUser) {
        navigate('/');
    };
  }, []);

  const [formData, setFormData] = useState({
    address: '',
    avatar: '',
    email: '',
    dateOfBirth: '',
    phoneNumber: '',
    username: '',
    role: ''
  });

  const [fileList, setFileList] = useState([]);
  // const [previewOpen, setPreviewOpen] = useState(false);
  // const [previewImage, setPreviewImage] = useState('');

  // const handlePreview = async (file) => {
  //   // if (!file.url && !file.preview) {
  //   //   file.preview = await getBase64(file.originFileObj);
  //   // }
  //   // setPreviewImage(file.url || file.preview);
  //   setPreviewOpen(true);
  // };

  const handleChangeFile = ({ fileList: newFileList }) => setFileList(newFileList);

  // const onChange = (name, value) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  let accessToken;
  if (store.currentUser) {
      accessToken = store.currentUser.accessToken
  };

  const ModifyUserData = async () => {
    if (!fileList.length) {
      message.error("Please upload an avatar.");
      return;
    }

    try {
      const updatedData = {
        ...formData,
        avatar: fileList[0].originFileObj,
      };



      await axios.put(
        `http://localhost:8080/api/v1/users/modify/${store.currentUser._id}`, updatedData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          "Content-type": "multipart/form-data",
        },
      }
      );

      message.success("User data updated successfully!");
    } catch (error) {
      console.log(error.message);
      message.error("Failed to update user data.");
    }
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Avatar</div>
    </button>
  );

  return (
    <div className="accountsetting">
      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="username"
              label="User Name"
              rules={[{ required: true, message: 'Please enter user name' }]}
            >
              <Input
                placeholder="Please enter user name"
                onChange={(e) => onChange('username', e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[{ required: true, message: 'Please enter phone number' }]}
            >
              <Input
                placeholder="Please enter phone number"
                onChange={(e) => onChange('phoneNumber', e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true, message: 'Please enter address' }]}
            >
              <Input
                placeholder="Please enter address"
                onChange={(e) => onChange('address', e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="dateOfBirth"
              label="Date of Birth"
              rules={[{ required: true, message: 'Please select date of birth' }]}
            >
              <DatePicker onChange={(date) => onChange('dateOfBirth', date)} disabledDate={(current) => {
                return (
                  moment().add(-20, "years") <= current
                );
              }} />
            </Form.Item>
          </Col>



          <Col span={24}>
            <Upload
              className='avatar'
              listType="picture-circle"
              fileList={fileList}
              // onPreview={handlePreview}
              onChange={handleChangeFile}
              beforeUpload={() => false}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            {/* {previewImage && 
            (
              <Image
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                }}
                src={previewImage}
              />
            )} */}
          </Col>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" onClick={ModifyUserData} >
              Submit
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};

export default AccountSetting;
