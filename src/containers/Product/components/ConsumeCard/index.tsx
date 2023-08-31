import {
  Modal, Result, Row, Space, Typography,
} from 'antd';
import { CheckCard } from '@ant-design/pro-components';
import { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { CreditCardOutlined } from '@ant-design/icons';
import { useLazyCards } from '@/services/card';
import { useEditProductInfo, useProductInfo } from '@/services/product';
import { getCardName } from '@/utils/constants';
import CourseSearch from '@/components/CourseSearch';
import style from './index.module.less';

interface IProps {
  id: string;
  onClose: (isReload?: boolean) => void;
}

const ConsumeCard = ({
  onClose,
  id,
}: IProps) => {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const { data: product, loading: getProductLoading } = useProductInfo(id);
  const { getCards, data: cards, loading: getCardsLoading } = useLazyCards();
  const [edit, editLoading] = useEditProductInfo();

  const newCards = useMemo(
    () => _.unionBy(product?.cards || [], cards, 'id'), // "id" => cardId
    [cards, product?.cards],
  );
  // console.log('product.cards:', product?.cards);
  // console.log('cards:', cards);
  // [{id: '5c1cfebb-ef0f-4bd6-a393-157e58f1e02f',
  // name: 'Yearly Unlimited Card', type: 'duration', time: 0, validityDay: 365,}]
  // console.log('newCards:', newCards);

  useEffect(() => {
    setSelectedCards(product?.cards?.map((item) => item.id) || []);
  }, [product?.cards]);

  const onOkHandler = () => {
    edit(id, {
      cards: selectedCards,
    }, () => onClose());
  };
  // console.log('selectedCards:', selectedCards);
  // ['c0b40e49-ddb8-4ec3-9c20-0ae52384f0e7', '8bb5dd5e-0bc7-460e-91a7-5f84b0b69bb3']

  const onSelectedHandler = (courseId: string) => {
    getCards(courseId);
  };

  return (
    <Modal
      title="Bundle with consumer card"
      width="900"
      open
      onOk={onOkHandler}
      onCancel={() => onClose()}
    >
      <Row justify="end">
        <CourseSearch onSelected={onSelectedHandler} />
      </Row>
      <Row justify="center" className={style.content}>
        {newCards.length === 0 && (
        <Result
          status="warning"
          title="Please search courses and choose relevant consumer cards"
        />
        )}
        <CheckCard.Group
          multiple
          loading={getProductLoading || editLoading || getCardsLoading}
          onChange={(value) => {
            setSelectedCards(value as string[]);
          }}
          value={selectedCards}
        >
          {
            newCards.map((item) => (
              <CheckCard
                key={item.id}
                value={item.id}
                size="default"
                avatar={<CreditCardOutlined />}
                title={
                  (
                    <>
                      <Space>
                        <Typography.Text
                          ellipsis
                          className={style.name}
                        >
                          {item.course?.name}
                        </Typography.Text>
                        {getCardName(item.type)}
                      </Space>
                      <div>
                        {item.name}
                      </div>
                    </>
                  )
                }
                description={
                  (
                    <Space>
                      <span>
                        Times:
                        {item.time}
                      </span>
                      <span>
                        Validity(day):
                        {item.validityDay}
                      </span>
                    </Space>
                  )
                }
              />
            ))
          }

        </CheckCard.Group>
      </Row>
    </Modal>
  );
};

export default ConsumeCard;
