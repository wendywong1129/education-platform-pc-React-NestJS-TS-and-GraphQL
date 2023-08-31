// import Login from '@/containers/Login';
// import Home from '@/containers/Home';
// import Page404 from '@/containers/Page404';
import {
  GiftOutlined, HomeOutlined, IdcardOutlined, PicRightOutlined, ShopOutlined, TeamOutlined,
} from '@ant-design/icons';

interface IRoute {
  path: string;
  name: string;
  // element: () => JSX.Element;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
}

export const ROUTE_KEY = {
  HOME: 'home',
  MY: 'my',
  ORG: 'org',
  NO_ORG: 'noOrg',
  STUDENT: 'student',
  COURSE: 'course',
  PRODUCT: 'product',
  TEACHER: 'teacher',
  PAGE_404: 'p404',
};

// export const ROUTE_CONFIG = [
//   {
//     key: 'home',
//     path: '/home',
//     element: Home,
//     // title: 'Home',
//     name: 'Home',
//     icon: <HomeOutlined />,
//   },
//   // {
//   //   key: 'login',
//   //   path: '/login',
//   //   element: Login,
//   //   // title: 'Login',
//   //   name: 'Login',
//   //   hideInMenu: true,
//   // },
//   {
//     key: '*',
//     path: '*',
//     element: Page404,
//     // title: 'Login',
//     name: '404',
//     hideInMenu: true,
//   },
// ];

export const ROUTE_CONFIG: Record<string, IRoute> = {
  [ROUTE_KEY.HOME]: {
    path: '/',
    name: 'Home',
    // element: Home,
    icon: <HomeOutlined />,
    hideInMenu: true,
  },
  [ROUTE_KEY.MY]: {
    path: 'my',
    name: 'My Profile',
    // element: Home,
    icon: <HomeOutlined />,
    hideInMenu: true,
  },
  [ROUTE_KEY.ORG]: {
    path: 'org',
    name: 'Organization Management',
    icon: <ShopOutlined />,
    hideInMenu: true,
  },
  [ROUTE_KEY.NO_ORG]: {
    path: 'noOrg',
    name: 'Organization Selection Reminder',
    hideInMenu: true,
  },
  [ROUTE_KEY.STUDENT]: {
    path: 'student',
    name: 'Student Management',
    icon: <TeamOutlined />,
  },
  [ROUTE_KEY.COURSE]: {
    path: 'course',
    name: 'Course Management',
    icon: <PicRightOutlined />,
  },
  [ROUTE_KEY.PRODUCT]: {
    path: 'product',
    name: 'Product Management',
    icon: <GiftOutlined />,
  },
  [ROUTE_KEY.TEACHER]: {
    path: 'teacher',
    name: 'Teacher Management',
    icon: <IdcardOutlined />,
  },
  [ROUTE_KEY.PAGE_404]:
  {
    path: '*',
    name: '404',
    // element: Page404,
    hideInMenu: true,
  },
};

// export const routes = Object.values(ROUTE_CONFIG);
// [{path: 'my', name: 'My Profile', icon: {…}, hideInMenu: true, key: 'my'}]
export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({ ...ROUTE_CONFIG[key], key }));

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];
