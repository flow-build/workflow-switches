const { startInspectionPooling } = require('../../src/pooling');
const { fetchSwitches, saveSwitch } = require("../../src/persist/switch");
const { fetchSwitchPolicies } = require("../../src/persist/switch_policy");
const { fetchProcesses, fetchProcessState } = require("../../src/persist/process");

jest.mock('../../src/persist/switch.js', () => {
    return {
        fetchSwitches: jest.fn(() => Promise.resolve([])),
        saveSwitch: jest.fn(() => Promise.resolve())
    }
});

let switch_policy_mocks = [
    { 
        id: 'switch_policy_id',
        workflow_id: 'workflow_id',
        node_id: 'node_id',
        opening_policy: {
            status: ['error'],
            error: { type: 'object', properties: { testKey: { type: 'string' } } },
            result: { type: 'null' },
            batch: 5,
            failures: 2,
        },
        closing_policy: {}
    }
];
jest.mock('../../src/persist/switch_policy.js', () => {
    return {
        fetchSwitchPolicies: jest.fn(() => Promise.resolve(switch_policy_mocks)),
    }
});

let process_mocks = [
    { 
        id: 'process_id',
    }
];
let process_state_mocks = [
    { 
        id: 'process_state_id',
        node_id: 'node_id',
        status: 'error',
        result: null,
        error: { testKey: 'testValueString' },
    }
];
jest.mock('../../src/persist/process.js', () => {
    return {
        fetchProcesses: jest.fn(() => Promise.resolve(process_mocks)),
        fetchProcessState: jest.fn(() => Promise.resolve(process_state_mocks)),
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

it('should fetch process for available policy', async() => {
    const res = await startInspectionPooling({ iterations: 1 });

    expect(res).toBeTruthy();
    expect(fetchSwitches).toHaveBeenCalledTimes(1);
    expect(fetchSwitchPolicies).toHaveBeenCalledTimes(1);

    expect(fetchProcesses).toHaveBeenCalledTimes(1);
    expect(fetchProcessState).toHaveBeenCalledTimes(1);
    expect(saveSwitch).toHaveBeenCalledTimes(0);
});

it('should work until saveSwitch', async() => {
    // adding extra process to fail. Target Failures is '2' on opening_policy
    process_mocks.push({
        id: 'second_process_id',
    });
    const res = await startInspectionPooling({ iterations: 1 });

    expect(res).toBeTruthy();
    expect(fetchSwitches).toHaveBeenCalledTimes(1);
    expect(fetchSwitchPolicies).toHaveBeenCalledTimes(1);

    expect(fetchProcesses).toHaveBeenCalledTimes(1);
    expect(fetchProcessState).toHaveBeenCalledTimes(2);
    expect(saveSwitch).toHaveBeenCalledTimes(1);
});