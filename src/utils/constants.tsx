import { Tag } from 'antd';

export const AUTH_TOKEN = 'auth_token';

export const DEFAULT_PAGE_SIZE = 10;

export const LOCAL_CURRENT_ORG = 'LOCAL_CURRENT_ORG';

export const DAY_FORMAT = 'YYYY-MM-DD';

export const CARD_TYPE = {
  TIME: 'time',
  DURATION: 'duration',
};

export const getCardName = (type: string) => {
  switch (type) {
    case CARD_TYPE.TIME:
      return <Tag color="blue">Times Card</Tag>;
    case CARD_TYPE.DURATION:
      return <Tag color="green">Duration Card</Tag>;
    default:
      return '-';
  }
};

export const SCHEDULE_STATUS = {
  CANCEL: 'CANCEL',
};
