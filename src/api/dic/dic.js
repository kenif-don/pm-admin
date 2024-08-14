import request from '@/utils/request.js'
export function paging(data = {}) {
  return request({
    url: '/back/dic/dic/paging',
    method: 'post',
    data
  })
}
export function selectDices(data = {}) {
  return request({
    url: '/back/dic/dic/selectDices',
    method: 'post',
    data
  })
}
export function add(data = {}) {
  return request({
    url: '/back/dic/dic/add',
    method: 'post',
    data
  })
}
export function edit(data = {}) {
  return request({
    url: '/back/dic/dic/edit',
    method: 'post',
    data
  })
}
export function del(data = {}) {
  return request({
    url: '/back/dic/dic/del',
    method: 'post',
    data
  })
}
