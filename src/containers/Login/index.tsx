import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  LockOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import {
  message, Tabs,
} from 'antd';
import { useMutation } from '@apollo/client';
import { AUTH_TOKEN } from '@/utils/constants';
import { LOGIN, SEND_CODE_MSG } from '@/graphql/auth';
import { useTitle } from '@/hooks';
import { useUserContext } from '@/hooks/userHooks';
import styles from './index.module.less';

interface IValue {
  tel: string;
  code: string;
  autoLogin: boolean;
}

export default () => {
  const [run] = useMutation(SEND_CODE_MSG);
  const [login] = useMutation(LOGIN);

  const nav = useNavigate();
  const [params] = useSearchParams();

  useTitle('Login');

  const { store } = useUserContext();

  const loginHandler = async (values:IValue) => {
    const res = await login(
      {
        variables: values,
      },
    );
    if (res.data.login.code === 200) {
      store.refetchHandler?.();
      if (values.autoLogin) {
        sessionStorage.setItem(AUTH_TOKEN, '');
        localStorage.setItem(AUTH_TOKEN, res.data.login.data);
      } else {
        localStorage.setItem(AUTH_TOKEN, '');
        sessionStorage.setItem(AUTH_TOKEN, res.data.login.data);
      }
      message.success(res.data.login.message);
      // nav('/');
      nav(params.get('orgUrl') || '/');
      return;
    }
    message.error(res.data.login.message);
  };

  return (
    <div className={styles.container}>
      <LoginFormPage
        initialValues={{ tel: '610401234567' }}
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        logo="https://it-run-assets.oss-ap-southeast-2.aliyuncs.com/images/1692619791482.png"
        title="IT RUN"
        onFinish={loginHandler}
      >
        {/* <Tabs centered>
          <Tabs.TabPane key="phone" tab="phone" />
        </Tabs> */}
        <Tabs
          centered
          items={[{ key: 'phone', label: 'phone' }]}
        />
        <>
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <MobileOutlined className="prefixIcon" />,
            }}
            name="tel"
            placeholder="mobile"
            rules={[
              {
                required: true,
                message: 'Please input mobile number!',
              },
              {
                pattern: /^610\d{9}$/,
                message: 'Wrong format! [Correct format: 610xxxxxxxxxx]',
              },
            ]}
          />
          <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className="prefixIcon" />,
            }}
            captchaProps={{
              size: 'large',
            }}
            placeholder="code"
            captchaTextRender={(timing, count) => {
              if (timing) {
                return `${count} ${'Get code'}`;
              }
              return 'Get code';
            }}
            phoneName="tel"
            name="code"
            rules={[
              {
                required: true,
                message: 'Please input code!',
              },
            ]}
            onGetCaptcha={async (tel:string) => {
              // console.log('tel', tel);
              const res = await run(
                {
                  variables: {
                    tel,
                  },
                },
              );
              if (res.data.sendCodeMsg.code === 200) {
                message.success(res.data.sendCodeMsg.message);
              } else {
                message.error(res.data.sendCodeMsg.message);
              }
            }}
          />
        </>

        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            Auto Login
          </ProFormCheckbox>
        </div>
      </LoginFormPage>
    </div>
  );
};
