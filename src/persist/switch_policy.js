const { v1: uuid } = require("uuid");

module.exports = {
    fetchSwitchPolicies: async(persist, options) => {
        return await persist.select("*").from("switch_policy")
                            .modify((builder) => {
                                if (options) {
                                    const { workflow_name, node_id } = options;
                                    if (workflow_name) {
                                        builder.where({ "workflow_name": workflow_name });
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
        const switch_data = {
            id: uuid(),
            created_at: new Date(),
            active: false,
            ...switch_policy,
        }
        try {
            await persist("switch_policy").insert(switch_data);
            return [switch_data, 'success'];
        } catch(err) {
            return [null, 'error'];
        }
    },
    removeSwitchPolicy: async(persist, { id: switch_id }) => {
        if(!switch_id) {
            return [null, 'error'];    
        }
        try {
            await persist("switch_policy").delete().where("id", switch_id);
            return [1, 'success'];
        } catch(err) {
            return [null, 'error'];
        }
    },
}