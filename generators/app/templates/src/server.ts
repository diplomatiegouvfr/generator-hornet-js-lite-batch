import { ServerConfiguration } from "hornet-js-core/src/server-conf";
import * as HornetServer from "hornet-js-core/src/server";
import { Routes } from "src/routes/routes";
import * as HornetMiddlewares from "hornet-js-core/src/middleware/middlewares";
import { Database } from "hornet-js-database/src/sequelize/database";
import { Injector } from "hornet-js-core/src/inject/injector";
import { DEFAULT_HORNET_BATCH_MIDDLEWARES } from "hornet-js-batch/src/middleware/middlewares";
import { HornetMiddlewareList } from "hornet-js-core/src/middleware/middlewares";

export class Server {

    static configure(): ServerConfiguration {

        let configServer: ServerConfiguration = {
            serverDir: __dirname,
            staticPath: null,
            appComponent: null,
            layoutComponent: null,
            errorComponent: null,
            defaultRoutesClass: new Routes(),
            sessionStore: null,
            routesLoaderPaths: ["src/routes/"],
            routesDataContext: "/<%= slugify(urlbatch) %>",
            internationalization: null,
            menuConfig: null,
            loginUrl: null,
            logoutUrl: null,
            welcomePageUrl: null,
            publicZones: []
        };

        return configServer;
    }

    static middleware(): HornetMiddlewareList {
        return new HornetMiddlewares.HornetMiddlewareList(DEFAULT_HORNET_BATCH_MIDDLEWARES);
    }

    static startApplication() {
        if (process.env.NODE_ENV !== "production") {
            let files;
            let databaseConfName = Injector.getRegistered("databaseConfigName");
            if (databaseConfName === "config") {
                files = ["database/01_createTablesSqlite.sql", "database/02_initDataSqlite.sql"];
            } else if (databaseConfName === "configPostgres") {
                files = ["database/01_createTablesPostgres.sql", "database/02_initDataPostgres.sql"];
            }
            Database.runScripts([{
                configName: databaseConfName,
                files: files
            }]).then(() => {
                Server.start();
            });
        } else {
            Server.start();
        }
    }

    static start() {
        let server = new HornetServer.Server(Server.configure(), Server.middleware());
        server.start();
    }
}
