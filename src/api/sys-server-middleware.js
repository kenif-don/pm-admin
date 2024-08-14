import request from '@/utils/request.js'
export function enterCmd(data = {}) {
  return request({
    url: '/back/sys-server-middleware/enter-cmd',
    method: 'post',
    data
  })
}
export function selectList(data = {}) {
  return request({
    url: '/back/sys-server-middleware/selectList',
    method: 'post',
    data
  })
}
export function add(data = {}) {
  return request({
    url: '/back/sys-server-middleware/add',
    method: 'post',
    data
  })
}
export function del(data = {}) {
  return request({
    url: '/back/sys-server-middleware/del',
    method: 'post',
    data
  })
}
