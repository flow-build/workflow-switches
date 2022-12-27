const Ajv = require("ajv");
const ajv = new Ajv();

function matchConditions(opening_policy, process_states) {
    const validatePolicy = ajv.compile({
        type: 'object',
        properties: {
            error: { type: 'object' },
            result: { type: 'object' },
            status: { type: 'array', items: { type: 'string' }},
            failures: { type: 'integer' },
        },
        required: ['failures', 'status']
    });
    const is_policy_valid = validatePolicy(opening_policy);
    if(!is_policy_valid) {
        return false;
    }

    const {
        error: target_error,
        result: target_result,
        status: target_status,
    } = opening_policy

    let failures = 0;
    for(let state of process_states) {
        let has_failed = true;
        const {
            error,
            result,
            status
        } = state;

        // Validations must be `status && error && result`

        // Validates expected status
        if (!target_status.includes(status)) {
            has_failed = false;
        }

        // Validates expected error
        if (target_error) {
            const validate = ajv.compile(target_error);
            const error_match = validate(error);
            if(!error_match) {
                has_failed = false;
            }
        }

        // Validates expected result
        if (target_result) {
            const validate = ajv.compile(target_result);
            const result_match = validate(result);
            if(!result_match) {
                has_failed = false;
            }
        }

        if(has_failed) {
            failures+=1;
        }
    }

    

    if(failures > 0) {
        return true;
    }
    return false;
}

module.exports = {
    matchConditions
}