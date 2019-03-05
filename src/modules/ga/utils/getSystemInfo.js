/**
 * 获取系统信息
 * 
 * @returns {object} 系统信息
 */
export default function getSystemInfo() {
  return {
    // 分辨率
    sr: window.screen.width + 'x' + window.screen.height,
    // 色彩
    sd: window.screen.colorDepth + '-bits',
    // 语言
    ul: navigator.language
  };
}