import service from "../utils/service";

const getBlogTag = async () => {
  return await service.get("/v3/blogtag/");
}

export default {
  getBlogTag,
};
