// components/CryptoTable.tsx
"use client";
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ReactElement } from 'react';
import moment from 'moment-timezone';
import { formatNumber } from '@/utils/common';

const CryptoTable = (): ReactElement => {
  const { data} = useSelector((state: RootState) => state.crypto);
  console.log("UPDATED CRYPTO ==>", data);
  const columns = [
    {
      title: 'Current Price',
      dataIndex: 'current_price',
      key: 'current_price',
      render: (text: string) => {
        return `$${Number(text).toFixed(2)}`;
      }
    },
    {
      title: 'Market Cap',
      dataIndex: 'market_cap',
      key: 'market_cap',
      render: (text: string) => {
        return formatNumber((Number(text)))
      }
    },
    {
      title: 'Volume 24h',
      dataIndex: 'volume',
      key: 'volume',
      render: (text: string) => {
        return formatNumber((Number(text)))
      }
    },
    {
      title: '1h',
      dataIndex: 'change_price',
      key: 'change_price',
      render: (text: string) => {
        return `${Number(text).toFixed(2)}%`
      }
    },
    {
      title: '24h',
      dataIndex: 'change_price_24',
      key: 'change_price_24',
      render: (text: string) => {
        return `${Number(text).toFixed(2)}%`
      }
    },
    {
      title: 'Last Update',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text: string, record: any) => {
        const localTime = moment(record.createdAt).format('YYYY-MM-DD HH:mm:ss');
        return localTime;
      },
    },
  ];

  return <Table dataSource={data} columns={columns} rowKey="_id" />;
};

export default CryptoTable;
