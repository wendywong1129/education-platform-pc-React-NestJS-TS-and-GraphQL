import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { ConfigProvider } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import enUS from 'antd/es/locale/en_US';
import { client } from './utils/apollo';
// import { ROUTE_CONFIG } from './routes';
// import { routes } from './routes';
import { routes } from './routes/menus';
// import Page404 from './containers/Page404';
import UserInfo from './components/UserInfo';
import Layout from './components/Layout';
import Login from './containers/Login';
import './index.css';
import { ROUTE_COMPONENT } from './routes';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <ConfigProvider locale={enUS}>
      <BrowserRouter>
        <UserInfo>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              {/* {ROUTE_CONFIG.map((item) => (
                <Route key={item.key} path={item.path} element={<item.element />} />
              ))} */}
              {routes.map((item) => {
                const Component = ROUTE_COMPONENT[item.key];
                return (
                  <Route
                    key={item.path}
                    path={item.path}
                    // element={<item.element />}
                    element={<Component />}
                  />
                );
              })}
            </Route>
            {/* <Route path="*" element={<Page404 />} /> */}
          </Routes>
        </UserInfo>
      </BrowserRouter>
    </ConfigProvider>
  </ApolloProvider>,
);
