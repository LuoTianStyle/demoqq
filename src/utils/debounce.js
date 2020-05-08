/**
 *
 * 防抖函数 规定时间内频繁触发，只执行最后一次
 * @param {*} fn
 * @param {*} delay
 */
export const debounce = (fn, delay) => {
  let timeout = null
  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      // eslint-disable-next-line no-undef
      fn.apply(this, arguments)
    }, delay)
  }
}
