import { GET_BLOG_TAG } from "../constants";

const initState = {
  blogTag: []
}

export default function sys(preState=initState, action) {
  const { type, data } = action;

  switch (type) {
    case GET_BLOG_TAG:
      return {...preState, blogTag: data.data};
    
    default:
      return preState;
      
  }

}


