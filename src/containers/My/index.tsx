import {
  PageContainer, ProForm, ProFormInstance, ProFormText, ProFormTextArea,
} from '@ant-design/pro-components';
import {
  Col, Form, Row, message,
} from 'antd';
import { useEffect, useRef } from 'react';
import { useMutation } from '@apollo/client';
import OSSImageUpload from '@/components/OSSImageUpload';
import { useUserContext } from '@/hooks/userHooks';
import { UPDATE_USER } from '@/graphql/user';

const My = () => {
  const [updateUserInfo] = useMutation(UPDATE_USER);

  const formRef = useRef<ProFormInstance>();

  const { store } = useUserContext();

  useEffect(() => {
    if (!store.tel) return;
    formRef.current?.setFieldsValue({
      tel: store.tel,
      name: store.name,
      desc: store.desc,
      // avatar: {
      //   url: store.avatar,
      // },
      avatar: [{
        url: store.avatar,
      }],
    });
  }, [store]);

  return (
    <PageContainer>
      <ProForm
        formRef={formRef}
        layout="horizontal"
        submitter={{
          resetButtonProps: {
            style: {
              display: 'none',
            },
          },
        }}
        onFinish={async (values) => {
          // console.log('values:', values);
          const res = await updateUserInfo({
            variables: {
              id: store.id,
              params: {
                name: values.name,
                desc: values.desc,
                // avatar: values.avatar?.url || '',
                avatar: values.avatar[0]?.url || '',
              },
            },
          });
          if (res.data.updateUserInfo.code === 200) {
            // store.refetchHandler();
            store.refetchHandler?.();
            message.success(res.data.updateUserInfo.message);
            return;
          }
          message.error(res.data.updateUserInfo.message);
        }}
      >
        <Row gutter={20}>
          <Col>
            <ProFormText
              name="tel"
              label="Mobile Number"
              tooltip="No Modification"
              disabled
            />
            <ProFormText
              name="name"
              label="Nickname"
              placeholder="Please input nickname"
            />
            <ProFormTextArea
              name="desc"
              label="Description"
              placeholder="Please describe yourself"
            />
          </Col>
          <Col>
            <Form.Item name="avatar">
              <OSSImageUpload label="Change Avatar" />
            </Form.Item>
          </Col>
        </Row>
      </ProForm>
    </PageContainer>
  );
};

export default My;
