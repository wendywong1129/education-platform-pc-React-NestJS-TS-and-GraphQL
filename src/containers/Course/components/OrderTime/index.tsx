import {
  // useEffect,
  // useMemo,
  useState,
} from 'react';
import {
  Button, Col, Drawer, Row, Space, Tabs,
} from 'antd';
import { EditableProTable } from '@ant-design/pro-components';
import { ChromeOutlined, RedoOutlined } from '@ant-design/icons';
import _ from 'lodash';
// import {
//   // useCourse,
//   useCourseInfo,
//   useEditCourseInfo,
// } from '@/services/course';
import {
  IOrderTime,
  // IWeekCourse,
  // IWeekCourse
} from '@/utils/types';
import {
  DAYS, IDay, getColumns, getMaxKey, isWorkDay,
} from './constants';
import { useOrderTime } from './hooks';
import style from './index.module.less';

interface IProps {
  id: string;
  onClose: (isReload?: boolean) => void;
  // open:boolean
}

const OrderTime = ({
  id,
  onClose,
  // open
}:IProps) => {
  // console.log('orderTime');
  const [currentDay, setCurrentDay] = useState<IDay>(DAYS[0]);
  // const [reducibleTime, setReducibleTime] = useState<IWeekCourse[]>([]);
  // const [edit, editLoading] = useEditCourseInfo();

  // // const { getCourse, loading } = useCourse();
  // const { data, loading, refetch } = useCourseInfo(id);

  // // console.log('currentDay:', currentDay, 'reducibleTime:', reducibleTime);

  // // const orderTime = useMemo(
  // //   () => reducibleTime.find((item) => item.week
  // //  === currentDay.key)?.orderTime as IOrderTime[],
  // //   [reducibleTime],
  // // );
  // const orderTime = useMemo(
  //   () => (data?.reducibleTime || []).find((item) => item.week
  //   // === currentDay.key)?.orderTime as IOrderTime[],
  //   === currentDay.key)?.orderTime || [],
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [data, currentDay],
  // );

  // // const init = async () => {
  // //   if (id) {
  // //     const res = await getCourse(id);
  // //     setReducibleTime(res.reducibleTime);
  // //   }
  // // };
  // // useEffect(() => {
  // //   init();
  // // // eslint-disable-next-line react-hooks/exhaustive-deps
  // // }, [id]);

  // const onTabChangeHandler = (key: string) => {
  //   const current = DAYS.find((item) => item.key === key) as IDay;
  //   setCurrentDay(current);
  // };

  // const onSaveHandler = (ot: IOrderTime[]) => {
  //   const rt = [...(data?.reducibleTime || [])];
  //   const index = rt.findIndex((item) => item.week === currentDay.key);
  //   if (index > -1) {
  //     rt[index] = {
  //       week: currentDay.key,
  //       orderTime: ot,
  //     };
  //   } else {
  //     rt.push({
  //       week: currentDay.key,
  //       orderTime: ot,
  //     });
  //   }
  //   edit(id, {
  //     reducibleTime: rt,
  //   // }, () => init());
  //   }, () => refetch());
  // };

  // const onDeleteHandler = (key: number) => {
  //   const newData = orderTime.filter((item) => item.key !== key);
  //   onSaveHandler(newData);
  // };

  // const allWorkDaySyncHandler = () => {
  //   const rt: IWeekCourse[] = [];
  //   DAYS.forEach((item) => {
  //     if (isWorkDay(item.key)) {
  //       rt.push({
  //         week: item.key,
  //         orderTime,
  //       });
  //     }
  //   });
  //   edit(id, {
  //     reducibleTime: rt,
  //   }, () => refetch());
  // };

  // const allWeekSyncHandler = () => {
  //   const rt: IWeekCourse[] = [];
  //   DAYS.forEach((item) => {
  //     rt.push({
  //       week: item.key,
  //       orderTime,
  //     });
  //   });
  //   edit(id, {
  //     reducibleTime: rt,
  //   }, () => refetch());
  // };

  const onTabChangeHandler = (key: string) => {
    const current = DAYS.find((item) => item.key === key) as IDay;
    setCurrentDay(current);
  };

  const {
    orderTime,
    loading,
    onDeleteHandler,
    onSaveHandler,
    allWeekSyncHandler,
    allWorkDaySyncHandler,
  } = useOrderTime(id, currentDay.key);

  return (
    <Drawer
      title="Edit Available Time"
      width={720}
      // open={open}
      open
      onClose={() => onClose()}
      // forceRender
    >
      <Tabs
        type="card"
        items={DAYS}
        onChange={onTabChangeHandler}
      />
      <EditableProTable<IOrderTime>
        rowKey="key"
        columns={getColumns(onDeleteHandler)}
        recordCreatorProps={{
          // record: (index:number) => ({
          //   key: index + 1,
          record: () => ({
            key: getMaxKey(orderTime) + 1,
            startTime: '12:00:00',
            endTime: '12:30:00',
          }),
        }}
        // loading={loading || editLoading}
        loading={loading}
        value={orderTime}
        headerTitle={(
          <Space>
            Set available time on
            <span className={style.name}>
              {currentDay.label}
            </span>
          </Space>
        )}
        editable={{
          onSave: async (rowKey, d) => {
            let newData = [];
            if (orderTime.findIndex((item) => item.key === rowKey) > -1) {
              newData = orderTime?.map((item) => (item.key === rowKey ? d : { ...item }));
              // console.log('newData', newData);
              // return;
            }
            // const newData = [...orderTime, d];
            newData = [...orderTime, _.omit(d, 'index')];
            // console.log('newData', newData);
            onSaveHandler(newData);
          },
          onDelete: async (key) => {
            onDeleteHandler(key as number);
          },
        }}
      />
      <Row gutter={20} className={style.buttons}>
        <Col span={12}>
          <Button
            icon={<RedoOutlined />}
            style={{ width: '100%' }}
            type="primary"
            disabled={!isWorkDay(currentDay.key)}
            onClick={allWorkDaySyncHandler}
          >
            All Workday Sync
          </Button>
        </Col>
        <Col span={12}>
          <Button
            icon={<ChromeOutlined />}
            style={{ width: '100%' }}
            type="primary"
            danger
            onClick={allWeekSyncHandler}
          >
            All Week Sync
          </Button>
        </Col>
      </Row>
    </Drawer>
  );
};

export default OrderTime;
