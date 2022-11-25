import service from '../utils/service'

// 用户登录
const blogLogin = async (data) => {
  return await service.post(`/v2/login/`, data);
}

// 登录github授权
const getGitHubUser = async (code) => {
  return await service.get(`/v2/callback/github/?code=${code}`);
}

// 获取用户
const getBlogUser = async (param) => {
  return await service.get(`/v3/bloguser/?${param ? param : ""}&depth_col=u_role`);
}
// 添加用户
const addBlogUser = async (data) => {
  return await service.post(`/v3/bloguser/`, data);
}
// 修改用户
const modifyBlogUser = async (param, data) => {
  return await service.put(`/v3/bloguser/${param.id}/`, data);
}
// 删除用户
const delBlogUser = async (param) => {
  return await service.delete(`/v3/bloguser/${param.id}/`);
}


export default {
  blogLogin,
  getGitHubUser,
  getBlogUser,
  addBlogUser,
  modifyBlogUser,
  delBlogUser,
}


