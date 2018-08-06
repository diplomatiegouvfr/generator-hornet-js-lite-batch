const path = require("path");
module.exports = {
    type: "application-server",
    authorizedPrerelease: "true",

    gulpTasks: function (gulp, project, conf, helper) {},
    externalModules: {
        enabled: false,
        directories: [
        ]
    },
    config: {
        routesDirs: ["." + path.sep + "routes"],
        /*typescript: {
            bin: __dirname + "/node_modules/build/typescript"
        },*/
        dev: {
            // dllEntry: {
            //     vendor: ["hornet-js-react-components", "hornet-js-components", "hornet-js-utils", "hornet-js-core", "hornet-js-bean"]
            // }
        }
    }
};