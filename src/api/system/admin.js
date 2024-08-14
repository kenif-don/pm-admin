import request from '../../utils/request.js'
export function getValidateCode(){
  return request({
    url: '/back/sys-auth/getValidateCode',
    method: 'post'
  })
}
export function editInfo(data){
  return request({
    url: '/back/sys-auth/edit-info',
    method: 'post',
    data
  })
}
export function add(data) {
  return request({
    url: '/back/sys-admin-role/add',
    method: 'post',
    data
  })
}
export function edit(data) {
  return request({
    url: '/back/sys-admin-role/edit',
    method: 'post',
    data
  })
}
export function del(data) {
  return request({
    url: '/back/sys-admin-role/del',
    method: 'post',
    data
  })
}
export function login(data) {
  return request({
    url: '/back/sys-auth/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/back/sys-auth/info',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/back/sys-auth/logout',
    method: 'post'
  })
}
export function paging(data) {
  return request({
    url: '/back/sys-admin-role/paging',
    method: 'post',
    data
  })
}