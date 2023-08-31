import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import { Link, useNavigate, useOutlet } from 'react-router-dom';
import { Space, Tooltip } from 'antd';
import { LogoutOutlined, ShopOutlined } from '@ant-design/icons';
import { useUserContext } from '@/hooks/userHooks';
// import { ROUTE_CONFIG } from '@/routes';
import { AUTH_TOKEN } from '@/utils/constants';
import { ROUTE_KEY, routes } from '@/routes/menus';
import { useGoTo, useIsOrgRoute } from '@/hooks';
import OrgSelect from '../OrgSelect';

const menuItemRender = (
  item: MenuDataItem,
  dom: React.ReactNode,
) => <Link to={item.path || '/'}>{dom}</Link>;

const Layout = () => {
  const outlet = useOutlet();
  const { store } = useUserContext();

  const nav = useNavigate();

  const { go } = useGoTo();

  const isOrg = useIsOrgRoute();

  const logoutHandler = () => {
    sessionStorage.setItem(AUTH_TOKEN, '');
    localStorage.setItem(AUTH_TOKEN, '');
    nav('/login');
  };

  const goToOrg = () => {
    go(ROUTE_KEY.ORG);
  };

  return (
    <ProLayout
      layout="mix"
      siderWidth={260}
      avatarProps={{
        src: store.avatar || null,
        title: store.name,
        size: 'small',
        onClick: () => go(ROUTE_KEY.MY),
      }}
      title="IT RUN"
      logo={<img src="https://it-run-assets.oss-ap-southeast-2.aliyuncs.com/images/1692619791482.png" alt="logo" />}
      route={{
        path: '/',
        routes,
      }}
      actionsRender={() => [
        // <OrgSelect />,
        // <Tooltip title="Organization Management">
        //   <ShopOutlined onClick={goToOrg} />
        // </Tooltip>,
        !isOrg && <OrgSelect />,
        <Tooltip title="Organization Management">
          <ShopOutlined onClick={goToOrg} />
        </Tooltip>,
      ]}
      menuItemRender={menuItemRender}
      onMenuHeaderClick={() => nav('/')}
      links={[
        <Space size={20} onClick={logoutHandler}>
          <LogoutOutlined />
          Logout
        </Space>,
      ]}
    >
      <div key={store.currentOrg}>
        {outlet}
      </div>
    </ProLayout>
  );
};

export default Layout;
