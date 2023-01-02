const { 
  fetchSwitchPolicies,
  saveSwitchPolicy,
  removeSwitchPolicy
} = require("../persist/switch_policy");
const {
  LoggerService
} = require("../logger");
const logger = LoggerService.getInstance();

const readSwitchPolicies = async (ctx, next) => {
  logger.info("called readSwitchPolicies");

  const persist = ctx.state.persist_sw;
  const response = await fetchSwitchPolicies(persist);

  ctx.status = 200;
  ctx.body = response;

  return next();
};

const upsertSwitchPolicy = async (ctx, next) => {
  logger.info("called upsertSwitchPolicy");

  const switch_policy_data = ctx.request.body;
  const persist = ctx.state.persist_sw;

  const {
    workflow_name,
    node_id
  } = switch_policy_data
  
  let response, status;
  try {
    const [registered_switch_policy] = await fetchSwitchPolicies(persist, {
      workflow_name,
      node_id
    });
    let register_data = {
      ...switch_policy_data
    };
    if(registered_switch_policy) {
      register_data = {
        ...registered_switch_policy,
        ...switch_policy_data
      }
    }
    ([response, status] = await saveSwitchPolicy(persist, register_data));
  } catch(err) {
    status = 500;
  }

  if(status === 'success') {
    ctx.status = 201;
    ctx.body = response;
    return next();
  }

  if(status === 'error') {
    ctx.status = 500;
    ctx.body = response;
    return next();
  }

  ctx.status = status;
  return next();
};

const deleteSwitchPolicy = async (ctx, next) => {
  const switch_id = ctx.request.params.id;
  logger.info(`called deleteSwitchPolicy on ID: ${switch_id}`);

  const persist = ctx.state.persist_sw;
  
  let response, status;
  try {
    ([response, status] = await removeSwitchPolicy(persist, { id: switch_id }));
  } catch(err) {
    status = 500;
  }

  if(status === 'success') {
    ctx.status = 204;
    ctx.body = response;
    return next();
  }

  if(status === 'error') {
    ctx.status = 500;
    ctx.body = response;
    return next();
  }

  ctx.status = status;
  return next();
};

module.exports = {
    readSwitchPolicies,
    upsertSwitchPolicy,
    deleteSwitchPolicy
};
