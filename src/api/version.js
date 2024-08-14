import request from '@/utils/request.js'

export function paging(data) {
  return request({
    url: '/back/version/paging',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/back/version/add',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/back/version/edit',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/back/version/delete',
    method: 'post',
    data
  })
}