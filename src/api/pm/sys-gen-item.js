import request from '@/utils/request.js'

export function save(data) {
  return request({
    url: '/back/sys-gen-item/save',
    method: 'post',
    data
  })
}
export function selectList(data) {
  return request({
    url: '/back/sys-gen-item/selectList',
    method: 'post',
    data
  })
}
export function preview(data) {
  return request({
    url: '/back/sys-gen-item/preview',
    method: 'post',
    data
  })
}
export function sync(data) {
  return request({
    url: '/back/sys-gen-item/sync',
    method: 'post',
    data
  })
}
