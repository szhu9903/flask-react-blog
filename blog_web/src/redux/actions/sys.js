import api from "../../api";
import { GET_BLOG_TAG } from "../constants";

// 获取网站技术标签
const getBlogTag = () => {
  return async (dispatch) => {
    const response = await api.sys.getBlogTag();
    dispatch({
      type: GET_BLOG_TAG,
      data: response.data,
    })
  }
}

export default {
  getBlogTag,
}

