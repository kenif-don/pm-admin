import request from '@/utils/request.js'
export function getClassName(data) {
    return request({
        url: '/back/sys-gen/getClassName',
        method: 'post',
        data
    })
}
export function create(data) {
    return request({
        url: '/back/sys-gen/create',
        method: 'post',
        data
    })
}
export function createOne(data) {
    return request({
        url: '/back/sys-gen/createOne',
        method: 'post',
        data
    })
}
export function paging(data) {
  return request({
    url: '/back/sys-gen/paging',
    method: 'post',
    data
  })
}
export function selectOne(data={}) {
    return request({
        url: '/back/sys-gen/selectOne',
        method: 'post',
        data
    })
}
export function selectList(data={}) {
  return request({
    url: '/back/sys-gen/selectList',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/back/sys-gen/add',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/back/sys-gen/edit',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/back/sys-gen/del',
    method: 'post',
    data
  })
}