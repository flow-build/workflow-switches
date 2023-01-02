const { startInspectionPooling } = require('../../src/pooling');
const { fetchSwitches } = require("../../src/persist/switch");
const { fetchSwitchPolicies } = require("../../src/persist/switch_policy");
const { fetchProcesses } = require("../../src/persist/process");

let switch_mocks = [
    { 
        id: 'switch_id',
        workflow_id: 'workflow_id',
        node_id: 'node_id'
    }
];
jest.mock('../../src/persist/switch.js', () => {
    return {
        fetchSwitches: jest.fn(() => Promise.resolve(switch_mocks))
    }
});

let switch_policy_mocks = [
    { 
        id: 'switch_id',
        workflow_id: 'workflow_id',
        node_id: 'node_id'
    }
];
jest.mock('../../src/persist/switch_policy.js', () => {
    return {
        fetchSwitchPolicies: jest.fn(() => Promise.resolve(switch_policy_mocks))
    }
});

let process_mocks = [
    { 
        id: 'process_id',
    }
];
jest.mock('../../src/persist/process.js', () => {
    return {
        fetchProcesses: jest.fn(() => Promise.resolve(process_mocks))
    }
});

let workflow_mock = {
    id: 'workflow_id',
    name: 'workflow_name'
};

jest.mock('../../src/persist/workflow.js', () => {
    return {
        fetchWorkflowByName: jest.fn(() => Promise.resolve(workflow_mock)),
    }
});

it('should filter already existing policies', async() => {
    const res = await startInspectionPooling({ iterations: 1 });

    expect(res).toBeTruthy();
    expect(fetchSwitches).toHaveBeenCalledTimes(1);
    expect(fetchSwitchPolicies).toHaveBeenCalledTimes(1);

    expect(fetchProcesses).toHaveBeenCalledTimes(0);
});