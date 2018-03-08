const path = require("path");
module.exports = {
    type: "application-server",
    authorizedPrerelease: "false",

    gulpTasks: function (gulp, project, conf, helper) {},
    externalModules: {
        enabled: false,
        directories: [
        ]
    },
    config: {
        routesDirs: ["." + path.sep + "routes"],
        clientExclude: {
            dirs: [
                path.join("src","services","data")],
            filters: [
                path.join("src","services","data")+"/.*-data\.*"
            ]
        },
        typescript: {
            // bin: __dirname + "/node_modules/build/typescript"
        }
    }
};