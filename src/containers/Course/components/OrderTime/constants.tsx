import { ProColumns } from '@ant-design/pro-components';
import { Popconfirm, Space } from 'antd';
import { IOrderTime, TWeek } from '@/utils/types';

export interface IDay {
  key: TWeek;
  label: string;
}

export const DAYS: IDay[] = [
  {
    key: 'Monday',
    label: 'Monday',
  },
  {
    key: 'Tuesday',
    label: 'Tuesday',
  },
  {
    key: 'Wednesday',
    label: 'Wednesday',
  },
  {
    key: 'Thursday',
    label: 'Thursday',
  },
  {
    key: 'Friday',
    label: 'Friday',
  },
  {
    key: 'Saturday',
    label: 'Saturday',
  },
  {
    key: 'Sunday',
    label: 'Sunday',
  },
];

export const getColumns = (onDeleteHandler: Function): ProColumns[] => [
  {
    title: 'NO.',
    dataIndex: 'key',
    width: 50,
    align: 'center',
    editable: false,
  },
  {
    title: 'Start Time',
    dataIndex: 'startTime',
    valueType: 'time',
    width: 160,
    align: 'center',
  },
  {
    title: 'End Time',
    dataIndex: 'endTime',
    valueType: 'time',
    width: 160,
    align: 'center',
  },
  {
    title: 'Operation',
    valueType: 'option',
    width: 150,
    align: 'center',
    render: (text, record, _, action) => (
      <Space>
        <a
          key="edit"
          onClick={() => {
            action?.startEditable(record.key || '');
          }}
        >
          Edit
        </a>
        <Popconfirm
          title="Reminder"
          description="Are you sure to delete it?"
          onConfirm={() => onDeleteHandler(record.key)}
        >
          <a
            key="delete"
          >
            Delete
          </a>
        </Popconfirm>
      </Space>
    ),
  },
];

// export interface IOrderTime {
//   startTime: string;
//   endTime: string;
//   key: number;
// }

// export interface IWeekCourse {
//   week: TWeek;
//   orderTime: IOrderTime[];
// }

export const isWorkDay = (day: string) => ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].includes(day);

export const getMaxKey = (orderTime: IOrderTime[] | undefined): number => {
  const keys = orderTime?.map((item) => item.key) || [];

  if (keys.length === 0) {
    return 0;
  }
  return Math.max(...keys);
};
