import service from "../utils/service";

// 获取文章标签
const getBlogTag = async (param) => {
  return await service.get(`/v3/blogtag/?${param ? param : ""}`);
}
// 添加文章标签
const addBlogTag = async (data) => {
  return await service.post(`/v3/blogtag/`, data);
}
// 修改文章标签
const modifyBlogTag = async (param, data) => {
  return await service.put(`/v3/blogtag/${param.id}/`, data);
}
// 删除文章标签
const delBlogTag = async (param) => {
  return await service.delete(`/v3/blogtag/${param.id}/`);
}

// 获取角色
const getSysRole = async (param) => {
  return await service.get(`/v3/sysrole/?${param ? param : ""}&depth_col=r_purview,r_menu`);
}
// 添加文章标签
const addSysRole = async (data) => {
  return await service.post(`/v3/sysrole/`, data);
}
// 修改文章标签
const modifySysRole = async (param, data) => {
  return await service.put(`/v3/sysrole/${param.id}/`, data);
}
// 删除文章标签
const delSysRole = async (param) => {
  return await service.delete(`/v3/sysrole/${param.id}/`);
}

// 获取角色
const getSysPurview = async (param) => {
  return await service.get(`/v3/syspurview/?${param ? param : ""}`);
}

// 获取角色
const getSysMenu = async (param) => {
  return await service.get(`/v3/sysmenu/?${param ? param : ""}`);
}

// 获取菜单配置
const getMenu = async () => {
  return await service.get(`/v2/usermenu/`);
}
// 上传文章图片
const uploadImg = async (params) => {
  let config = {
    headers: {"Content-Type": "multipart/form-data"}
  }
  let response = await service.post('/v2/upload/img/', params, config);
  console.log(response.data);
  return response.data.data.link_url;
}

export default {
  getBlogTag,
  addBlogTag,
  modifyBlogTag,
  delBlogTag,

  getSysRole,
  addSysRole,
  modifySysRole,
  delSysRole,

  getSysPurview,
  getSysMenu,

  getMenu,
  uploadImg,
};
