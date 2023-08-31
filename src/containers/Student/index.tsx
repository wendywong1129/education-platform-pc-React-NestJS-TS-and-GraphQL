import { PageContainer } from '@ant-design/pro-components';
import {
  Card, Pagination, Space,
} from 'antd';
import { IStudent } from '@/utils/types';
import { useStudents } from '@/services/student';
import style from './index.module.less';

const Student = () => {
  const {
    loading, data, page, refetch,
  } = useStudents();

  const onPageChangeHandler = (pageNum: number, pageSize: number) => {
    refetch({
      page: {
        pageNum,
        pageSize,
      },
    });
  };

  return (
    <div className={style.container}>
      <PageContainer
        loading={loading}
        header={{
          title: 'Student Management',
        }}
      >
        <Card>
          {
          data?.map((item: IStudent) => (
            <Card
              key={item.id}
              hoverable
              className={style.card}
              cover={(
                <div
                  className={style.avatar}
                  style={{ backgroundImage: `url(${item.avatar || 'http://water-drop-assets.oss-cn-hangzhou.aliyuncs.com/images/1675623073445.jpg'} )` }}
                />
              )}
            >
              <Card.Meta
                title={item.name || 'Anonymous'}
                description={<Space>{[item.account || 'No Account', item.tel || 'No Phone']}</Space>}
              />
            </Card>
          ))
        }
          <div className={style.page}>
            <Pagination
              pageSize={page?.pageSize}
              current={page?.pageNum}
              total={page?.total}
              onChange={onPageChangeHandler}
            />
          </div>
        </Card>
      </PageContainer>
    </div>
  );
};

export default Student;
