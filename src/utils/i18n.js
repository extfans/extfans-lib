/**
 * 获取翻译
 * 
 * @param {string} name 翻译条目的name
 * @param {Object} substitutions 翻译条目中需要replace的字段
 * @returns {string} 翻译结果
 */
export default function i18n(name, ...substitutions) {
  return chrome.i18n
    .getMessage(name, ...substitutions) || name;
}

/**
 * 获取界面语言
 * 
 * @returns {string} 语言code
 */
export function getLang() {
  return chrome.i18n.getUILanguage();
}

/**
 * 判断是否为中文
 * 
 * @returns {boolean} 是否为中文
 */
export function isZh() {
  return getLang() === 'zh-CN';
}