import { useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import qs from 'qs';
import { purifyDeep } from '@/common/utils/helper';
import api from '@/common/api';
import FoodTruckTable from '../FoodTruckTable';
import { Input, Select, Space } from 'antd';

const { Search } = Input;

const TruckList = () => {
  const [tableData, setTableData] = useState();
  const [loading, setLoading] = useState(false);
  const [searchFiled, setSearchFiled] = useState('applicant');
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultFilters = useMemo(
    () => ({
      pageno: 1,
      pagesize: 10,
      sortby: 'id',
      sortdir: 'asc',
      filter: 'applicant=',
    }),
    []
  );

  const getFilters = useCallback(
    () => ({ ...defaultFilters, ...qs.parse(searchParams.toString()) }),
    [defaultFilters, searchParams]
  );

  const requestList = useCallback(
    async (args) => {
      const params = purifyDeep({ ...getFilters(), ...args });
      setLoading(true);
      try {
        const { data: result } = await api.foodTruckListAll(params);
        setTableData(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
    [getFilters]
  );

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    requestList();
    const filters = getFilters();
    setSearchParams(qs.stringify(filters));
  }, []);

  const reload = (args) => {
    const filters = getFilters();
    const params = purifyDeep({ ...filters, ...args });

    setSearchParams(qs.stringify(params));
    requestList(params);
  };

  const onPageNoChange = (pageno, pagesize) => {
    reload({ pageno, pagesize });
  };

  const handleSelectChange = (value) => {
    setSearchFiled(value);
  };

  const handleSearch = useCallback(
    (value) => {
      reload({ filter: `${searchFiled}=${value}` });
    },
    [searchFiled]
  );

  return (
    <div className="dbr-table-container">
      <Space.Compact>
        <Select
          defaultValue="applicant"
          style={{ width: 120 }}
          onChange={handleSelectChange}
          options={[
            { value: 'applicant', label: 'Applicant' },
            { value: 'foodItems', label: 'Food Items' },
          ]}
        />
        <Search
          placeholder="input search text"
          enterButton="Search"
          onSearch={handleSearch}
        />
      </Space.Compact>

      <FoodTruckTable
        tableData={tableData}
        reload={reload}
        loading={loading}
        onPageNoChange={onPageNoChange}
      />
    </div>
  );
};
export default TruckList;
