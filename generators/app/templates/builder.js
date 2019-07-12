const path = require("path");
module.exports = {
    type: "application-server",
    authorizedPrerelease: "true",

    gulpTasks: function (gulp, project, conf, helper) {},
    externalModules: {
        enabled: false,
        directories: []
    },
    config: {
        autoGenerateIndex: false,
        routesDirs: ["." + path.sep + "routes"],
    }
};