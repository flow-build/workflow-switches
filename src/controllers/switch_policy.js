const { 
  fetchSwitchPolicies,
  saveSwitchPolicy,
} = require("../persist/switch_policy");

const getSwitchPolicies = async (ctx, next) => {
  console.info("called fetchSwitchPolicies");

  const persist = ctx.state.persist_sw;
  const response = await fetchSwitchPolicies(persist);

  ctx.status = 200;
  ctx.body = response;

  return next();
};

const createSwitchPolicy = async (ctx, next) => {
  console.info("called createSwitchPolicy");

  const switch_policy_data = ctx.request.body;

  const persist = ctx.state.persist_sw;
  const [response, status] = await saveSwitchPolicy(persist, switch_policy_data);

  if(status === 'success') {
    ctx.status = 201;
    ctx.body = response;
  }

  return next();
};

module.exports = {
    getSwitchPolicies,
    createSwitchPolicy,
};
