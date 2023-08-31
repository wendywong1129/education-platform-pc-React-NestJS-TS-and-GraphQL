import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useRef, useState } from 'react';
import { ICourse } from '@/utils/types';
import { useCourses } from '@/services/course';
import { DEFAULT_PAGE_SIZE } from '@/utils/constants';
import {
  // COLUMNS,
  getColumns,
} from './constants';
import EditCourse from './components/EditCourse';
import OrderTime from './components/OrderTime';
import ConsumeCard from './components/ConsumeCard';

const Course = () => {
  const { data, refetch } = useCourses();

  const [showInfo, setShowInfo] = useState(false);
  const [curId, setCurId] = useState('');
  const [showOrderTime, setShowOrderTime] = useState(false);
  const [showCard, setShowCard] = useState(false);

  const actionRef = useRef<ActionType>();

  // const onClickAddHandler = () => {
  //   setShowInfo(true);
  // };
  const onClickAddHandler = (id?: string) => {
    if (id) {
      setCurId(id);
    } else {
      setCurId('');
    }
    setShowInfo(true);
  };

  const closeAndRefetchHandler = (isReload?: boolean) => {
    setShowInfo(false);
    // refetch({});
    // actionRef.current?.reload();
    if (isReload) {
      actionRef.current?.reload();
    }
  };

  const onOrderTimeHandler = (id: string) => {
    setCurId(id);
    setShowOrderTime(true);
  };

  const onCardHandler = (id: string) => {
    setCurId(id);
    setShowCard(true);
  };

  return (
    <PageContainer header={{ title: 'Courses of the current organization' }}>
      <ProTable<ICourse>
        rowKey="id"
        // columns={COLUMNS}
        columns={getColumns({
          onEditHandler: onClickAddHandler,
          onOrderTimeHandler,
          onCardHandler,
        })}
        dataSource={data}
        // request={async (
        //   params: {
        //     name?: string;
        //     pageSize?: number;
        //     current?: number;
        //   },
        // ) => {
        //   const msg = await refetch(
        //     params.current,
        //     params.pageSize,
        //     params.name,
        //   );
        //   return {
        //     data: msg.data,
        //     success: msg.success,
        //     total: msg.page?.total,
        //   };
        // }}
        request={refetch}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
        }}
        toolBarRender={() => [
          <Button key="add" type="primary" icon={<PlusOutlined />} onClick={() => onClickAddHandler()}>
            Create
          </Button>,
        ]}
        actionRef={actionRef}
      />
      {/* <EditCourse id={curId} open={showInfo} onClose={() => closeAndRefetchHandler} />
      <OrderTime id={curId} open={showOrderTime} onClose={() => setShowOrderTime(false)} /> */}
      {showInfo && <EditCourse id={curId} onClose={closeAndRefetchHandler} />}
      {showOrderTime && <OrderTime id={curId} onClose={() => setShowOrderTime(false)} />}
      {showCard && <ConsumeCard id={curId} onClose={() => setShowCard(false)} />}
    </PageContainer>
  );
};

export default Course;
