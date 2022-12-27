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

const upsertSwitchPolicy = async (ctx, next) => {
  console.info("called upsertSwitchPolicy");

  const switch_policy_data = ctx.request.body;
  const persist = ctx.state.persist_sw;

  const {
    workflow_id,
    node_id
  } = switch_policy_data
  
  let response, status;
  try {
    const [registered_switch_policy] = await fetchSwitchPolicies(persist, {
      workflow_id,
      node_id
    });
    let register_data = switch_policy_data; 
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
  }

  return next();
};

module.exports = {
    getSwitchPolicies,
    upsertSwitchPolicy,
};
