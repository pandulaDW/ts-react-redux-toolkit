const rootPath = "/";
const sopRootPath = "sop";

const routes = {
  scrape: `${rootPath}`,
  dq: `${rootPath}dqtool`,
  concat: `${rootPath}concat`,
  sop: `${rootPath}sop`,
  analytics: `${rootPath}analytics`,
  sopSubRoutes: {
    PensionScheme: `${rootPath}${sopRootPath}/pension`,
    Trust: `${rootPath}${sopRootPath}/trust`,
    Company: `${rootPath}${sopRootPath}/company`,
    Charity: `${rootPath}${sopRootPath}/charity`,
    Funds: `${rootPath}${sopRootPath}/funds`,
    RAList: `${rootPath}${sopRootPath}/ralist`,
    ELFCode: `${rootPath}${sopRootPath}/elfcode`,
    OnHoldText: `${rootPath}${sopRootPath}/onholdtext`,
    Procedures: `${rootPath}${sopRootPath}/procedures`,
    ImportantRequestor: `${rootPath}${sopRootPath}/requesters`,
    ValidationDoc: `${rootPath}${sopRootPath}/validationdocs`,
  },
};

export default routes;
