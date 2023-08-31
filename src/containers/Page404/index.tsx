import { Button, Result } from 'antd';

const Page404 = () => (
  <Result
    status="404"
    title="404"
    subTitle="Page Not Found"
    extra={<Button type="primary" href="/">Back to Home</Button>}
  />
);

export default Page404;
