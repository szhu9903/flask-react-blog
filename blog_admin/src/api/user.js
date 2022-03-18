import service from '../utils/service'

// 用户登录
const blogLogin = async (data) => {
  return await service.post(`/v2/login/`, data);
}

// 登录github授权
const getGitHubUser = async (code) => {
  return await service.get(`/v2/callback/github/?code=${code}`);
}

export default {
  blogLogin,
  getGitHubUser,
}


