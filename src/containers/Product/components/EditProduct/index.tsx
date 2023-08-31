import {
  Button,
  Col,
  Divider,
  Drawer, Form, Input, InputNumber, Row, Space, Spin,
} from 'antd';
import { useState } from 'react';
import UploadImage from '@/components/OSSImageUpload';
import { useEditProductInfo, useProductInfo } from '@/services/product';
import TypeSelect from '@/components/TypeSelect';

const { TextArea } = Input;

interface IProps {
  id?: string;
  onClose: (isReload?: boolean) => void;
}

const EditProduct = ({
  onClose,
  id,
}: IProps) => {
  const [form] = Form.useForm();
  const [edit, editLoading] = useEditProductInfo();
  const { data, loading } = useProductInfo(id);
  const [open, setOpen] = useState(true);

  const onSubmitHandler = async () => {
    const values = await form.validateFields();
    if (values) {
      const newValues = {
        ...values,
        coverUrl: values.coverUrl[0].url,
        bannerUrl: values.bannerUrl[0].url,
      };
      edit(id, newValues, onClose);
    }
  };

  return (
    <Drawer
      title={id ? 'Edit Product' : 'Create Product'}
      width={900}
      open={open}
      onClose={() => setOpen(false)}
      afterOpenChange={(o) => !o && onClose()}
      extra={(
        <Space>
          <Button onClick={() => onClose()}>Cancel</Button>
          <Button loading={editLoading} onClick={onSubmitHandler} type="primary">
            Submit
          </Button>
        </Space>
      )}
    >
      <Spin spinning={loading}>
        {(data || !id) && (
        <Form
          form={form}
          initialValues={data}
        >
          <Row gutter={20}>
            <Col span={16}>
              <Form.Item
                style={{ width: '100%' }}
                label="Product Name"
                name="name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Product Type"
                name="type"
                rules={[{ required: true }]}
              >
                <TypeSelect />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="Stock"
                name="stock"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Limit Buy Per Person"
                name="limitBuyNumber"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="Original Price"
                name="originalPrice"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Sale Price"
                name="preferentialPrice"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Product Description"
            name="desc"
            rules={[{ required: true }]}
          >
            <TextArea
              maxLength={200}
              rows={5}
              allowClear
              showCount
            />
          </Form.Item>
          <Divider>Image Setting</Divider>
          <Form.Item
            name="coverUrl"
            label="Cover Image of the Product: aspect ratio is required to be 16:9."
            rules={[{ required: true }]}
            labelCol={{
              span: 24,
            }}
          >
            <UploadImage
              maxCount={1}
              imgCropAspect={16 / 9}
            />
          </Form.Item>
          <Form.Item
            name="bannerUrl"
            label="Banner of the Product: aspect ratio is required to be 16:9."
            rules={[{ required: true }]}
            labelCol={{
              span: 24,
            }}
          >
            <UploadImage
              maxCount={1}
              imgCropAspect={16 / 9}
            />
          </Form.Item>
        </Form>
        )}
      </Spin>
    </Drawer>
  );
};

EditProduct.defaultProps = {
  id: '',
};

export default EditProduct;
