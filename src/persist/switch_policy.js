const { v1: uuid } = require("uuid");

module.exports = {
    fetchSwitchPolicies: async(persist, options) => {
        return await persist.select("*").from("switch_policy")
                            .modify((builder) => {
                                if (options) {
                                    const { workflow_id, node_id } = options;
                                    if (workflow_id) {
                                        builder.where({ "workflow_id": workflow_id });
                                    }
                                    if (node_id) {
                                        builder.where({ "node_id": node_id });
                                    }
                                }
                            });
    },
    saveSwitchPolicy: async(persist, switch_policy) => {
        if(switch_policy.id) {
            try {
                await persist("switch_policy").update(switch_policy);
                return [switch_policy, 'success'];
            } catch(err) {
                return [null, 'error'];
            }    
        }
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