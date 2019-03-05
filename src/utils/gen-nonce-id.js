let t = Date.now();

/**
 * 生成一个自增的id
 * 
 * @returns {string} 自增id
 */
export default function genNonceId() {
  return `nonce${t++}`;
}