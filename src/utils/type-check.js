/**
 * 类型检查
 * 
 * @param {any} val 等待检查的对象
 * @param {string} type 要求类型
 * @returns {boolean} 为true时说明检查通过
 */
export default function is(val, type) {
  return Object.prototype.toString.call(val) === `[object ${type}]`;
}

/**
 * 检查是否为函数
 * 
 * @param {any} val 等待检查的对象
 * @returns {boolean} 为true时说明对象是函数
 */
export function isFunction(val) {
  return typeof val === 'function';
}

/**
 * 检查是否为数值
 * 
 * @param {any} val 等待检查的对象
 * @returns {boolean} 为true时说明对象是数值
 */
export function isNumber(val) {
  return is(val, 'Number');
}

/**
 * 检查是否为字符串
 * 
 * @param {any} val 等待检查的对象
 * @returns {boolean} 为true时说明对象是字符串
 */
export function isString(val) {
  return is(val, 'String');
}

/**
 * 检查是否为布尔
 * 
 * @param {any} val 等待检查的对象
 * @returns {boolean} 为true时说明对象是布尔
 */
export function isBoolean(val) {
  return is(val, 'Boolean');
}

/**
 * 检查是否为对象
 * 
 * @param {any} val 等待检查的对象
 * @returns {boolean} 为true时说明对象是对象
 */
export function isObject(val) {
  return is(val, 'Object');
}

/**
 * 检查是否为数组
 * 
 * @param {any} val 等待检查的对象
 * @returns {boolean} 为true时说明对象是数组
 */
export function isArray(val) {
  return Array.isArray(val);
}