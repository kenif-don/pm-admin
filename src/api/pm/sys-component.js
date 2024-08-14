import request from '@/utils/request.js'
export function paging(data = {}) {
  return request({
    url: '/back/pm/sys-component/paging',
    method: 'post',
    data
  })
}
export function selectList(data = {}) {
  return request({
    url: '/back/pm/sys-component/selectList',
    method: 'post',
    data
  })
}
export function add(data = {}) {
  return request({
    url: '/back/pm/sys-component/add',
    method: 'post',
    data
  })
}
export function edit(data = {}) {
  return request({
    url: '/back/pm/sys-component/edit',
    method: 'post',
    data
  })
}
export function del(data = {}) {
  return request({
    url: '/back/pm/sys-component/del',
    method: 'post',
    data
  })
}
