import { ProColumns } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import { ICourse } from '@/utils/types';

// export const COLUMNS: ProColumns<ICourse, 'text'>[] = [
//   {
//     title: 'course name',
//     dataIndex: 'name',
//     ellipsis: true,
//   },
//   {
//     title: 'limit number',
//     dataIndex: 'limitNumber',
//     width: 75,
//     search: false,
//   },
//   {
//     title: 'duration',
//     dataIndex: 'duration',
//     width: 75,
//     search: false,
//   },
//   {
//     title: 'option',
//     valueType: 'option',
//     dataIndex: 'id',
//     align: 'center',
//     width: 300,
//     render: (text) => (
//       <Space>
//         <Button
//           key="edit"
//           type="link"
//           // onClick={() => onEditHandler(entity.id)}
//         >
//           Edit
//           {text}
//         </Button>
//       </Space>
//     ),
//   },
// ];

interface IProps {
  onEditHandler: (id: string) => void
  onOrderTimeHandler: (id: string) => void
  onCardHandler: (id: string) => void
}

export const getColumns: ({
  onEditHandler,
  onOrderTimeHandler,
  onCardHandler,
}: IProps) => ProColumns<ICourse, 'text'>[] = ({
  onEditHandler,
  onOrderTimeHandler,
  onCardHandler,
}) => [
  {
    title: 'Course',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: 'Limit Number',
    dataIndex: 'limitNumber',
    width: 200,
    search: false,
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
    width: 200,
    search: false,
  },
  {
    title: 'Operation',
    valueType: 'option',
    dataIndex: 'id',
    align: 'center',
    width: 430,
    render: (text, entity) => (
      <Space>
        <Button
          key="edit"
          type="link"
          onClick={() => onEditHandler(entity.id)}
        >
          Edit
        </Button>
        <Button
          key="orderTime"
          type="link"
          onClick={() => onOrderTimeHandler(entity.id)}
        >
          Available Time
        </Button>
        <Button
          key="card"
          type="link"
          onClick={() => onCardHandler(entity.id)}
        >
          Consumer Card
        </Button>
      </Space>
    ),
  },
];
