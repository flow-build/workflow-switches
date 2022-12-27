const { v1: uuid } = require("uuid");

module.exports = {
    fetchSwitchPolicies: async(persist) => {
        return await persist.select("*").from("switch_policy");
    },
    saveSwitchPolicy: async(persist, switch_policy) => {
        switch_policy.id = uuid();
        switch_policy.created_at = new Date();
        switch_policy.active = false;
        try {
            await persist("switch_policy").insert(switch_policy);
            return [switch_policy, 'success'];
        } catch(err) {
            return [null, 'error'];
        }
    },
}