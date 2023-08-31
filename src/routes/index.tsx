// import { HomeOutlined } from '@ant-design/icons';
// import Home from '@/containers/Home';
// // import Login from '@/containers/Login';
// import Page404 from '@/containers/Page404';

import Home from '@/containers/Home';
import My from '@/containers/My';
import Page404 from '@/containers/Page404';
import Org from '@/containers/Org';
import NoOrg from '@/containers/NoOrg';
import Student from '@/containers/Student';
import Course from '@/containers/Course';
import Product from '@/containers/Product';
import Teacher from '@/containers/Teacher';
import { ROUTE_KEY } from './menus';

// interface IRoute {
//   path: string;
//   name: string;
//   element: () => JSX.Element;
//   icon?: React.ReactNode;
//   hideInMenu?: boolean;
// }

// export const ROUTE_KEY = {
//   HOME: 'home',
//   MY: 'my',
//   PAGE_404: '404',
// };

// // export const ROUTE_CONFIG = [
// //   {
// //     key: 'home',
// //     path: '/home',
// //     element: Home,
// //     // title: 'Home',
// //     name: 'Home',
// //     icon: <HomeOutlined />,
// //   },
// //   // {
// //   //   key: 'login',
// //   //   path: '/login',
// //   //   element: Login,
// //   //   // title: 'Login',
// //   //   name: 'Login',
// //   //   hideInMenu: true,
// //   // },
// //   {
// //     key: '*',
// //     path: '*',
// //     element: Page404,
// //     // title: 'Login',
// //     name: '404',
// //     hideInMenu: true,
// //   },
// // ];

// export const ROUTE_CONFIG: Record<string, IRoute> = {
//   [ROUTE_KEY.HOME]: {
//     path: 'home',
//     name: 'home',
//     element: Home,
//     icon: <HomeOutlined />,
//     hideInMenu: true,
//   },
//   [ROUTE_KEY.MY]: {
//     path: 'my',
//     name: 'My Profile',
//     element: Home,
//     icon: <HomeOutlined />,
//     hideInMenu: true,
//   },
//   [ROUTE_KEY.PAGE_404]:
//   {
//     path: '*',
//     name: '404',
//     element: Page404,
//     hideInMenu: true,
//   },
// };

// export const routes = Object.values(ROUTE_CONFIG);

// export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];

export const ROUTE_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.MY]: My,
  [ROUTE_KEY.ORG]: Org,
  [ROUTE_KEY.NO_ORG]: NoOrg,
  [ROUTE_KEY.STUDENT]: Student,
  [ROUTE_KEY.COURSE]: Course,
  [ROUTE_KEY.PRODUCT]: Product,
  [ROUTE_KEY.TEACHER]: Teacher,
  [ROUTE_KEY.PAGE_404]: Page404,
};
