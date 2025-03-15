/**
 * 异步函数，用于获取模块的默认导出值或整个模块内容
 * 当模块只有一个默认导出时，直接返回该默认导出的值
 * 如果模块包含多个导出，则返回整个模块内容
 *
 * @param m 模块对象，可以是一个包含默认导出和其他导出的对象
 * @returns 返回模块的默认导出值或整个模块内容
 */
export async function interopDefault(m) {
  // 等待模块对象解析完成
  const resolved = await m;
  // 返回解析后的模块对象的默认导出值，如果不存在默认导出，则返回整个模块对象
  return resolved.default || resolved;
}
