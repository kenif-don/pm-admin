import request from '@/utils/request.js'

export function paging(data) {
  return request({
    url: '/back/table/paging',
    method: 'post',
    data
  })
}
export function selectList(data) {
  return request({
    url: '/back/table/selectList',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/back/table/add',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/back/table/edit',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/back/table/delete',
    method: 'post',
    data
  })
}