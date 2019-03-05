import { isObject } from './type-check';

/**
 * 打开url
 * 
 * @param {string=} url 要打开的url，如果为undefined就是打开新标签页
 * @param {object} config 设置
 * @param {boolean} config.inNewTab 是否在新标签页打开
 * @param {boolean} config.active 为false时打开后不会聚焦到新的tab上
 */
export function open(url, config) {
  if (isObject(url)) {
    config = url;

    url = undefined;
  }

  config = Object
    .assign(
      {
        active: true,
        inNewTab: false,
      },
      config
    );

  if (config.inNewTab) {
    const option = {
      active: config.active
    };

    if (url !== undefined) {
      option.url = url;
    }

    chrome.tabs
      .create(option);
  } else {
    const option = {};

    if (url !== undefined) {
      option.url = url;
    }

    chrome.tabs
      .update(option);
  }
}