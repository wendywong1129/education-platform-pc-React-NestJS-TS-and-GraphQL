import {
  Button, Calendar, Card, Col, DatePicker, Row, message,
} from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useUserContext } from '@/hooks/userHooks';
// import { useGoTo } from '@/hooks';
// import { ROUTE_KEY } from '@/routes/menus';
import { useOrganization } from '@/services/org';
import { useAutoCreateSchedule } from '@/services/dashboard';
import { DAY_FORMAT } from '@/utils/constants';
import Schedule from './components/Schedule';

const { RangePicker } = DatePicker;

const Home = () => {
  const [range, setRange] = useState<[string, string]>(['', '']);
  const [day, setDay] = useState<string>(dayjs().format(DAY_FORMAT));

  const { store } = useUserContext();
  // console.log('store:', store);

  // const { go } = useGoTo();

  const { data: org } = useOrganization(store.currentOrg || '');

  const [run, loading] = useAutoCreateSchedule();

  if (!org) {
    return null;
  }

  const startScheduleHandler = () => {
    if (!range[0]) {
      message.error('Please select a date range');
    }
    run(...range);
  };

  const onRangeChangeHandler = (days: [Dayjs | null, Dayjs | null] | null) => {
    // console.log('days', days);
    if (!days || !days[0] || !days[1]) {
      return;
    }
    setRange([days[0].format(DAY_FORMAT), days[1].format(DAY_FORMAT)]);
    // console.log('days[0]', days[0].format(DAY_FORMAT));
    // console.log('days[1]', days[1].format(DAY_FORMAT));
  };

  return (
    <div>
      {/* {store.tel} */}
      {/* <Button onClick={() => go(ROUTE_KEY.MY)}>
        Go to My Profile
        {store.currentOrg}
      </Button> */}
      <PageContainer
        content={org.address}
        header={{
          title: org.name,
        }}
      >
        <Row gutter={20}>
          <Col flex="auto">
            <Card
              title={`${day} Course Schedule`}
              extra={
            (
              <span>
                <RangePicker onChange={(days) => onRangeChangeHandler(days)} />
                <Button
                  loading={loading}
                  type="link"
                  onClick={startScheduleHandler}
                >
                  Start Scheduling
                </Button>
              </span>
            )
          }
            >
              <Schedule day={day} />
            </Card>
          </Col>
          <Col flex="400px">
            <Calendar
              fullscreen={false}
              onChange={(d) => setDay(d.format(DAY_FORMAT))}
            />
          </Col>
        </Row>
      </PageContainer>
    </div>
  );
};

// export default Home;
export default Home;
