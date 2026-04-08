import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import '../style/table.css'

const Adminusertable = ({ data ,change,pageinfo}) => {
  const [columns, setColumns] = useState([]);
  const generateColumn = (data) => {
    if (!data.length) return [];
    const serialno = {
      title: "SNO",
      key: "serial",
      render: (_, __, index) => {return index + 1},
    };
    const actioncolumn = {
      title: "ACTION",
      key: "action",
      render: () => {
        return (
          <Space align="center">
            <Button type="primary">Edit</Button>
            <Button danger>Delete</Button>
          </Space>
        );
      },
    };
    const dynamiccolumn = Object.keys(data[0]).map((key) => ({
      title: key.toUpperCase(),
      dataIndex: key,
      key: key,
    }));
    return [serialno, ...dynamiccolumn, actioncolumn];
  };
  useEffect(() => {
    setColumns(generateColumn(data));
  }, [data]);
  return (
    <>
      <Table columns={columns} dataSource={data} pagination={{
        current:pageinfo.current,
        pageSize:pageinfo.pageSize,
        total:pageinfo.total,
        showSizeChanger:true,
      }}   onChange={change} className="custom-table"/>
      
    </>
  );
};

export default Adminusertable;
