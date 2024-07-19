"use client";
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { setTempSelectedOption } from '@/store/cryptoSlice';

const Option = Select.Option;

const CryptoDropdown = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cryptoOptions, tempSelectedOption } = useSelector((state: RootState) => state.crypto);

  /**
   * handle select change fro crypto dropdown
   * @param value 
   * @param record 
   */
  const handleSelectChange = (value: string, record: any) => {
    dispatch(setTempSelectedOption({
        label: record.children,
        value: record.value
    }));
};
  return (
    <Select
      value={tempSelectedOption?.value}
      style={{ width: 200 }}
      onChange={handleSelectChange}
    > 
    {cryptoOptions?.map(option => (
        <Option key={option.value} value={option.value}>{option.label}</Option>
    ))}
  </Select>
  );
};

export default CryptoDropdown;
