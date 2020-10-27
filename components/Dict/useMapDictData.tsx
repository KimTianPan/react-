import React from 'react';

type IuseMapDictData = (
  dictRows: any[], //字典元数据
  dictStatus: string, //字段状态
  prams?: {
    //解构参数  默认 value 映射 name
    markField?: string;
    textField?: string;
  },
) => any;

const DictStatusStore = {};

const findMapValue = ({ markField = 'mark', textField = 'name', status, rows }) => {
  const value = rows?.find((row, index) => row[markField as string] === status);
  // debugger;
  if (value) {
    return value;
  }
  if (!value && markField === 'mark') {
    return findMapValue({ markField: 'value', textField: 'name', status, rows });
  }
  if (!value && markField === 'value') {
    return findMapValue({ markField: 'content', textField: 'name', status, rows });
  }
};

export const useMapDictData: IuseMapDictData = (
  dictRows,
  dictStatus,
  prams = { markField: 'value', textField: 'name' },
) => {
  
  const { markField, textField } = prams;
  //debugger;

  //  const value = dictRows?.find((row, index) => row[markField as string] === dictStatus);
  const value = findMapValue({ status: dictStatus, rows: dictRows });
  //DictStatusStore[dictStatus] = value?.[textField as string];
  const text = value?.[textField as string];
  // if (text === 'FSSC_COMM_YOrN_Y') {
   // debugger;
    //console.log(text);
  // }
  
  return text;
};
