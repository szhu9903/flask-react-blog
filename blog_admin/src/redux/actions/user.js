import api from "../../api";
import { GET_BLOG_USER, UPDATE_DATA } from "../constants";


// 获取网站用户
const getBlogUser = (param) => {
  return async (dispatch) => {
    const response = await api.user.getBlogUser(param);
    dispatch({
      type: GET_BLOG_USER,
      data: response.data,
    })
  }
}

// 通用更新
const updateData = (data) => ({type: UPDATE_DATA, data})

export default {
  getBlogUser,
  updateData,
}

