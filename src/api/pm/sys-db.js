import request from '@/utils/request.js'

export function create(data) {
  return request({
    url: '/back/sys-db/create',
    method: 'post',
    data
  })
}
export function paging(data) {
  return request({
    url: '/back/sys-db/paging',
    method: 'post',
    data
  })
}
export function selectList(data) {
  return request({
    url: '/back/sys-db/selectList',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/back/sys-db/add',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/back/sys-db/edit',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/back/sys-db/delete',
    method: 'post',
    data
  })
}