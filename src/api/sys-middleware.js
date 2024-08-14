import request from '@/utils/request.js'
export function paging(data = {}) {
  return request({
    url: '/back/sys-middleware/paging',
    method: 'post',
    data
  })
}
export function selectList(data = {}) {
  return request({
    url: '/back/sys-middleware/selectList',
    method: 'post',
    data
  })
}
export function add(data = {}) {
  return request({
    url: '/back/sys-middleware/add',
    method: 'post',
    data
  })
}
export function edit(data = {}) {
  return request({
    url: '/back/sys-middleware/edit',
    method: 'post',
    data
  })
}
export function del(data = {}) {
  return request({
    url: '/back/sys-middleware/del',
    method: 'post',
    data
  })
}
