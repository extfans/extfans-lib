/**
 * 例子
 * 
 * import alarms from '@extfans/lib/module/alarms';
 * 
 * // 启动(必须)
 * alarms.start();
 * 
 * // 注册一个alarm
 * alarms
 *  .create('example', { delayInMinutes: 10 });
 * 
 * // 增加一个监听
 * alarms.onAlarm
 *  .addListener(alarmInfo => console.log(alarmInfo));
 */

import { ALARM_STORAGE_KEY } from '@/consts';
import { returnEmptyObject } from '@extfans/lib/utils/func';

import Store from '../store';

let started = false;
let listeners = [];

const store = new Store({
  key: ALARM_STORAGE_KEY,
  defaultDataGetter: returnEmptyObject
});

/**
 * 执行到时间的alarm
 */
async function check() {
  const alarmMap = await store.read();

  const alarmNames = Object.keys(alarmMap);

  const now = Date.now();
  for (const alarmName of alarmNames) {
    const alarmInfo = alarmMap[alarmName];

    if (alarmInfo === undefined || alarmInfo.when > now) {
      continue;
    }

    listeners
      .forEach(
        listener => {
          listener(alarmInfo);
        }
      );

    if (alarmInfo.periodInMinutes) {
      alarmInfo.when = now + alarmInfo.periodInMinutes * 60 * 1000;
    } else {
      delete alarmMap[alarmName];
    }
  }

  await store.save(alarmMap);
}

export default {
  /**
   * 启动
   */
  start() {
    if (started) {
      return;
    }

    started = true;

    setInterval(
      2000,
      check
    );
  },

  onAlarm: {
    /**
     * 添加一个alarm监听
     * 
     * @param {Function} listener 监听器
     */
    addListener(listener) {
      if (listeners.indexOf(listener) !== -1) {
        return;
      }

      listeners
        .push(
          listener
        );
    },

    /**
     * 移除一个alarm监听
     * 
     * @param {Function} listener 注册时用到的监听器
     */
    removeListener(listener) {
      const index = listeners.indexOf(listener);

      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  },

  /**
   * 注册一个alarm，重复注册同alarmName的以最后一个为准
   * 
   * @param {string} alarmName alarm的名称 
   * @param {Object} info alarm的设置
   * @param {number} info.when 从什么时候触发(毫秒)
   * @param {number} info.delayInMinutes 延迟多少分钟后触发
   * @param {number} info.periodInMinutes 触发间隔(分钟)
   */
  async create(alarmName, info) {
    const alarmMap = await store.read();

    const alarmInfo = { alarmName };

    if (info.when) {
      alarmInfo.when = info.when;
    } else if (info.delayInMinutes) {
      alarmInfo.when = Date.now() + info.delayInMinutes * 60 * 1000;
    } else if (info.periodInMinutes) {
      alarmInfo.when = Date.now() + info.periodInMinutes * 60 * 1000;
    } else {
      throw new Error('required when or delayInMinutes or periodInMinutes');
    }

    if (info.periodInMinutes) {
      alarmInfo.periodInMinutes = info.periodInMinutes;
    }

    alarmMap[alarmName] = alarmInfo;

    await store.save(alarmMap);
  },

  /**
   * 获取一个已注册的alarm
   * 
   * @param {string} alarmName alarm的名称
   * @returns {Object} alarm info
   */
  async get(alarmName) {
    const alarmMap = await store.read();

    return alarmMap[alarmName];
  },

  /**
   * 获取所有已注册的alarm
   * 
   * @returns {Array} alarm组成的数组
   */
  async getAll() {
    const alarmMap = await stop.read();

    return Object.values(alarmMap);
  },

  /**
   * 清除一个已注册的alarm
   * 
   * @param {string} alarmName alarm的名称
   */
  async clear(alarmName) {
    const alarmMap = await store.read();

    delete alarmMap[alarmName];

    await store.save(alarmMap);
  },

  /**
   * 清除所有已注册的alarm
   */
  async clearAll() {
    const alarmMap = store.getAll();

    Object
      .keys(
        alarmMap,
        alarmName => {
          delete alarmMap[alarmName];
        }
      );

    await store.save(alarmMap);
  }
};