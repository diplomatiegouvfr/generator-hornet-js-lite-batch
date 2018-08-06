"use strict";
var fs = require("fs");
var path = require("path");
var Generator = require('yeoman-generator');
var crypto = require("crypto");
var slugify = require("slugify");
var isstring = require("lodash.isstring");
var yosay = require("yosay");

module.exports = Generator.extend({
    constructor: function () {
        Generator.apply(this, arguments);
        this.log(yosay("starting"));

        var pkg = require("../../package.json");
        this.fmkversion = pkg.version;

        this.argument("appname", {type: String, required: false});
        this.argument("appversion", {type: String, required: false});
        this.argument("appdescription", {type: String, required: false});
        this.argument("fmkversion", {type: String, required: false});
        this.argument("urlbatch", {type: String, required: false});
    },
    prompting: function () {

        var pkg = require("../../package.json"),
            prompts = [],
            defaultAppName = path.basename(process.cwd());

        var prompts = [];
        var _this = this;

        prompts.push({
            when: function () { // si le nom n'est pas fourni en paramètre de la commande
                return !_this.options.appname;
            },
            type: "input",
            name: "appname",
            message: "Nom de votre projet",
            default: this.appname || defaultAppName // Par défaut le nom du dossier
        });
        prompts.push({
            when: function () {
                return !_this.options.appversion;
            },
            type: "input",
            name: "appversion",
            message: "Version de votre projet",
            default: "1.0.0"
        });
        prompts.push({
            when: function () {
                return !_this.options.appdescription;
            },
            type: "input",
            name: "appdescription",
            message: "Description de votre projet",
            default: this.appdescription || defaultAppName
        });
        prompts.push({
            when: function () {
                return !_this.options.fmkversion;
            },
            type: "input",
            name: "fmkversion",
            message: "Version du framework (hornet-js)",
            default: pkg.version
        });
        prompts.push({
            when: function () {
                return !_this.options.urlbatch;
            },
            type: "input",
            name: "urlbatch",
            message: "ContextPath de la partie batch",
            default: "batch"
        });
        return this.prompt(prompts).then( function(answers) {

            if (!this.options.appname) {
                this._applyParam(answers, "appname", "appname");
            }else{
                this._applyOptions("appname", this.options.appname);
            }
            if (!this.options.appversion) {
                this._applyParam(answers, "appversion", "appversion");
            }else{
                this._applyOptions("appversion", this.options.appversion);
            }
            if (!this.options.appdescription) {
                this._applyParam(answers, "appdescription", "appdescription");
            }else{
                this._applyOptions("appdescription", this.options.appdescription);
            }
            if (!this.options.fmkversion) {
                this._applyParam(answers, "fmkversion", "fmkversion");
            }else{
                this._applyOptions("fmkversion", this.options.fmkversion);
            }
            if (!this.options.urlbatch) {
                this._applyParam(answers, "urlbatch", "urlbatch");
            }else{
                this._applyOptions("urlbatch", this.options.urlbatch);
            }
        }.bind(this));
    },
    writing: function () {
        var defaultConfig = {
            slugify: slugify,
            appname: this.appname,
            appversion: this.appversion,
            appdescription: this.appdescription,
            fmkversion: this.fmkversion,
            urlbatch: this.urlbatch
        };

        //builder.js
        this._copy("builder.js");

        //hbw.sh
        this._copy("hbw.sh", defaultConfig);

        //Jenkinsfile
        this._copy("Jenkinsfile", defaultConfig);

        //trigger-rundeck.js
        this._copy("trigger-rundeck.js", defaultConfig);

        //index.ts
        this._copy("index.ts");

        // package.json
        this._copy("_package.json", "package.json", defaultConfig);

        // .gitignore
        this._copy("gitignore", ".gitignore", defaultConfig);

        // npmignore
        this._copy("npmignore", ".npmignore", defaultConfig);

        // plopfile
        this._copy("plopfile.js", "plopfile.js", defaultConfig);

        // src
        this._writingSrc(defaultConfig);

        // test
        this._writingTest(defaultConfig);

        // config
        this._writingConfig(defaultConfig);

        this._writingPlopTemplate(defaultConfig);

        // database
        this._writingDataBase(defaultConfig);

        // environnement
        this._writingEnvironnement(defaultConfig);

        //scripts
        this._writingScripts(defaultConfig);

    },
    _writingEnvironnement: function (defaultConfig) {
        // configuration
        this._copy("environment/configuration/**", "environment/configuration/", defaultConfig);

        // templates
        this._copy("environment/templates/**", "environment/templates/", defaultConfig);

    },
    _writingScripts: function (defaultConfig) {
        // config
        this._copy("scripts/**", "scripts/", defaultConfig);

    },
    _writingDataBase: function (defaultConfig) {
        // config
        this._copy("database/**", "database/", defaultConfig);

    },
    _writingConfig: function (defaultConfig) {
        // config
        this._copy("config/**", "config/", defaultConfig);

        this._copy("tsconfig.json", "tsconfig.json", defaultConfig);

    },
    _writingSrc: function (defaultConfig) {

        // actions
        //this._copy("src/actions/cnt/gen-cnt-actions.ts", defaultConfig);
        this._copy("src/actions/**", "src/actions/", defaultConfig);

        // dao
        this._copy("src/dao/**", "src/dao/", defaultConfig);

        // models
        this._copy("src/models/**", "src/models/", defaultConfig);

        // routes
        this._copy("src/routes/**", "src/routes/", defaultConfig);

        // services
        this._copy("src/services/**", "src/services/", defaultConfig);

        // server
        this._copy("src/server.ts", defaultConfig);

        //injector-context.ts
        this._copy("src/injector-context.ts", defaultConfig);

        //README.md
        this._copy("README.md", defaultConfig);
    },
    _writingTest: function (defaultConfig) {
        // templates
        this._copy("test/**", "test/", defaultConfig);
    },
    _writingPlopTemplate: function (defaultConfig) {
        this._copy("plop-templates/**", "plop-templates/", defaultConfig);
    },
    _applyParam: function (answers, key, destkey) {
        var useDestKey = destkey || key;
        var answer = answers[key];
        if (!answer) {
            this.log(yosay("Aucune valeur pour : " + key));
        }
        this[useDestKey] = answer;
        this.config.set(useDestKey, answer);
    },
    _applyOptions: function (key, value) {
        this[key] = value;
        this.config.set(key, value);
    },
    /*
    _copyDir: function (path) {
        this.directory(path);
    },*/
    _copy: function (fromPath, toPath, config) {
        var copyFrom = fromPath, copyTo = toPath, conf = config;
        if (arguments.length === 1) {
            copyTo = copyFrom;
            conf = {};
        } else if (arguments.length === 2 && !isstring(config)) {
            copyTo = copyFrom;
            conf = toPath;
        }

        this.fs.copyTpl(
            this.templatePath(copyFrom),
            this.destinationPath(copyTo),
            conf
        );
    },
    _copySingle: function (fromPath, toPath) {
        var copyFrom = fromPath, copyTo = toPath;
        if (arguments.length === 1) {
            copyTo = copyFrom;
        }
        this.fs.copy(
            this.templatePath(copyFrom),
            this.destinationPath(copyTo)
        );
    },

    _random: function (length) {
        return crypto.randomBytes(length || 48).toString("hex");
    },

    install: function () {
        this.installDependencies({bower: false});
    }
});
