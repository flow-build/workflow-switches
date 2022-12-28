const {
    LoggerService
} = require("../logger");
const logger = LoggerService.getInstance();

const healthCheck = async (ctx, next) => {
    logger.info("called healthCheck");

    ctx.status = 200;
    ctx.body = `OK`;

    return next();
};

module.exports = {
    healthCheck,
};
  