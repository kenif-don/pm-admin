import request from '../../utils/request.js'
export function add(data) {
  return request({
    url: '/back/sys-role/add',
    method: 'post',
    data
  })
}

export function paging(data) {
  return request({
    url: '/back/sys-role/paging',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/back/sys-role/edit',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/back/sys-role/del',
    method: 'post',
    data
  })
}
export function selectList(data) {
  return request({
    url: '/back/sys-role/selectList',
    method: 'post',
    data
  })
}