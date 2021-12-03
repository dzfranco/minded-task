import { config } from "./environment";
import { SequelizeModuleOptions } from "@nestjs/sequelize/dist/interfaces/sequelize-options.interface";

export const dbOptions: { [env: string]: SequelizeModuleOptions } = {
  dev: {
    dialect: "mysql",
    host: config.db.writeHost,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    autoLoadModels: true,
    sync: { force: false },
    define: {
      charset: "utf8",
      collate: "utf8_general_ci",
    },
    pool: {
      max: 30,
      min: 0,
      idle: 7500,
      acquire: 60000,
    },
  },
  test: {
    dialect: "mysql",
    host: config.db.writeHost,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    logging: false,
    autoLoadModels: true,
    sync: { force: false },
    pool: {
      max: 30,
      min: 0,
      idle: 7500,
      acquire: 60000,
    },
  },
  staging: {
    dialect: "mysql",
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    logging: false,
    autoLoadModels: true,
    replication: {
      write: { host: config.db.writeHost },
      read: [{ host: config.db.readHost0 }],
    },
    sync: {
      force: false,
      alter: false,
    },
    pool: {
      max: 30,
      min: 0,
      idle: 7500,
      acquire: 60000,
    },
  },
  production: {
    dialect: "mysql",
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    logging: false,
    autoLoadModels: true,
    replication: {
      write: { host: config.db.writeHost },
      read: [{ host: config.db.readHost0 }],
    },
    sync: {
      force: false,
      alter: false,
    },
  },
};

// WARNING: sync force should always be false on production
if (config.isProd && dbOptions.production.sync.force === true) {
  throw new Error("Forced sync is disabled in production");
}
