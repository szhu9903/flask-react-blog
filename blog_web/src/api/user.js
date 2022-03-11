import service from '../utils/service'

// 登录github授权
const getGitHubUser = async (code) => {
  return await service.get(`/v2/callback/github/?code=${code}`);
}

export default {
  getGitHubUser,
}


