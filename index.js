const router = require("./src/routers");
const { db_wf, db_sw } = require("./src/utils/db");
const { setPersist } = require("./src/middlewares/persist");
const { startInspectionPooling } = require("./src/pooling");

module.exports = {
  router,
  setPersist,
  workflowPersist: db_wf, 
  switchPersist: db_sw,
  startInspectionPooling
};
