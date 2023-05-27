export const getTime = () => {
  let message = ''
  const hour = new Date().getHours()
  if (hour >= 6 && hour <= 11) {
    message = '早上好'
  } else if (hour >= 12 && hour <= 13) {
    message = '中午好'
  } else if (hour >= 14 && hour <= 18) {
    message = '下午好'
  } else {
    message = '晚上好'
  }
  return message
}