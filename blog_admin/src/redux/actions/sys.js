import api from "../../api";
import { GET_BLOG_TAG, GET_MENU, UPDATE_DATA } from "../constants";

// 获取网站技术标签
const getBlogTag = (param) => {
  return async (dispatch) => {
    const response = await api.sys.getBlogTag(param);
    dispatch({
      type: GET_BLOG_TAG,
      data: response.data,
    })
  }
}

// 获取菜单列表
const getMenu = () => {
  return async (dispatch) => {
    const response = await api.sys.getMenu();
    dispatch({
      type: GET_MENU,
      data: response.data,
    })
  }
}

// 通用更新
const updateData = (data) => ({type: UPDATE_DATA, data})

export default {
  getBlogTag,
  getMenu,
  updateData,
}

