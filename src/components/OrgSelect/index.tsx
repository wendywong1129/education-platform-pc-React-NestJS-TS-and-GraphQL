import { Select, Space } from 'antd';
import _ from 'lodash';
import { useEffect } from 'react';
import { useGoTo } from '@/hooks';
import { useUserContext } from '@/hooks/userHooks';
import { ROUTE_KEY } from '@/routes/menus';
import { useOrganizations } from '@/services/org';
import { LOCAL_CURRENT_ORG } from '@/utils/constants';
import { currentOrg } from '@/utils';

// const currentOrg = localStorage.getItem(LOCAL_CURRENT_ORG);
// const currentOrg = () => {
//   try {
//     const res = JSON.parse(localStorage.getItem(LOCAL_CURRENT_ORG) || '');
//     return res;
//   } catch {
//     return undefined;
//   }
// }

const OrgSelect = () => {
  const { data, refetch } = useOrganizations(1, 20, true);

  const { setStore } = useUserContext();

  const { go } = useGoTo();

  useEffect(() => {
    if (currentOrg()?.value) {
      setStore({
        currentOrg: currentOrg().value,
      });
    } else {
      go(ROUTE_KEY.NO_ORG);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearchHandler = _.debounce((name: string) => {
    refetch({
      name,
    });
  }, 500);

  // const onChangeHandler = (val:string) => {
  //   setStore({
  //     currentOrg: val,
  //   });
  //   localStorage.setItem(LOCAL_CURRENT_ORG, val);
  // };
  const onChangeHandler = (val: { value: string, label: string }) => {
    setStore({
      currentOrg: val.value,
    });
    localStorage.setItem(LOCAL_CURRENT_ORG, JSON.stringify(val));
  };

  return (
    <Space>
      Selected Organization:
      <Select
        style={{ width: 200 }}
        placeholder="Please choose an organization"
        showSearch
        onSearch={onSearchHandler}
        filterOption={false}
        // defaultValue={currentOrg}
        defaultValue={currentOrg()}
        onChange={onChangeHandler}
        labelInValue
      >
        {data?.map((item) => (
          <Select.Option
            key={item.id}
            value={item.id}
          >
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </Space>
  );
};

export default OrgSelect;
