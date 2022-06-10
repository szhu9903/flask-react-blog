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
  getMenu,
  uploadImg,
};
