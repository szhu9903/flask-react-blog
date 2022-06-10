import { type } from '@testing-library/user-event/dist/type';
import api from '../../api'
import {CLEAR_BLOG_LIST, GET_BLOG_COMMENT, GET_BLOG_DETAIL, GET_BLOG_LIST, GET_BLOG_RECOMMEND, GET_BLOG_TYPE, UPDATE_IS_OPERATE_BLOG, UPDATE_IS_REPLAY, UPDATE_DATA} from '../constants'

// 获取文章列表 action
const getBlogList = (param) => {
  return async (dispatch) => {
    const response = await api.blog.getBlogList(param);
    dispatch({
      type: GET_BLOG_LIST,
      data: response.data,
    })
  }
}

// 获取推荐文章列表
const getBlogRecommend = (param) => {
  return async (dispatch) => {
    const response = await api.blog.getBlogList(param);
    dispatch({
      type: GET_BLOG_RECOMMEND,
      data: response.data,
    })
  }
}

// 清空文章列表
const clearBlogList = () => ({type: CLEAR_BLOG_LIST, data: null})

// 获取文章详情
const getBlogDetail = (param) => {
  return async (dispatch) => {
    const response = await api.blog.getBlogDetail(param);
    dispatch({
      type: GET_BLOG_DETAIL,
      data: response.data,
    })
  }
}

// 获取文章分类
const getBlogType = (param) => {
  return async (dispatch) => {
    const response = await api.blog.getBlogType(param);
    dispatch({
      type: GET_BLOG_TYPE,
      data: response.data,
    })
  }
}

// 获取文章评论
const getBlogComment = (param) => {
  return async (dispatch) => {
    const response = await api.blog.getBlogComment(param);
    dispatch({
      type: GET_BLOG_COMMENT,
      data: response.data,
    })
  }
}

// 更新评论是否打开
const updateIsReplay = (data) => ({type: UPDATE_IS_REPLAY, data});

// 更新文章操作框是否显示
const updateIsOperateBlog = (data) => ({type: UPDATE_IS_OPERATE_BLOG, data})

// 通用更新
const updateData = (data) => ({type: UPDATE_DATA, data})

export default {
  getBlogList,
  getBlogRecommend,
  getBlogDetail,
  getBlogType,
  getBlogComment,
  updateIsReplay,
  clearBlogList,
  updateIsOperateBlog,
  updateData,
}

