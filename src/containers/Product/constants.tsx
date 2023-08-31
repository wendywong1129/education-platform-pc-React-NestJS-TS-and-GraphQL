import { ProColumns } from '@ant-design/pro-components';
import { Image, Popconfirm, Space } from 'antd';
import { IProduct } from '@/utils/types';

interface IProps {
  onEditHandler: (id: string) => void;
  onCardHandler: (id: string) => void;
  onDeleteHandler: (id: string) => void;
  onStatusChangeHandler: (id: string, status: string) => void;
}

const PRODUCT_STATUS = {
  LIST: 'LIST',
  UN_LIST: 'UN_LIST',
};

export const getColumns: ({
  onEditHandler,
  onCardHandler,
  onDeleteHandler,
  onStatusChangeHandler,
}: IProps) => ProColumns<IProduct, 'text'>[] = ({
  onEditHandler,
  onCardHandler,
  onDeleteHandler,
  onStatusChangeHandler,
}) => [
  {
    dataIndex: 'id',
    title: '#',
    valueType: 'indexBorder',
    search: false,
    align: 'center',
    width: 50,
  },
  {
    title: 'Cover Image',
    dataIndex: 'coverUrl',
    search: false,
    align: 'center',
    width: 100,
    render: (_, record: IProduct) => <Image src={record.coverUrl} />,
  },
  {
    title: 'Product',
    dataIndex: 'name',
    width: 150,
    copyable: true,
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: 'This item is mandatory',
        },
      ],
    },
  },
  {
    title: 'Original Price',
    search: false,
    dataIndex: 'originalPrice',
    width: 80,
  },
  {
    title: 'Sale Price',
    search: false,
    dataIndex: 'preferentialPrice',
    width: 80,
  },
  {
    title: 'Stock',
    search: false,
    width: 80,
    align: 'center',
    dataIndex: 'stock',
  },
  {
    title: 'Current Stock',
    search: false,
    width: 80,
    align: 'center',
    dataIndex: 'curStock',
  },
  {
    title: 'Limit Buy Per Person',
    search: false,
    width: 80,
    align: 'center',
    dataIndex: 'limitBuyNumber',
  },
  {
    title: 'Buy Number',
    search: false,
    width: 80,
    align: 'center',
    dataIndex: 'buyNumber',
  },
  {
    title: 'Operation',
    valueType: 'option',
    dataIndex: 'id',
    align: 'center',
    width: 200,
    render: (text, entity) => (
      <Space>
        <a
          key="edit"
          onClick={() => onEditHandler(entity.id)}
        >
          Edit
        </a>
        <Popconfirm
          title="Reminder"
          description="Are you sure to delete it?"
          onConfirm={() => onDeleteHandler(entity.id)}
        >
          <a
            key="delete"
            type="link"
            style={{
              color: 'red',
            }}
          >
            Delete
          </a>
        </Popconfirm>
        <a
          key="card"
          onClick={() => onCardHandler(entity.id)}
        >
          Bundled Consumer Card
        </a>
        {entity.status === PRODUCT_STATUS.UN_LIST
          ? (
            <a
              key="list"
              style={{
                color: 'green',
              }}
              onClick={() => onStatusChangeHandler(entity.id, PRODUCT_STATUS.LIST)}
            >
              List
            </a>
          )
          : (
            <a
              key="unList"
              style={{
                color: 'darkgrey',
              }}
              onClick={() => onStatusChangeHandler(entity.id, PRODUCT_STATUS.UN_LIST)}
            >
              Unlist
            </a>
          )}
      </Space>
    ),
  },
];
