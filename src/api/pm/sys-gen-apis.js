import request from '@/utils/request.js'

export function selectList(data = {}) {
  return request({
    url: '/back/sys-gen-apis/selectList',
    method: 'post',
    data
  })
}
export function paging(data) {
  return request({
    url: '/back/sys-gen-apis/paging',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/back/sys-gen-apis/add',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/back/sys-gen-apis/edit',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/back/sys-gen-apis/delete',
    method: 'post',
    data
  })
}