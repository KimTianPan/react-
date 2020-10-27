import React from 'react';
import { useMapDictText } from './useMapDictText';

type IMapDictText = {
  code: string; // 字典编码
  status: string; // record 状态
  rules?: {
    //配置字典解析规则 防止字典后台数据不按 name映射value的规则
    markField: string; //  字段编码 所属字段
    textField?: string; // 字典对应文本字段
  };
};

const DEFAULT_RULES = {
  markField: 'value',
  textField: 'name',
};

const MapDictText: React.FC<IMapDictText> = (props) => {
  // debugger;
  // const [text, useText] = React.useState<any>('');
  const { code, status, rules = {} } = props;
  // debugger;

  const text = useMapDictText(code, status, { ...DEFAULT_RULES, ...rules });
  // console.log(text);

  //console.log(text);
  return <span>{text}</span>;
};
export default MapDictText;
