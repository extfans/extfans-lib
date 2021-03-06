/**
 * 生成一个uuid
 * 
 * @returns {string} uuid
 */
export default function genUuid() {
  let d = Date.now() + performance.now();

  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(
      /[xy]/g,
      c => {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    }
  );
}