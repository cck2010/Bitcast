import Knex from 'knex';
const KnexConfig = require("./knexfile");
export const knex = Knex(KnexConfig["development"]);