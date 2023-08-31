import { ProColumns } from '@ant-design/pro-components';
import { Popconfirm, Space } from 'antd';
import { CARD_TYPE } from '@/utils/constants';

export const getColumns = (onDeleteHandler: Function): ProColumns[] => [
  {
    title: 'NO.',
    dataIndex: 'key',
    width: 50,
    editable: false,
    align: 'center',
    render: (d, r, index) => index + 1,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: 'ValidityDay',
    dataIndex: 'validityDay',
    valueType: 'digit',
    width: 120,
    align: 'center',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    valueType: 'select',
    width: 120,
    align: 'center',
    request: async () => [
      {
        value: CARD_TYPE.TIME,
        label: 'Times Card',
      },
      {
        value: CARD_TYPE.DURATION,
        label: 'Duration Card',
      },
    ],
  },
  {
    title: 'Times',
    dataIndex: 'time',
    valueType: 'digit',
    width: 120,
    align: 'center',
  },
  {
    title: 'Operation',
    valueType: 'option',
    width: 200,
    align: 'center',
    render: (text, record, _, action) => (
      <Space>
        <a
          key="edit"
          onClick={() => {
            action?.startEditable(record.id || '');
          }}
        >
          Edit
        </a>
        <Popconfirm
          title="Reminder"
          description="Are you sure to delete it"
          onConfirm={() => onDeleteHandler(record.id)}
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
