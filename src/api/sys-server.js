import request from '@/utils/request.js'
export function paging(data = {}) {
  return request({
    url: '/back/sys-server/paging',
    method: 'post',
    data
  })
}
export function selectList(data = {}) {
  return request({
    url: '/back/sys-server/selectList',
    method: 'post',
    data
  })
}
export function add(data = {}) {
  return request({
    url: '/back/sys-server/add',
    method: 'post',
    data
  })
}
export function edit(data = {}) {
  return request({
    url: '/back/sys-server/edit',
    method: 'post',
    data
  })
}
export function del(data = {}) {
  return request({
    url: '/back/sys-server/del',
    method: 'post',
    data
  })
}
