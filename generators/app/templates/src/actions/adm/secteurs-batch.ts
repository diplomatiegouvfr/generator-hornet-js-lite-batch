import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { SecteurService } from "src/services/data/sec/secteur-service";
import { SecteurMetier } from "src/models/adm/sec-mod";
import { ServiceReader } from "hornet-js-batch/src/core/reader/service-reader";
import { ResultBatch } from "hornet-js-batch/src/result/result-batch";
import { RouteActionBatch } from "hornet-js-batch/src/routes/abstract-batch-routes";

const logger: Logger = Utils.getLogger("<%= slugify(appname) %>.actions.adm.secteurs-batch");

export class CreerSecteurBatch extends RouteActionBatch<any, SecteurService> {
    execute(): Promise<ResultBatch> {
        logger.trace("ACTION CreerSecteurBatchornet-js-batch/src/core/reader/service-reader");

        let unit = this.getNewBatchUnit("CreerSecteurBatch", SecteurMetier)
            .reader(new ServiceReader(this.getService().lister, this))
            .transform((result: Array<any>) => {
                result.forEach((value, index) => {
                    value.desc += "test";
                });
                return result;
            })
            .foreach(this.getService().creer, this)
            .run();

        return unit.then((result) => {
            return new ResultBatch({data: result});
        });
    }
}
