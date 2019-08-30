import request from '@/utils/request'

 /**
 * GET
 */
export function getUser() {
  return request({
    url: '',
    method: 'GET'
  })
}

/**
 * POST
 */
export function postUser() {
  return request({
    url: '/user',
    method: 'POST'
  })
}