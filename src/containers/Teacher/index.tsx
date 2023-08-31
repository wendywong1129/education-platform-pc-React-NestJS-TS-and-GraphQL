import { ProCard, PageContainer } from '@ant-design/pro-components';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import {
  Card, Tag, Button, Input, Pagination, Result, Popconfirm,
} from 'antd';
import { useState } from 'react';
import { useDeleteTeacher, useTeachers } from '@/services/teacher';
import CreateTeacher from './components/CreateTeacher';
import style from './index.module.less';

const Teacher = () => {
  const { data, page, refetch } = useTeachers();
  const [delHandler, delLoading] = useDeleteTeacher();
  const [show, setShow] = useState(false);
  const [curId, setCurId] = useState<string>('');

  const editInfoHandler = (id?: string) => {
    if (id) {
      setCurId(id);
    } else {
      setCurId('');
    }
    setShow(true);
  };

  const onPageChangeHandler = (pageNum: number, pageSize: number) => {
    refetch({
      page: {
        pageNum,
        pageSize,
      },
    });
  };

  const onSearchHandler = (name: string) => {
    refetch({
      name,
    });
  };

  const closeAndRefetchHandler = (isReload?: boolean) => {
    setShow(false);
    if (isReload) {
      refetch();
    }
  };

  const onDeleteHandler = (id: string) => {
    delHandler(id, refetch);
  };
  return (
    <div className={style.container}>
      <PageContainer
        header={{
          title: 'Teacher Management',
        }}
      >
        <Card>
          <Input.Search
            placeholder="Please input teacher name"
            className={style.teacherSearch}
            onSearch={onSearchHandler}
            enterButton
            allowClear
          />
          <Button
            className={style.addButton}
            type="primary"
            onClick={() => editInfoHandler()}
          >
            Create
          </Button>
        </Card>
        {data?.length === 0 && <Result title="No data for teachers" />}
        {data?.map((item) => (
          <ProCard
            key={item.id}
            className={style.card}
            actions={[
              <EditOutlined
                key="edit"
                onClick={() => editInfoHandler(item.id)}
              />,
              <Popconfirm
                title="Reminder"
                description="Are you sure to delete it?"
                okButtonProps={{ loading: delLoading }}
                onConfirm={() => onDeleteHandler(item.id)}
              >
                <DeleteOutlined key="del" />
              </Popconfirm>,
            ]}
          >
            <div
              className={style.avatar}
              style={{ backgroundImage: `url(${item.photoUrl})` }}
            />
            <div className={style.content}>
              <div className={style.name}>{item.name}</div>
              <div>
                {item.tags.split(',').map((it: string) => (
                  <Tag
                    key={it}
                    color="green"
                  >
                    {it}
                  </Tag>
                ))}
              </div>
              <div className={style.education}>{item.education}</div>
              <div className={style.seniority}>{item.seniority}</div>
            </div>
          </ProCard>
        ))}
        <div className={style.page}>
          <Pagination
            pageSize={page?.pageSize}
            current={page?.pageNum}
            total={page?.total}
            onChange={onPageChangeHandler}
          />
        </div>
        {show && (
        <CreateTeacher
          id={curId}
          onClose={closeAndRefetchHandler}
        />
        )}
      </PageContainer>
    </div>
  );
};

export default Teacher;
