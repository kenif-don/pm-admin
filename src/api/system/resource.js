import request from '../../utils/request.js'
export function selectIdsByRoleId(data) {
  return request({
    url: '/back/sys-resource/selectIdsByRoleId',
    method: 'post',
    data
  })
}
export function getRoutes() {
  return request({
    url: '/back/sys-resource/getRoutes',
    method: 'post'
  })
}
export function tree(data) {
  return request({
    url: '/back/sys-resource/tree',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/back/sys-resource/edit',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/back/sys-resource/add',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/back/sys-resource/del',
    method: 'post',
    data
  })
}