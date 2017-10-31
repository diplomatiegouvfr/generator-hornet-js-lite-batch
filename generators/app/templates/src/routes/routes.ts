import { Injector } from "hornet-js-core/src/inject/injector";
import { AbstractRoutes, PUBLIC_ROUTE, DataRouteInfos } from "hornet-js-core/src/routes/abstract-routes";
import { CreerSecteurBatch } from "src/actions/adm/secteurs-batch";
import { SecteurService } from "src/services/data/sec/secteur-service";

export class Routes extends AbstractRoutes {

    constructor() {
        super();

        this.addDataRoute("/secteurs/(\\d+)",
            (id) => new DataRouteInfos(CreerSecteurBatch, {id: id}, Injector.getRegistered(SecteurService)),
            PUBLIC_ROUTE,
            "get"
        );

    }



}
