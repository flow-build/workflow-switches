const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const switchPolicyController = require("../controllers/switch_policy");

module.exports = (opts = {}) => {
  const router = new Router();

  router.use(bodyParser());

  for (let middleware of opts.middlewares) {
    router.use(middleware);
  }

  const locks = new Router();
  locks.prefix("/switch");
  locks.get("/", switchPolicyController.readSwitchPolicies);
  locks.post("/", switchPolicyController.upsertSwitchPolicy);
  locks.delete("/:id", switchPolicyController.deleteSwitchPolicy);

  router.use(locks.routes());

  return router;
};
