require('dotenv-flow').config();
const { startServer } = require("./app");
const { startInspectionPooling } = require("./pooling");

const port = process.env.PORT || 3333;

startInspectionPooling();
const server = startServer(port);

module.exports = server;
