/**
 * 判断dom是否在容器中
 * 
 * @param {DOM} container 
 * @param {DOM} dom 
 * @returns {boolean} 如果为true，则dom在container中，否则dom不在container中
 */
export function contain(container, dom) {
  if (
    container === dom || container.contains(dom)
  ) {
    return true;
  }

  return false;
}