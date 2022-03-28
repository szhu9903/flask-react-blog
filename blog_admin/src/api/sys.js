import service from "../utils/service";

const getBlogTag = async () => {
  return await service.get("/v3/blogtag/");
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
  getMenu,
  uploadImg,
};
