module.exports = {
    fetchProcesses: async(persist, options) => {
        return await persist.select("*").from("process")
            .modify((builder) => {
                if (options) {
                    const { workflow_id, batch } = options;
                    if (batch) {
                        builder.limit(batch);
                    }
                    if (workflow_id) {
                        builder.where({ "workflow_id": workflow_id });
                    }
                }
            });
    },
    fetchProcessState: async(persist, options) => {
        return await persist.select("*").from("process_state")
            .modify((builder) => {
                if (options) {
                    const { process_id, id, node_id } = options;
                    if (id) {
                        builder.where({ "id": id });
                    }
                    if (node_id) {
                        builder.where({ "node_id": node_id });
                    }
                    if (process_id) {
                        builder.where({ "process_id": process_id });
                    }
                }
            });
    },
}