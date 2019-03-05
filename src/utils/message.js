import { isFunction } from './type-check';
import { MESSAGE_KEY_NAME, MESSAGE_DATA_NAME } from '@extfans/lib/consts';

/**
 * 发消息
 * 
 * @param {string} key 消息的key
 * @param {any=} data 要发送的数据
 * @param {Function=} cb 响应回调
 */
export function sendMessage(key, data, cb) {
  if (isFunction(data)) {
    cb = data;

    data = undefined;
  }

  chrome.runtime
    .sendMessage(
      {
        [MESSAGE_KEY_NAME]: key,
        [MESSAGE_DATA_NAME]: data
      },
      cb
    );
}