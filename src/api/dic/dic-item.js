import request from '@/utils/request.js'

export function paging(data) {
  return request({
    url: '/back/dic-item/paging',
    method: 'post',
    data
  })
}
export function selectList(data) {
  return request({
    url: '/back/dic-item/selectList',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/back/dic-item/add',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/back/dic-item/edit',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/back/dic-item/delete',
    method: 'post',
    data
  })
}