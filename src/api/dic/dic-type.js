import request from '@/utils/request.js'
export function paging(data = {}) {
  return request({
    url: '/back/dic/dic-type/paging',
    method: 'post',
    data
  })
}
export function selectList(data = {}) {
  return request({
    url: '/back/dic/dic-type/selectList',
    method: 'post',
    data
  })
}
export function add(data = {}) {
  return request({
    url: '/back/dic/dic-type/add',
    method: 'post',
    data
  })
}
export function edit(data = {}) {
  return request({
    url: '/back/dic/dic-type/edit',
    method: 'post',
    data
  })
}
export function del(data = {}) {
  return request({
    url: '/back/dic/dic-type/del',
    method: 'post',
    data
  })
}
