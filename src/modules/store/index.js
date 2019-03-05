/**
 * import Store from '@extfans/lib/module/store';
 * 
 * const store = new Store({
 *  key: 'test',
 *  defaultDataGetter: () => {
 *    return {
 *      key: 'xxx',
 *      extraKey: 'yyy'
 *    }
 *  },
 *  dataAdjuster: data => {
 *    // 老版本已持久化到本地的数据没有extraKey，这里默认设置上
 *    return Object.assign(
 *      {
 *        extraKey: 'yyy'
 *      },
 *      data
 *    );
 *  }
 * });
 * 
 * // 读取
 * store
 *  .read()
 *  .then(
 *    res => console.log(res)
 *   );
 * 
 * // 保存
 * store
 *  .save({
 *    key: 'xxxx',
 *    extraKey: 'yyyy'
 *   })
 *  .then(
 *    res => console.log('done')
 *   );
 */

import * as storage from '@extfans/lib/utils/storage';
import { isFunction } from '@extfans/lib/utils/type-check'

/**
 * 带缓存的存储
 */
export default class Store {
  /**
   * 构造函数
   * 
   * @param {object} config 
   * @param {string} config.key 存储的key
   * @param {Function} config.defaultDataGetter 默认数据生成器
   * @param {Function} config.dataAdjuster 读取持久数据后进行修正的函数
   * @param {boolean=} config.large 默认为true，为true时从chrome.storage.local读，否则从localStorage读
   */
  constructor(config) {
    config = Object.assign(
      {
        key: null,
        defaultDataGetter: null,
        dataAdjuster: null,
        large: true,
      },
      config
    );

    this.config = config;

    this.cache = null;
  }

  /**
   * 读取数据
   * 
   * @returns {any} 读取结果
   */
  async read() {
    const { config } = this;

    const { key } = config;

    let data = null;

    if (this.cache === null) {
      if (config.large) {
        data = await storage.get(key);
      } else {
        data = storage.getSync(key);
      }

      if (data == null) {
        data = await config.defaultDataGetter();
      } else {
        if (isFunction(config.dataAdjuster)) {
          data = await config.dataAdjuster(data);
        }
      }

      if (this.cache === null) {
        this.cache = data;

        await this.save(data);
      } else {
        // cache为空时，如果多次调用确保返回的结果一致
        data = this.cache;
      }
    } else {
      data = this.cache;
    }

    return data;
  }

  /**
   * 保存数据
   * 
   * @param {any} data 
   */
  async save(data) {
    const { config } = this;

    this.cache = data;

    if (config.large) {
      await storage.set(config.key, data);
    } else {
      storage.setSync(config.key, data);
    }
  }

  /**
   * 重置数据成初始值
   * 
   * @returns {any} 重置后的数据 
   */
  async reset() {
    const { config } = this;

    const data = await config.defaultDataGetter();

    await this.save(data);

    return data;
  }
}