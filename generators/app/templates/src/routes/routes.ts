import { Injector } from "hornet-js-core/src/inject/injector";
import { AbstractRoutes, PUBLIC_ROUTE, DataRouteInfos } from "hornet-js-core/src/routes/abstract-routes";
import { CreerSecteurBatch, DeleteAllSecteursByForEachBatch, GenererSecteurBatch, ModifierSecteurBatch,
    ModifierSecteurByForEachBatch,
    NettoyerSecteurBatch, SupprimerSecteurByForEachBatch } from "src/actions/adm/secteurs-batch";
import { SecteurService } from "src/services/data/sec/secteur-service";

export class Routes extends AbstractRoutes {
    constructor() {
        super();

        this.addDataRoute("/secteurs/(\\d+)",
            (id) => new DataRouteInfos(CreerSecteurBatch, { id: id }, Injector.getRegistered(SecteurService)),
            PUBLIC_ROUTE,
            "get"
        );

        this.addDataRoute("/secteurs/feeder",
            () => new DataRouteInfos(GenererSecteurBatch, {}, Injector.getRegistered(SecteurService)),
            PUBLIC_ROUTE,
            "get"
        );

        this.addDataRoute("/secteurs/cleaner",
            () => new DataRouteInfos(NettoyerSecteurBatch, {}, Injector.getRegistered(SecteurService)),
            PUBLIC_ROUTE,
            "get"
        );

        this.addDataRoute("/secteurs/cleanerAll",
            () => new DataRouteInfos(DeleteAllSecteursByForEachBatch, {}, Injector.getRegistered(SecteurService)),
            PUBLIC_ROUTE,
            "get"
        );

        this.addDataRoute("/secteurs/setter",
            () => new DataRouteInfos(ModifierSecteurBatch, {}, Injector.getRegistered(SecteurService)),
            PUBLIC_ROUTE,
            "get"
        );

        this.addDataRoute("/secteurs/setterForEach",
            () => new DataRouteInfos(ModifierSecteurByForEachBatch, {}, Injector.getRegistered(SecteurService)),
            PUBLIC_ROUTE,
            "get"
        );

        this.addDataRoute("/secteurs/cleanerForEach",
            () => new DataRouteInfos(SupprimerSecteurByForEachBatch, {}, Injector.getRegistered(SecteurService)),
            PUBLIC_ROUTE,
            "get"
        );

    }



}
