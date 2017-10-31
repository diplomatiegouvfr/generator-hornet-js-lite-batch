import { Utils } from "hornet-js-utils";
import { Injector } from "hornet-js-core/src/inject/injector";

Injector.register("config", "config");

import { SecteurService } from "src/services/data/sec/secteur-service";
import { SecteurServiceImpl } from "src/services/data/sec/secteur-service-impl";


if (Utils.config.getOrDefault("mock.enabled", false)) {
    // Mock des serviceData
} else {
    Injector.register(SecteurService, SecteurServiceImpl);
}