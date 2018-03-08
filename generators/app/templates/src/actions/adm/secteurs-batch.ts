import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { SecteurService } from "src/services/data/sec/secteur-service";
import { SecteurMetier } from "src/models/adm/sec-mod";
import { ServiceReader } from "hornet-js-batch/src/core/reader/service-reader";
import { ResultBatch } from "hornet-js-batch/src/result/result-batch";
import { RouteActionBatch } from "hornet-js-batch/src/routes/abstract-batch-routes";
import { DataReader } from "hornet-js-batch/src/core/reader/data-reader";

const logger: Logger = Utils.getLogger("<%= slugify(appname) %>.actions.adm.secteurs-batch");

export class CreerSecteurBatch extends RouteActionBatch<any, SecteurService> {
    execute(): Promise<ResultBatch> {
        logger.info("ACTION CreerSecteurBatchornet-js-batch/src/core/reader/service-reader");

        let unit = this.getNewBatchUnit("CreerSecteurBatch", SecteurMetier)
            .reader(new ServiceReader(this.getService().lister, this))
            .filter((item) => {
                return item.desc == "Batch";
            })
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
        })
    }
}

export class GenererSecteurBatch extends RouteActionBatch<any, SecteurService> {

    private secteurListe: SecteurMetier[] = [];

    execute(): Promise<ResultBatch> {
        logger.info("ACTION GenererSecteurBatch");

        let count: number = (this.req.query.count) ? this.req.query.count : 10;
        for(let i=0;i<count;i++) {
            this.secteurListe.push(new SecteurMetier("secteur"+i, "secteur batch"));
        }

        let unit = this.getNewBatchUnit("GenererSecteurBatch", SecteurMetier)
            .reader(new DataReader<SecteurMetier[]>(this.secteurListe, this))
            .foreach(this.getService().creer, this)
            .run();

        return unit.then((result) => {
            return new ResultBatch({data: result});
        })
    }
}

export class ModifierSecteurByForEachBatch extends RouteActionBatch<any, SecteurService> {

    execute(): Promise<ResultBatch> {
        logger.info("ACTION ModifierSecteurByForEachBatch");

        let unit = this.getNewBatchUnit("ModifierSecteurByForEachBatch", SecteurMetier)
            .reader(new ServiceReader(this.getService().lister, this))
            .filter((item) => {
                return item.desc == "secteur batch 2.0" || item.desc == "secteur batch";
            })
            .transform((result: Array<any>) => {
                result.forEach((item, index) => {
                    item.desc += "secteur batch 2.0";
                });
                return result;
            })
            .foreach(this.getService().modifier, this)
            .run();

        return unit.then((result) => {
            return new ResultBatch({data: result});
        })
    }
}

export class SupprimerSecteurByForEachBatch extends RouteActionBatch<any, SecteurService> {

    execute(): Promise<ResultBatch> {
        logger.info("ACTION SupprimerSecteurByForEachBatch");

        let unit = this.getNewBatchUnit("SupprimerSecteurByForEachBatch", SecteurMetier)
            .reader(new ServiceReader(this.getService().lister, this))
            .filter((item) => {
                return item.desc == "secteur batch 2.0" || item.desc == "secteur batch";
            })
            .foreach(this.getService().supprimer, this)
            .run();

        return unit.then((result) => {
            return new ResultBatch({data: result});
        })
    }
}

export class NettoyerSecteurBatch extends RouteActionBatch<any, SecteurService> {

    execute(): Promise<ResultBatch> {
        logger.info("ACTION NettoyerSecteurBatch");

        let unit = this.getNewBatchUnit("NettoyerSecteurBatch", SecteurMetier)
            .reader(new ServiceReader(this.getService().lister, this))
            .filter((item) => {
                return item.desc == "secteur batch 2.0" || item.desc == "secteur batch";
            })
            .call(this.getService().supprimerMasse, this)
            .run();

        return unit.then((result) => {
            return new ResultBatch({data: result});
        })
    }
}

export class DeleteAllSecteursByForEachBatch extends RouteActionBatch<any, SecteurService> {

    execute(): Promise<ResultBatch> {
        logger.info("ACTION DeleteAllSecteursByForEachBatch");

        let unit = this.getNewBatchUnit("DeleteAllSecteursByForEachBatch", SecteurMetier)
            .reader(new ServiceReader(this.getService().lister, this))
            .foreach(this.getService().supprimer, this)
            .run();

        return unit.then((result) => {
            return new ResultBatch({data: result});
        })
    }
}

export class ModifierSecteurBatch extends RouteActionBatch<any, SecteurService> {

    execute(): Promise<ResultBatch> {
        logger.info("ACTION ModifierSecteurBatch");

        let unit = this.getNewBatchUnit("ModifierSecteurBatch", SecteurMetier)
            .call(this.getService().modifierSecteurs, this)
            .run();

        return unit.then((result) => {
            return new ResultBatch({data: result});
        });
    }
}