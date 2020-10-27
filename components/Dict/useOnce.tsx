import React from 'react';

export const useOnce = (fn: Function) => {
  return React.useMemo(() => fn(), []);
};
