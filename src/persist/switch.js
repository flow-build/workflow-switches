const { v1: uuid } = require("uuid");

module.exports = {
    fetchSwitches: async(persist, options) => {
        return await persist.select("*").from("switch")
            .modify((builder) => {
                if (options) {
                    const { active } = options;
                    if (active) {
                        builder.where({ "active": active });
                    }
                }
            });
    },
    saveSwitch: async(persist, switch_) => {
        switch_.id = uuid();
        switch_.created_at = new Date();
        try {
            await persist("switch").insert(switch_); //must be changed to switch table once it's available
            return [switch_, 'success'];
        } catch(err) {
            return [null, 'error']
        }
    },
}