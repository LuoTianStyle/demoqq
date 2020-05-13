// 时间戳
export const dataFormat = e => {
  if (String(e).length === 10) {
    e = new Date(parseInt(e) * 1000)
  } else {
    e = new Date(parseInt(e))
  }
  let y = e.getFullYear()
  let m = e.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = e.getDate()
  d = d < 10 ? '0' + d : d
  e = y + '-' + m + '-' + d
  return e
}
