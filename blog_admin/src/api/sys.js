import service from "../utils/service";

const getBlogTag = async () => {
  return await service.get("/v3/blogtag/");
}

const getMenu = async () => {
  return await service.get(`/v2/usermenu/`);
}

export default {
  getBlogTag,
  getMenu,
};
