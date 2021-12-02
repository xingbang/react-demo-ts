import { useEffect, useRef } from 'react';

export const getSession = (tokenKey: string) => {
  return sessionStorage.getItem(tokenKey);
};

export const setSession = (tokenKey: string, token: string) => {
  sessionStorage.setItem(tokenKey, token);
};

export const removeSession = (tokenKey: string) => {
  sessionStorage.removeItem(tokenKey);
};

/**
 *
 * 格式化数字
 * @param num 接收数字
 * @param point 保留第几位
 * @returns
 */
export const numberInt = (num: number, point: number): any => {
  let numStr = num.toString().split('.')[0];
  if (numStr.length < 6) {
    return numStr;
  } else if (numStr.length >= 6 && numStr.length <= 8) {
    let decimal = numStr.substring(numStr.length - 4, numStr.length - 4 + point);
    return parseFloat(parseInt(String(num / 10000)) + '.' + decimal) + '万';
  } else if (numStr.length > 8) {
    let decimal = numStr.substring(numStr.length - 8, numStr.length - 8 + point);
    return parseFloat(parseInt(String(num / 100000000)) + '.' + decimal) + '亿';
  }
};

/**
 * 返回组建在挂载状态，如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
