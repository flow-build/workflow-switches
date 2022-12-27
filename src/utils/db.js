require('dotenv-flow').config();
const knex = require("knex");
const knexConfig = require("../../knexfile");

const _wf_config = knexConfig[process.env.KNEX_ENV_WORKFLOW || "test"];
const _sw_config = knexConfig[process.env.KNEX_ENV_SWITCH || "test"];

module.exports = {
  db_config_wf: _wf_config,
  db_config_sw: _sw_config,
  db_wf: knex(_wf_config),
  db_sw: knex(_sw_config)
};
