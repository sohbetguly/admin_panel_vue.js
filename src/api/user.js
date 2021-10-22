import request from '@/utils/request'

export function checkSignup(data){
  console.log('2nd data' + data)
  return request({
    url: '/vue-element-admin/user/checkSignup',
    method: 'post',
    data
  })
}
export function signup(data) {
  return request({
    url: '/vue-element-admin/user/signup',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'get',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
