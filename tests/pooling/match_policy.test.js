const { matchConditions } = require("../../src/pooling/match_policy");

it('should not match if policy is invalid', () => {
    const policy = {
        invalidObject: 'invalidObject'
    };
    const [ans, reason] = matchConditions(policy, []);
    expect(ans).toBeFalsy();
    expect(reason).toBe('invalid_policy')
});

it('should match with status', () => {
    const policy = {
        status: ['error'],
        failures: 1,
    };
    const [ans] = matchConditions(policy, [{status: 'error'}]);
    expect(ans).toBeTruthy();
});

it('should match with status, error and result', () => {
    const policy = {
        status: ['error'],
        error: {type: 'object', properties: { test: { type: 'string' }}},
        result: {type: 'null'},
        failures: 1,
    };
    const [ans] = matchConditions(policy, [{status: 'error', error: {test:'value'}, result: null}]);
    expect(ans).toBeTruthy();
});

it('should match if it only has status', () => {
    const policy = {
        status: ['error'],
        failures: 1,
    };
    const [ans] = matchConditions(policy, [{status: 'error'}]);
    expect(ans).toBeTruthy();
});