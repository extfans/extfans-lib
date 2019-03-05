/**
 * 例子
 * 
 * import initPage from '@extfans/lib/module/initPage';
 * 
 * initPage()
 *  .then(
 *    () => {
 *      console.log('done');
 *    }
 *  );
 */

import 'reset-css/reset.css';
import './index.less';

/**
 * 对页面进行初始化
 */
export default async function initPage() {
  // 1. 重置css

  // 2. 添加css工具

  // 3. 等待background初始化完毕
  await new Promise(
    resolve => {
      chrome.runtime.getBackgroundPage(resolve)
    }
  );
}