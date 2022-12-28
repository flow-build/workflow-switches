require('dotenv').config();
const path = require("path");
const BASE_PATH = path.join(__dirname, "db");

module.exports = {
  test: {
    client: "pg",
    connection: {
      host: process.env.POSTGRES_HOST || "0.0.0.0",
      port: process.env.POSTGRES_PORT || "5432",
      user: process.env.POSTGRES_USER || "postgres",
      password: process.env.POSTGRES_PASSWORD || "postgres",
      database: process.env.POSTGRES_DATABASE || "switch",
    },
    migrations: {
      directory: path.join(BASE_PATH, "switch/migrations"),
    },
    seeds: {
      directory: path.join(BASE_PATH, "switch/seeds"),
    },
  },
  docker_local_switch: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: process.env.POSTGRES_PASSWORD || "postgres",
      database: "switch",
      port: 5433,
    },
    pool: {
      min: 0,
      max: 40,
      acquireTimeoutMillis: 60000,
      idleTimeoutMillis: 600000,
    },
    migrations: {
      directory: path.join(BASE_PATH, "switch/migrations"),
    },
    seeds: {
      directory: path.join(BASE_PATH, "switch/seeds"),
    },
  },
  docker_local_workflow: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: process.env.POSTGRES_PASSWORD || "postgres",
      database: "workflow",
      port: 5432,
    },
    pool: {
      min: 0,
      max: 40,
      acquireTimeoutMillis: 60000,
      idleTimeoutMillis: 600000,
    },
    migrations: {
      directory: path.join(BASE_PATH, "workflow/migrations"),
    },
    seeds: {
      directory: path.join(BASE_PATH, "workflow/seeds"),
    },
  },
  prod_workflow: {
    client: "pg",
    connection: {
      host: process.env.POSTGRES_WORKFLOW_HOST,
      port: process.env.POSTGRES_WORKFLOW_PORT,
      user: process.env.POSTGRES_WORKFLOW_USER,
      password: process.env.POSTGRES_WORKFLOW_PASSWORD,
      database: process.env.POSTGRES_WORKFLOW_DATABASE,
    },
    migrations: {
      directory: path.join(BASE_PATH, "workflow/migrations"),
    },
    seeds: {
      directory: path.join(BASE_PATH, "workflow/seeds"),
    },
  },
  prod_switch: {
    client: "pg",
    connection: {
      host: process.env.POSTGRES_SWITCH_HOST,
      port: process.env.POSTGRES_SWITCH_PORT,
      user: process.env.POSTGRES_SWITCH_USER,
      password: process.env.POSTGRES_SWITCH_PASSWORD,
      database: process.env.POSTGRES_SWITCH_DATABASE,
    },
    migrations: {
      directory: path.join(BASE_PATH, "switch/migrations"),
    },
    seeds: {
      directory: path.join(BASE_PATH, "switch/seeds"),
    },
  }
};
