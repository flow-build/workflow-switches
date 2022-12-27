/* eslint-disable no-unused-vars */
exports.up = function (knex, Promise) {
    return knex.schema.createTable("switch_policy", (table) => {
      table.uuid("id").primary();
      table.timestamp("created_at").notNullable();
      table.boolean("active").notNullable();
      table.uuid("workflow_id").notNullable();
      table.varchar("node_id").notNullable();
      table.jsonb("opening_policy").notNullable();
      table.jsonb("closing_policy").notNullable();
    });
  };
  
  exports.down = function (knex, Promise) {
    return knex.schema.dropTable("switch_policy");
  };
  