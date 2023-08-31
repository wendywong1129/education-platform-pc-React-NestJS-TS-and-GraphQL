import { Button, Result } from 'antd';
import { useEffect } from 'react';
import { useGoTo } from '@/hooks';
import { useUserContext } from '@/hooks/userHooks';

const NoOrg = () => {
  const { store } = useUserContext();

  const { go } = useGoTo();

  useEffect(() => {
    if (store.currentOrg) {
      go();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.currentOrg]);

  return (
    <Result
      status="404"
      title="Please choose an organization"
      subTitle="All management is based on the organization you've chosen"
      extra={<Button type="primary" href="/">Go to Home</Button>}
    />
  );
};

export default NoOrg;
