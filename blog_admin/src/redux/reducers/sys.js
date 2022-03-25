import { GET_BLOG_TAG, GET_MENU } from "../constants";

const initState = {
  blogTag: [],
  sysMenu: [],
}

export default function sys(preState=initState, action) {
  const { type, data } = action;

  switch (type) {
    case GET_BLOG_TAG:
      return {...preState, blogTag: data.data};
    
    case GET_MENU:
      return {...preState, sysMenu: data.data};
    default:
      return preState;
      
  }

}


