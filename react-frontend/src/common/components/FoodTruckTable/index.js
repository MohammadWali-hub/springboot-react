import { useSearchParams } from 'react-router-dom';
import { Table } from 'antd';
import qs from 'qs';

const TruckTable = ({
  tableData = {},
  loading = false,
  onPageNoChange = () => {},
}) => {
  const columns = [
    {
      title: 'No.',
      dataIndex: 'id',
      editable: false,
    },
    {
      title: 'Applicant',
      dataIndex: 'applicant',
      editable: false,
    },
    {
      title: 'Facility Type',
      dataIndex: 'facilityType',
      editable: false,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      editable: false,
    },
    {
      title: 'Location Description',
      dataIndex: 'locationDescription',
      editable: false,
    },
    {
      title: 'Food Items',
      dataIndex: 'foodItems',
      editable: false,
    },
    {
      title: 'Latitude',
      dataIndex: 'latitude',
      editable: false,
    },
    {
      title: 'Longitude',
      dataIndex: 'longitude',
      editable: false,
    },
  ];

  const [searchParams] = useSearchParams();

  const { pageno = 1, pagesize = 10 } = {
    ...qs.parse(searchParams.toString()),
  };

  const { totalElements = 0, content = [] } = tableData;

  const pagination = {
    current: Number(pageno),
    pageSize: Number(pagesize),
    total: totalElements,
    onChange: onPageNoChange,
    showSizeChanger: true,
  };

  return (
    <Table
      className="dbr-table"
      rowKey="id"
      size="small"
      columns={columns}
      loading={loading}
      dataSource={content}
      pagination={pagination}
      tableLayout="auto"
    />
  );
};
export default TruckTable;
