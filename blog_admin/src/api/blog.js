import service from '../utils/service'

// 获取文章列表
const getBlogList = async (param) => {
  return await service.get(`/v3/blog/?view=blog_LV&${param?param:""}`);
}
// 获取文章详情
const getBlogDetail = async (param) => {
  return await service.get(`/v3/blog/${param.id}/?view=blog_UV&depth_col=b_type,b_tag`);
}
// 获取文章评论
const getBlogComment = async (param) => {
  return await service.get(`/v3/blogcomment/?view=blog_comment_V&filter=bc_blogid=${param.id}`);
}
// 获取文章分类
const getBlogType = async (param) => {
  return await service.get(`/v3/blogtype/`);
}
// 添加文章评论
const addBlogComment = async (data) => {
  return await service.post(`/v3/blogcomment/`, data);
}
// 文章点赞(取消点赞) or 评论点赞(取消点赞)
const addBlogLikeLog = async (data) => {
  return await service.post(`/v3/bloglikelog/`, data);
}

export default {
  getBlogList,
  getBlogDetail,
  getBlogType,
  getBlogComment,
  addBlogComment,
  addBlogLikeLog,
}
