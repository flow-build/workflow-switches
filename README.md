# Switch Policies Manager

## Introduction

It runs inspection on workflow processes following registered policies.

Policy example:
```
{ 
    "workflow_id": "849bd430-861a-11ed-8859-89bed60910ac", 
    "node_id": "HTTP-REQUEST",
    "opening_policy": {
        "batch": 5,  
        "result": {"type": ["object"]}, 
        "error": {"type": ["null"]}, 
        "status": ["running"], 
        "failures": 1
    },
    "closing_policy": {
        "timeout": 5000, 
        "batch": 5,  
        "result": {"type": "string"}, 
        "status": "running", 
        "successes": 15
    }
}
```

The `opening_policy` field must have the conditions for 'opening the circuit' on the targeted processes.
The `closing_policy` field must have the conditions for enabling back the 'blocked' processes.

## Run the project

### localhost

You may run the docker-compose file with `docker-compose up --build`.
By default, it will run only a database with the switch_policy table.

To run the application, you may enable it on `docker-compose.yml` file:
```
 app:
     image: node:16.15.0
     env_file:
       - ./.env.docker
     restart: on-failure:10
     depends_on:
       - postgres
     ports:
       - 3000:3000
     volumes:
       - .:/usr/app
       - /usr/app/node_modules
     working_dir: /usr/app
     command: bash -c " npm install && npm audit fix && npm run migrations && npm run seeds && npm run start"
```

Besides switch database, you will need to run the workflow database.

### tests

Run:
```
npm run test
```