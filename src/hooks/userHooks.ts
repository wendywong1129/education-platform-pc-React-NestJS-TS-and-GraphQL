import { useQuery } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';
import { GET_USER } from '@/graphql/user';
import { IUser } from '@/utils/types';
import { useAppContext, connectFactory } from '../utils/contextFactory';

const KEY = 'userInfo';
const DEFAULT_VALUE = {

};

// export const useUserContext = () => useAppContext(KEY);
export const useUserContext = () => useAppContext<IUser>(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);

export const useGetUser = () => {
  const {
    // store,
    setStore,
  } = useUserContext();

  const nav = useNavigate();
  const location = useLocation();

  const { loading, refetch } = useQuery<{ getUserInfo:IUser }>(GET_USER, {
    onCompleted: (data) => {
      // console.log('data:', data);
      if (data.getUserInfo) {
        const {
          id, name, tel, desc, avatar,
        } = data.getUserInfo;
        setStore({
          id, name, tel, desc, avatar, refetchHandler: refetch,
        });
        if (location.pathname === '/login') {
          nav('/');
        }
        return;
      }
      setStore({ refetchHandler: refetch });
      if (location.pathname !== '/login') {
        nav(`/login?orgUrl=${location.pathname}`);
      }
    },
    onError: () => {
      setStore({ refetchHandler: refetch });
      if (location.pathname !== '/login') {
        nav(`/login?orgUrl=${location.pathname}`);
      }
    },
  });
  // console.log('store:', store);

  return { loading, refetch };
};
