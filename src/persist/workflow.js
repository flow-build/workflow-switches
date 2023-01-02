
module.exports = {
    fetchWorkflowByName: async(persist, options) => {
        return await persist.select("*").from("workflow")
                            .orderBy("version", "desc").first()
                            .modify((builder) => {
                                if (options) {
                                    const { name } = options;
                                    if (name) {
                                        builder.where({ "name": name });
                                    }
                                }
                            });
    },
}