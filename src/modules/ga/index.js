/**
 * 例子
 * 
 * import Ga from '@extfans/lib/module/ga';
 * 
 * // 初始化
 * const ga = new Ga({ trackingId: 'UA-XXXXXXXXX-X' });
 * 
 * ga.pageview();
 * 
 * ga.event({ category: 'btn', action: 'click', label: 'random-btn' });
 */

import { GA_CLIENT_ID_STORAGE_KEY } from '@extfans/lib/consts';

import { setSync, getSync } from '@extfans/lib/utils/storage';

import axios from '@extfans/lib/utils/axios';

import genNonceId from '@extfans/lib/utils/gen-nonce-id';
import genUuid from '@extfans/lib/utils/gen-uuid';

import getSystemInfo from './utils/getSystemInfo';

export default class Ga {
  /**
   * 构造函数
   * 
   * @param {Object} info 全局设置
   * @param {string} info.trackingId UA-XXXXXXXXX-X https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#cid
   * @param {string=} info.userId https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#uid
   */
  constructor(info) {
    // base
    const baseInfo = this.baseInfo = {
      v: 1,
      tid: info.trackingId,
      uid: info.userId,
    };

    const clientId = getSync(GA_CLIENT_ID_STORAGE_KEY);
    if (clientId === null) {
      clientId = genUuid();
      setSync(GA_CLIENT_ID_STORAGE_KEY, clientId);
    }

    baseInfo.cid = clientId;

    // system
    this.systemInfo = getSystemInfo();

    // extra
    this.extraInfo = {
      dl: (window.location.href.split('#'))[0]
    };
  }

  /**
   * pageview
   * 
   * @param {Object} info 信息
   * @param {string=} info.location 默认为location.href去掉location.hash后的部分 https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#dl
   * @param {string=} info.host https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#dh
   * @param {string=} info.page https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#dp
   * @param {string=} info.title 默认为document.title https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#dt
   */
  pageview(info = {}) {

    return this.send(
      'pageview',
      {
        dl: info.location,
        dh: info.host,
        dp: info.page,
        dt: info.title || window.document.title
      }
    );
  }

  /**
   * event
   * 
   * @param {Object} info 信息
   * @param {string} info.category https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ec
   * @param {string} info.action https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ea
   * @param {string=} info.label https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#el
   * @param {string=} info.value https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ev
   * @param {boolean} info.nonInteraction 默认为false https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ni
   */
  event(info) {

    return this.send(
      'event',
      {
        ec: info.category,
        ea: info.action,
        el: info.label,
        ev: info.value,
        ni: info.nonInteraction ? 1 : undefined
      }
    );
  }

  send(type, sendInfo) {
    const info = Object.assign(
      {
        _t: genNonceId(),
        t: type
      },
      this.baseInfo,
      this.systemInfo,
      sendInfo
    );
  
    const { extraInfo } = this;
    for (const key in extraInfo) {
      if (info[key] == null) {
        info[key] = extraInfo[key];
      }
    }
  
    axios
      .get(
        'https://www.google-analytics.com/collect?',
        {
          params: info
        }
      );
  }
}

export default ga;