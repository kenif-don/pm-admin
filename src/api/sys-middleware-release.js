import request from '@/utils/request.js'
export function selectInstalls(data = {}) {
  return request({
    url: '/back/sys-middleware-release/selectInstalls',
    method: 'post',
    data
  })
}
export function paging(data = {}) {
  return request({
    url: '/back/sys-middleware-release/paging',
    method: 'post',
    data
  })
}
export function selectList(data = {}) {
  return request({
    url: '/back/sys-middleware-release/selectList',
    method: 'post',
    data
  })
}
export function add(data = {}) {
  return request({
    url: '/back/sys-middleware-release/add',
    method: 'post',
    data
  })
}
export function edit(data = {}) {
  return request({
    url: '/back/sys-middleware-release/edit',
    method: 'post',
    data
  })
}
export function del(data = {}) {
  return request({
    url: '/back/sys-middleware-release/del',
    method: 'post',
    data
  })
}
