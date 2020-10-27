import React from 'react';
import { message } from 'antd';
import axios from 'axios';
//import { pramsToQuery } from '../../../retionalConf/pramsToQuery';
import { useOnce } from './useOnce';
import { pramsToQuery } from './pramsToQuery';
// pramsToQuery
type IStore = {
  has: (code: string) => Promise<any>;
  cache: Object;
  queue: Object;
  cacheStatus: Object;
};

const DictStore = () => {
  const store: IStore = {} as IStore;
  store.cache = {};
  store.queue = {};
  store.cacheStatus = {};
  store.has = (code) => {
    if (store.cache[code]) {
      switch (store.cacheStatus[code]) {
        case 'pendding':
          return new Promise((resolve, reject) => {
            store.queue[code].push(resolve);
          });
        case 'resolve':
          return new Promise((resolve, reject) => {
            resolve(store.cache[code]);
          });
        default:
          return null as any;
      }
    } else {
      //加入缓存 返回promise 从来没有
      store.cache[code] = {};
      store.queue[code] = [];
      store.cacheStatus[code] = 'pendding';

      const newPromise = new Promise((resolve, reject) => {
        store.queue[code].push(resolve);
      });

      const p = pramsToQuery({
        mark: code,
        showChild: true,
        bizId: '',
        isNeedPublicValue: '',
        type: '',
      });
      axios
        .post('/base/web/code/getCodeTree.form', p, {
          headers: {
            'jreap-heard': 'dtxy',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          },
        })
        .then(({ data: res }) => {
          // if (code === 'FSSC_COMM_YOrN') {
          //   debugger;
          // }
          store.cache[code] = res;
          store.cacheStatus[code] = 'resolve';
          store.queue[code].forEach((callback) => callback(res));
        })
        .catch((err) => err);

      return newPromise;
    }
  };
  return store;
};
const codeStore = DictStore();

export const useDictData = (code: string) => {
  const [result, useRequest] = React.useState<any>([]);
  useOnce(() => {
    codeStore.has(code).then((res) => {
      useRequest(res);
    });
  });

  return result;
};
