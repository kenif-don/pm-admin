import request from '@/utils/request.js'

export function paging(data) {
  return request({
    url: '/back/database/paging',
    method: 'post',
    data
  })
}
export function selectList(data) {
  return request({
    url: '/back/database/selectList',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/back/database/add',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/back/database/edit',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/back/database/delete',
    method: 'post',
    data
  })
}