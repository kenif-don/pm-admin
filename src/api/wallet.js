import request from '@/utils/request.js'

export function getTrx() {
  return request({
    url: '/back/wallet/getTrx',
    method: 'post'
  })
}
export function getUSDT() {
  return request({
    url: '/back/wallet/getUSDT',
    method: 'post'
  })
}
export function getPrivateKey() {
  return request({
    url: '/back/wallet/getPrivateKey',
    method: 'post'
  })
}
export function add(data) {
  return request({
    url: '/back/wallet/add',
    method: 'post',
    data
  })
}