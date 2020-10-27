import React from 'react';
import { message } from 'antd';
import { useMapDictData } from './useMapDictData';
import { useDictData } from './useDictData';

// 设置服务名称，比如是4a的还是流程中心的f

// const { baseProj } = JReap;

// // 设置字典编码
// const code = 'jreapbiz_SYSTEM_BPM_BSTYPE';

// JReap.getDictData(baseProj, 'FSSC_COMM_YOrN' as any).then((data: any) => {
//   console.log(data);
// });

export const useMapDictText = (code: string = '', props: string = '', rules) => {
  const results = useDictData(code);

  const status = useMapDictData(results?.rows as any, props, rules);

  // debugger;
  return status || ' ';
};
