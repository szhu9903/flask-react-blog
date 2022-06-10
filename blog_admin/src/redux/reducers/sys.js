import { GET_BLOG_TAG, GET_MENU, UPDATE_DATA } from "../constants";

const initState = {
  blogTag: [],
  blogTagDetail: {},
  blogTagTotalSize: null,
  isOperateBlogTag: false,
  sysMenu: [],
}

export default function sys(preState=initState, action) {
  const { type, data } = action;

  switch (type) {
    case GET_BLOG_TAG:
      return {...preState, blogTag: data.data, blogTagTotalSize: data.total_count};
    
    case GET_MENU:
      return {...preState, sysMenu: data.data};
    
    case UPDATE_DATA:
      return {...preState, ...data}

    default:
      return preState;
      
  }

}


