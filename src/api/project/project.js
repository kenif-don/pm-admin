import request from '@/utils/request.js'

export function paging(data) {
  return request({
    url: '/back/project/paging',
    method: 'post',
    data
  })
}
export function selectList(data) {
  return request({
    url: '/back/project/selectList',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/back/project/add',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/back/project/edit',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/back/project/delete',
    method: 'post',
    data
  })
}