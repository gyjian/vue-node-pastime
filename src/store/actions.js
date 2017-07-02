import * as types from './mutations-type'
import { signinByUsername, fetchSignUser } from '../api/user'
import { postVideo, deleteVideoById } from '../api/video'

const actions = {
  // 用户登录
  [types.SIGNIN_BY_USERNAME] ({ commit, dispatch }, formInfo) {
    const username = formInfo.username.trim()
    return new Promise((resolve, reject) => {
      signinByUsername(username, formInfo.password).then((res) => {
        const data = res.data
        commit('SET_MESSAGE', data)
        // 后台有返回这个字段,success为ture
        if (data.success) {
          commit('SET_TOKEN', data.token)
          localStorage.setItem('vn-token', data.token)
          dispatch('FETCH_SIGNIN_USER')
          resolve(data.success)
        } else {
          // 为false的时候
          resolve(data.success)
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取登录用户信息
  [types.FETCH_SIGNIN_USER] ({commit, state}) {
    fetchSignUser().then(res => {
      const data = res.data
      commit('SET_SIGNIN_USER', data)
    })
  },
   // 发布视频
  [types.POST_VIDEO] (state, postData) {
    return postVideo(postData)
  },
  // 通过videoid删除对应视频
  [types.DELETE_VIDEO_BY_ID] ({commit, state}, id) {
    return deleteVideoById(id)
  }
}

export default actions
