import {
  Drawer, Col, Divider, Form, Input, Row, Select, Spin, Button, UploadFile,
} from 'antd';
import { useMemo } from 'react';
import UploadImage from '@/components/OSSImageUpload';
import { useOrganization, useEditInfo } from '@/services/org';
import { IOrganization } from '@/utils/types';

interface IProp {
  id: string;
  onClose: () => void;
}

const EditOrg = ({ id, onClose }:IProp) => {
  const [form] = Form.useForm();

  const { data, loading: queryLoading } = useOrganization(id);
  // console.log('data:', data);
  const [edit, editLoading] = useEditInfo();

  const onFinishHandler = async () => {
    const values = await form.validateFields();
    if (values) {
      // console.log('values:', values);
      const formData = {
        ...values,
        logo: values.logo[0].url,
        tags: values.tags.join(','),
        identityCardBackImg: values.identityCardBackImg[0].url,
        identityCardFrontImg: values.identityCardFrontImg[0].url,
        businessLicense: values.businessLicense[0].url,
        orgFrontImg: values?.orgFrontImg?.map((item: UploadFile) => ({ url: item.url })),
        orgRoomImg: values?.orgRoomImg?.map((item: UploadFile) => ({ url: item.url })),
        orgOtherImg: values?.orgOtherImg?.map((item: UploadFile) => ({ url: item.url })),
      } as IOrganization;
      edit(id, formData);
    }
  };

  const initValue = useMemo(() => (data ? {
    ...data,
    tags: data.tags?.split(','),
    logo: [{ url: data.logo }],
    identityCardBackImg: [{ url: data.identityCardBackImg }],
    identityCardFrontImg: [{ url: data.identityCardFrontImg }],
    businessLicense: [{ url: data.businessLicense }],
  } : {}), [data]);

  if (queryLoading) {
    return <Spin />;
  }

  return (
    <Drawer
      title="Edit Organization Info"
      width={800}
      onClose={onClose}
      open
      footerStyle={{ textAlign: 'right' }}
      footer={(
        <Button
          loading={editLoading}
          type="primary"
          onClick={onFinishHandler}
        >
          Save
        </Button>
      )}
    >
      <Form form={form} initialValues={initValue} layout="vertical">
        <Row gutter={20}>
          <Col span={10}>
            <Form.Item
              style={{ width: '100%' }}
              label="Logo"
              name="logo"
              rules={[{ required: true }]}
            >
              <UploadImage
                maxCount={1}
                label="Change Logo"
              />
            </Form.Item>
          </Col>
          <Col span={14}>
            <Form.Item
              style={{ width: '100%' }}
              label="Name"
              name="name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Please input organization name" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={11}>
            <Form.Item
              label="Tags"
              name="tags"
              rules={[{ required: true }]}
            >
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Please input tag"
              />
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item
              label="Tel"
              name="tel"
              rules={[{ required: true }]}
            >
              <Input placeholder="Please input mobile number" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="Longitude"
              name="longitude"
              rules={[{ required: true }]}
            >
              <Input placeholder="Please input longitude" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="Latitude"
              name="latitude"
              rules={[{ required: true }]}
            >
              <Input placeholder="Please input latitude" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true }]}
        >
          <Input placeholder="Please input address" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true }]}
        >
          <Input.TextArea
            maxLength={500}
            rows={5}
            allowClear
            showCount
          />
        </Form.Item>
        <Row gutter={20}>
          <Col span={8}>
            <Form.Item
              style={{ width: '100%' }}
              label="Business license"
              name="businessLicense"
              rules={[{ required: true }]}
            >
              <UploadImage
                label="Change Business License"
                maxCount={1}
                imgCropAspect={3 / 2}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ width: '100%' }}
              label="Front Image of Identity"
              name="identityCardFrontImg"
              rules={[{ required: true }]}
            >
              <UploadImage
                label="Change Identity"
                maxCount={1}
                imgCropAspect={3 / 2}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              style={{ width: '100%' }}
              label="Back Image of Identity"
              name="identityCardBackImg"
              rules={[{ required: true }]}
            >
              <UploadImage
                label="Change Identity"
                maxCount={1}
                imgCropAspect={3 / 2}
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider>
          Front Image of Organization: aspect ratio is required to be 2:1. No more than 5 images.
        </Divider>
        <Form.Item name="orgFrontImg">
          <UploadImage maxCount={5} imgCropAspect={2 / 1} />
        </Form.Item>
        <Divider>
          Indoor Image of Organization: aspect ratio is required to be 2:1. No more than 5 images.
        </Divider>
        <Form.Item name="orgRoomImg">
          <UploadImage maxCount={5} imgCropAspect={2 / 1} />
        </Form.Item>
        <Divider>
          Other Image of Organization: aspect ratio is required to be 2:1. No more than 5 images.
        </Divider>
        <Form.Item name="orgOtherImg">
          <UploadImage maxCount={5} imgCropAspect={2 / 1} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditOrg;
