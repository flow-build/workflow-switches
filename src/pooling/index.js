const { db_wf, db_sw } = require("../utils/db");
const { matchConditions } = require("./match_policy");
const { fetchSwitches, saveSwitch } = require("../persist/switch");
const { fetchSwitchPolicies } = require("../persist/switch_policy");
const { fetchProcesses, fetchProcessState } = require("../persist/process");

const {
  LoggerService
} = require("../logger");
const logger = LoggerService.getInstance();

const { promisify } = require("util");
const sleep = promisify(setTimeout);

async function startInspectionPooling() {
    const wf_persist = db_wf;
    const sw_persist = db_sw;
    while(true) {
        logger.info("Starting Inspection Loop");

        const policies = await fetchSwitchPolicies(sw_persist);
        const opened_switches = await fetchSwitches(wf_persist, { active: true });

        logger.info(`Already Open Switches: ${opened_switches.length}`);

        const available_policies = [];
        for (let policy of policies) {
            const is_already_opened = opened_switches.find((op_sw) => 
                op_sw.workflow_id === policy.workflow_id && 
                op_sw.node_id === policy.node_id
            );
            if(!is_already_opened) {
                available_policies.push(policy);
            }
        }
        
        logger.info(`Policies to be evaluated: ${available_policies.length}`);

        for(let policy of available_policies) {
            const { id: policy_id, workflow_id, node_id, opening_policy, batch } = policy;
            logger.info(`Starting Inspection on policy: ${policy_id}, workflow_id: ${workflow_id}, node_id: ${node_id}`);

            logger.debug(`Policy ID: ${policy_id}, content: ${JSON.stringify(policy)}`);

            const processes = await fetchProcesses(wf_persist, { workflow_id, batch });
            logger.debug(`Policy ID: ${policy_id}, processes found: ${processes.length}`);

            const { failures: target_failures } = opening_policy;
            let failures = 0;
            for (let process of processes) {
                const { process_id } = process;
                const process_states = await fetchProcessState(wf_persist, { process_id, node_id });

                const has_matched_condition = matchConditions(opening_policy, process_states);

                if(has_matched_condition) {
                    failures+=1;
                }
            }

            logger.debug(`Policy ID: ${policy_id}, failures found: ${failures}`);

            if(failures >= target_failures) {
                logger.warn(`SWITCH MUST OPEN to due to policy: ${policy_id}`);
                
                const open_switch = {
                    created_at: new Date(),
                    opened_at: new Date(),
                    active: true,
                    workflow_id: workflow_id,
                    node_id: node_id,
                    opening_policy: policy.opening_policy,
                    closing_policy: policy.closing_policy,
                };
                await saveSwitch(wf_persist, open_switch);
                
                logger.warn(`SWITCH WAS OPENED due to policy: ${policy_id}`);
            }
            
            logger.info(`Finished Inspection on policy: ${policy_id}, workflow_id: ${workflow_id}, node_id: ${node_id}`);
            await sleep(1000);
        }
    
        await sleep(5000);
    }
}

module.exports = {
    startInspectionPooling
}