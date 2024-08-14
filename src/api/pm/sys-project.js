import request from '@/utils/request.js'

export function paging(data = {}) {
  return request({
    url: '/back/sys-project/paging',
    method: 'post',
    data
  })
}
export function selectList(data = {}) {
  return request({
    url: '/back/sys-project/selectList',
    method: 'post',
    data
  })
}
export function add(data = {}) {
  return request({
    url: '/back/sys-project/add',
    method: 'post',
    data
  })
}
export function edit(data = {}) {
  return request({
    url: '/back/sys-project/edit',
    method: 'post',
    data
  })
}
export function del(data = {}) {
  return request({
    url: '/back/sys-project/delete',
    method: 'post',
    data
  })
}
export function create(data = {}) {
  return request({
    url: '/back/sys-project/create',
    method: 'post',
    data
  })
}
export function push(data = {}) {
  return request({
    url: '/back/sys-project/push',
    method: 'post',
    data
  })
}
export function pull(data = {}) {
  return request({
    url: '/back/sys-project/pull',
    method: 'post',
    data
  })
}