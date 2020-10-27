export const pramsToQuery = (obj) => {
  let str = '';
  for (const key in obj) {
    str = `${str + key}=${obj[key]}&`;
  }
  str = str.substr(0, str.length - 1);

  return str;
};
