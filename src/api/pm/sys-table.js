import request from '@/utils/request.js'

export function paging(data) {
  return request({
    url: '/back/sys-table/paging',
    method: 'post',
    data
  })
}
export function getTables(data) {
  return request({
    url: '/back/sys-table/getTables',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/back/sys-table/add',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/back/sys-table/edit',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/back/sys-table/delete',
    method: 'post',
    data
  })
}
export function sync(data) {
  return request({
    url: '/back/sys-table/sync',
    method: 'post',
    data
  })
}