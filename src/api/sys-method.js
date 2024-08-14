import request from '@/utils/request.js'
export function paging(data = {}) {
  return request({
    url: '/back/sys-method/paging',
    method: 'post',
    data
  })
}
export function add(data = {}) {
  return request({
    url: '/back/sys-method/add',
    method: 'post',
    data
  })
}
export function edit(data = {}) {
  return request({
    url: '/back/sys-method/edit',
    method: 'post',
    data
  })
}
export function del(data = {}) {
  return request({
    url: '/back/sys-method/del',
    method: 'post',
    data
  })
}
