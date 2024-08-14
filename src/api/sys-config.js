import request from '@/utils/request.js'
export function get() {
  return request({
    url: '/back/sys-config/get',
    method: 'post'
  })
}
export function edit(data = {}) {
  return request({
    url: '/back/sys-config/edit',
    method: 'post',
    data
  })
}
