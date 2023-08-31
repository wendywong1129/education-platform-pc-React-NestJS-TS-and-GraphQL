import {
  Avatar, Descriptions, Result, Space, Spin, Steps, Tooltip,
} from 'antd';
import { useSchedules } from '@/services/dashboard';
import { SCHEDULE_STATUS } from '@/utils/constants';

interface IProps {
  day: string
}

const Schedule = ({
  day,
}: IProps) => {
  const { data, loading } = useSchedules(day);

  if (data?.length === 0) {
    return (
      <Result
        status="warning"
        title="No schedule. Please start scheduling!"
      />
    );
  }

  return (
    <Spin spinning={loading}>
      <Steps
        direction="vertical"
        items={
          data?.map((item) => ({
            title: `${item.startTime}-${item.endTime} ${item.course.name}`,
            description: (
              <Descriptions bordered size="small">
                <Descriptions.Item
                  span={3}
                  label="Lecturer"
                  labelStyle={{
                    width: 80,
                  }}
                >
                  <Space>
                    {
                    item.course.teachers.map((teacher) => (
                      <Space key={teacher.id}>
                        <Avatar
                          shape="square"
                          size="small"
                          src={teacher.photoUrl}
                        />
                        {teacher.name}
                      </Space>
                    ))
                  }
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item
                  span={3}
                  // label="Student"
                  label={`Student(${item.scheduleRecords.length})`}
                  labelStyle={{
                    width: 80,
                  }}
                >
                  {/* No subscription from students */}
                  {item.scheduleRecords.length === 0 && 'No reservation from students'}
                  <Avatar.Group
                    maxCount={10}
                    maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                  >
                    {
                    item.scheduleRecords.map((sr) => (
                      <Tooltip
                        key={sr.id}
                        title={sr.student.name
                        + (sr.status === SCHEDULE_STATUS.CANCEL ? ': Canceled' : '')}
                      >
                        <Avatar
                          key={sr.student.id}
                          src={sr.student.avatar}
                        />
                      </Tooltip>
                    ))
                  }
                  </Avatar.Group>
                </Descriptions.Item>
              </Descriptions>
            ),
          }))
        }
      />
    </Spin>
  );
};

export default Schedule;
