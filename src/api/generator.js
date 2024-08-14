import request from '@/utils/request.js'

export function paging(data) {
    return request({
        url: '/back/sys-generator/paging',
        method: 'post',
        data
    })
}
export function add(data) {
    return request({
        url: '/back/sys-generator/add',
        method: 'post',
        data
    })
}
export function edit(data) {
    return request({
        url: '/back/sys-generator/edit',
        method: 'post',
        data
    })
}
export function del(data) {
    return request({
        url: '/back/sys-generator/del',
        method: 'post',
        data
    })
}