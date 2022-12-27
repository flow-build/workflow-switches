const Koa = require("koa");
const cors = require("koa2-cors");
const { db_wf, db_sw } = require("./utils/db");
const router = require("./routers/index");
const { setPersist } = require("./middlewares/persist");

const startServer = (port) => {
  const app = new Koa();
  const corsOptions = {
    origin: "*",
    allowMethods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowHeaders: ["Content-Type", "Authorization", "Accept", "x-duration", "x-secret"],
  };
  app.use(cors(corsOptions));
  app.use(setPersist(db_wf, db_sw));

  app.use(
    router({
      corsOptions,
      middlewares: [],
    }).routes()
  );

  return app.listen(port, function () {
    console.info("Flowbuild API Server running");
  });
};

module.exports = {
  startServer,
};
