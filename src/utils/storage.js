/**
 * 从localStorage获取数据
 * 
 * @param {string} key 存储的key
 * @returns {any} 存储的数据
 */
export function getSync(key) {
  let val = localStorage
    .getItem(
      key,
      val
    );

  if (val !== null) {
    try {
      val = JSON.parse(val);
    } catch (e) {

    }
  }

  return val;
}

/**
 * 存储数据到localStorage
 * 
 * @param {string} key 存储的key
 * @param {any} 存储的数据，如果是null或者undefined则为删除
 */
export function setSync(key, val) {
  if (val == null) {
    localStorage
      .removeItem(key);
    return;
  }

  localStorage
    .setItem(
      key,
      JSON.stringify(val)
    );
}

/**
 * 从chrome.storage.local获取数据
 * 
 * @param {string} key 存储的key
 * @returns {any} 存储的数据
 */
export async function get(key) {
  return new Promise(
    resolve => {
      chrome.storage.local
        .get(
          key,
          res => {
            resolve(
              res[key]
            );
          }
        );
    }
  );
}

/**
 * 存储数据到chrome.storage.local
 * 
 * @param {string} key 存储的key
 * @param {any} 存储的数据，如果是null或者undefined则为删除 
 */
export async function set(key, value) {
  return new Promise(
    resolve => {
      if (value == null) {
        chrome.storage.local
          .remove(
            key,
            resolve
          );
        return;
      }

      chrome.storage.local
        .set(
          {
            [key]: value,
          },
          resolve
        );
    }
  );
}