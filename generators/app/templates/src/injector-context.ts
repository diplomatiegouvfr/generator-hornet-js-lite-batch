import { Injector } from "hornet-js-core/src/inject/injector";

Injector.register("databaseConfigName", "config");

import { Utils } from "hornet-js-utils";
import { ModelDAO } from "src/dao/model-dao";
import { SecteurServiceImpl } from "src/services/data/sec/secteur-service-impl";
import { SecteurService } from "src/services/data/sec/secteur-service";

if (Utils.config.getOrDefault("mock.enabled", false)) {
    // Mock des serviceData

} else {
    Injector.register(ModelDAO, new ModelDAO() );
    Injector.register(SecteurService, SecteurServiceImpl);
}


