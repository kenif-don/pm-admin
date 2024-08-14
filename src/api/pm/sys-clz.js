import request from '@/utils/request.js'
export function paging(data = {}) {
  return request({
    url: '/back/sys-clz/paging',
    method: 'post',
    data
  })
}
export function selectList(data = {}) {
  return request({
    url: '/back/sys-clz/selectList',
    method: 'post',
    data
  })
}
export function add(data = {}) {
  return request({
    url: '/back/sys-clz/add',
    method: 'post',
    data
  })
}
export function edit(data = {}) {
  return request({
    url: '/back/sys-clz/edit',
    method: 'post',
    data
  })
}
export function del(data = {}) {
  return request({
    url: '/back/sys-clz/del',
    method: 'post',
    data
  })
}
