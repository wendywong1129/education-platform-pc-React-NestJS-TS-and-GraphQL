import { EditableProTable } from '@ant-design/pro-components';
import { Drawer } from 'antd';
import { ICard } from '@/utils/types';
import { useCards, useDeleteCard, useEditCardInfo } from '@/services/card';
import { getColumns } from './constants';

interface IProps {
  id: string;
  onClose: (isReload?: boolean) => void;
}

const ConsumeCard = ({
  id,
  onClose,
}:IProps) => {
  const { data, loading, refetch } = useCards(id);

  const [edit, editLoading] = useEditCardInfo();

  const [del, delLoading] = useDeleteCard();

  const onSaveHandler = (d: ICard) => {
    // console.log('d:', d); // {id: '', name: '', type: 'time', time: 0, validityDay: 0}
    edit(d.id, id, {
      name: d.name,
      type: d.type,
      time: d.time,
      validityDay: d.validityDay,
    }, refetch);
  };

  const onDeleteHandler = (key: string) => {
    del(key, refetch);
  };

  // console.log('id', id);

  return (
    <Drawer
      title="Manage Consumer Card"
      width="90vw"
      open
      onClose={() => onClose()}
    >
      <EditableProTable<ICard>
        headerTitle="Consumer card of the course"
        rowKey="id"
        loading={loading || editLoading || delLoading}
        value={data}
        columns={getColumns(onDeleteHandler)}
        recordCreatorProps={{
          record: () => ({
            id: 'new',
            name: '',
            type: 'time',
            time: 0,
            validityDay: 0,
          }),
        }}
        editable={{
          onSave: async (rowKey, d) => {
            onSaveHandler(d);
          },
          onDelete: async (key) => {
            onDeleteHandler(key as string);
          },
        }}
      />
    </Drawer>
  );
};

export default ConsumeCard;
