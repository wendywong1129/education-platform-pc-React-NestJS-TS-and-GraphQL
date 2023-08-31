import {
  useLazyQuery,
  // useLazyQuery,
  useMutation, useQuery,
} from '@apollo/client';
import { message } from 'antd';
import { COMMIT_COURSE, GET_COURSE, GET_COURSES } from '@/graphql/course';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import { TBaseCourse, TCourseQuery, TCoursesQuery } from '@/utils/types';

export const useCourses = (
  pageNum = 1,
  pageSize = DEFAULT_PAGE_SIZE,
) => {
  const { loading, data, refetch } = useQuery<TCoursesQuery>(GET_COURSES, {
    skip: true,
    variables: {
      page: {
        pageNum,
        pageSize,
      },
    },
  });
  // return {
  //   loading,
  //   refetch,
  //   page: data?.getCourses.page,
  //   data: data?.getCourses.data,
  // };

  // const refetchHandler = async (pn = 1, ps = DEFAULT_PAGE_SIZE, name = '') => {
  //   const { data: res, errors } = await refetch({
  //     name,
  //     page: {
  //       pageNum: pn,
  //       pageSize: ps,
  //     },
  //   });
  //   if (errors) {
  //     return {
  //       success: false,
  //     };
  //   }
  //   return {
  //     page: res?.getCourses.page,
  //     data: res?.getCourses.data,
  //   };
  // };
  const refetchHandler = async (params: {
    name?: string;
    pageSize?: number;
    current?: number;
  }) => {
    const { data: res, errors } = await refetch({
      name: params.name,
      page: {
        pageNum: params.current || 1,
        pageSize: params.pageSize || DEFAULT_PAGE_SIZE,
      },
    });

    if (errors) {
      return {
        success: false,
      };
    }
    return {
      total: res?.getCourses.page.total,
      data: res?.getCourses.data,
      success: true,
    };
  };

  return {
    loading,
    refetch: refetchHandler,
    page: data?.getCourses.page,
    data: data?.getCourses.data,
  };
};

export const useCoursesForSample = () => {
  const [get, { data, loading }] = useLazyQuery<TCoursesQuery>(GET_COURSES);

  const searchHandler = (name: string) => {
    get({
      variables: {
        name,
        page: {
          pageNum: 1,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      },
    });
  };

  return {
    loading,
    data: data?.getCourses.data,
    search: searchHandler,
  };
};

export const useEditCourseInfo = (): [handleEdit: Function, loading: boolean] => {
  const [edit, { loading }] = useMutation(COMMIT_COURSE);

  const handleEdit = async (
    id: number,
    params: TBaseCourse,
    // callback: ()=>void,
    callback: (isReload: boolean) => void,
  ) => {
    const res = await edit({
      variables: {
        id,
        params,
      },
    });
    if (res.data.commitCourseInfo.code === 200) {
      message.success(res.data.commitCourseInfo.message);
      // callback();
      callback(true);
      return;
    }
    message.error(res.data.commitCourseInfo.message);
  };

  return [handleEdit, loading];
};

/**
 * method 1
 */
// export const useCourse = () => {
//   // const { data } = useQuery(GET_COURSE);
//   const { data, refetch } = useQuery(GET_COURSE, {
//     skip: true,
//   });
//   console.log('data:', data);

//   return { data, refetch };
// };
/**
 * method 2
 */
export const useCourse = () => {
  // const [getCourse, { data, loading }] = useLazyQuery(GET_COURSE);
  // console.log('data:', data);

  // return { getCourse, data, loading };

  const [get, { loading }] = useLazyQuery(GET_COURSE);

  const getCourse = async (id: string) => {
    const res = await get({
      variables: {
        id,
      },
    });

    return res.data.getCourseInfo.data;
  };

  return { getCourse, loading };
};

export const useCourseInfo = (id: string) => {
  const { data, loading, refetch } = useQuery<TCourseQuery>(GET_COURSE, {
    variables: {
      id,
    },
  });

  return { data: data?.getCourseInfo.data, loading, refetch };
};
