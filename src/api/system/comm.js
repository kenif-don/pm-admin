import request from '../../utils/request.js'
export function get() {
  return request({
    url: '/back/sys-runtime/get',
    method: 'post',
    noLoading:true
  })
}
export function upload(data) {
  return request({
    url: '/public/upload/on',
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}