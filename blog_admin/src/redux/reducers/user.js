import { GET_BLOG_USER, UPDATE_DATA } from "../constants";

const initState = {
  blogUserList: [],
  blogUserDetail:{},
  blogUserTotalSize: null,
  isOperateUser: false,     // 添加修改用户页面标志
}

export default function sys(preState=initState, action) {
  const { type, data } = action;

  switch (type) {
    case GET_BLOG_USER:
      return {...preState, blogUserList: data.data, blogUserTotalSize: data.total_count};
    
    case UPDATE_DATA:
      return {...preState, ...data}

    default:
      return preState;
      
  }

}


