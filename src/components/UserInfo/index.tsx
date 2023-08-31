import { Spin } from 'antd';
import { connect, useGetUser } from '@/hooks/userHooks';
import { IPropChild } from '@/utils/types';

/**
* Get user info component
*/
const UserInfo = ({ children }: IPropChild) => {
  const { loading } = useGetUser();

  return (
    <Spin spinning={loading}>
      <div style={{ height: '100vh' }}>
        {children}
      </div>
    </Spin>

  );
};

export default connect(UserInfo);
