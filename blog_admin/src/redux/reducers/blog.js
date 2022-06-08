import { GET_BLOG_COMMENT, GET_BLOG_DETAIL, GET_BLOG_LIST, GET_BLOG_RECOMMEND, UPDATE_IS_REPLAY, CLEAR_BLOG_LIST, GET_BLOG_TYPE, UPDATE_IS_OPERATE_BLOG, UPDATE_DATA } from '../constants'

const initState = {
  blogList: [],
  blogDetail: {},
  blogTotalSize: null,
  blogType: [],
  blogTypeDetail: {},
  blogTypeTotalSize: null,
  blogRecommend: [],
  isOperateBlog: false, // 添加修改文章
  isOperateBlogType: false, // 添加修改文章分类
  blogComment: [],
  showReplay: {
    replayId: 0,
    isShow: 1,
  },
}

export default function blog(preState=initState, action) {
  const { type, data } = action;
  switch (type) {
    
    case GET_BLOG_LIST:
      return {...preState, blogList: data.data, blogTotalSize: data.total_count};
    
    case GET_BLOG_TYPE:
      return {...preState, blogType: data.data, blogTypeTotalSize: data.total_count};
    
    case GET_BLOG_RECOMMEND:
      return {...preState, blogRecommend: data.data};
    
    case GET_BLOG_DETAIL:
      return {...preState, blogDetail: data.data?data.data[0]:{}};

    case GET_BLOG_COMMENT:
      return {...preState, blogComment: data.data};
  
    case UPDATE_IS_REPLAY:
      let isShow = 1;
      if (data.id === preState.showReplay.replayId){
        isShow = !preState.showReplay.isShow;
      }
      return {...preState, showReplay:{replayId:data.id, isShow}};
    
    case CLEAR_BLOG_LIST:
      return {...preState, blogList: [], blogTotalSize: null};
    
    case UPDATE_IS_OPERATE_BLOG:
      return {...preState, isOperateBlog: data.isOperateBlog, blogDetail: {}};
    
    case UPDATE_DATA:
      return {...preState, ...data}


    default:
      return preState;
  }
}

