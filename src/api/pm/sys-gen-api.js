import request from '@/utils/request.js'

export function selectList(data) {
  return request({
    url: '/back/sys-gen-api/selectList',
    method: 'post',
    data
  })
}
export function paging(data) {
  return request({
    url: '/back/sys-gen-api/paging',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/back/sys-gen-api/add',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/back/sys-gen-api/edit',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/back/sys-gen-api/delete',
    method: 'post',
    data
  })
}