import { Injector } from "hornet-js-core/src/inject/injector";
import { Scope } from "hornet-js-core/src/inject/injectable";

Injector.register("databaseConfigName", "config");

import { Utils } from "hornet-js-utils";
import { SecteurServiceImpl } from "src/services/data/sec/secteur-service-impl";
import { SecteurService } from "src/services/data/sec/secteur-service";

if (Utils.config.getOrDefault("mock.enabled", false)) {
    // Mock des serviceData

} else {
    Injector.register(SecteurService, SecteurServiceImpl, Scope.SINGLETON);
}


