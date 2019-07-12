import { Logger } from "hornet-js-logger/src/logger";
import { SecteurService } from "src/services/data/sec/secteur-service";
import { SecteurDAO } from "src/dao/secteur-dao";
import { SecteurMetier } from "src/models/adm/sec-mod";
import { BusinessError } from "hornet-js-utils/src/exception/business-error";
import { Promise } from "hornet-js-utils/src/promise-api";

const logger: Logger = Logger.getLogger("<%= slugify(appname) %>.services.adm.secteur-service-data-impl");

/**
 * Implementation des services pour les secteurs
 * @class
 * @extends {SecteurService}
 */
export class SecteurServiceImpl extends SecteurService {

    private secteurDAO: SecteurDAO = new SecteurDAO();

    lister(): Promise<SecteurMetier[]> {
        return this.secteurDAO.listerSecteurs();
    }

    modifier(data: SecteurMetier): Promise<any> {
        const obj = {
            id: data.id,
            nom: data.nom,
            desc: data.desc};

        return this.secteurDAO.updateById(obj.id, obj);
    }

    creer(data): Promise<any> {
        const obj = {
            nom: data.nom,
            desc: data.desc,
            auteurCreat: data.user,
            auteurMaj: data.user};

        return new Promise<any>((resolve, reject) => {
            return this.secteurDAO.insert(obj).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    supprimer(data: SecteurMetier): Promise<any> {
        return this.secteurDAO.deleteById(data.id).catch((error) => {
            if (error.index === "fk_produit_secteur") {
                throw new BusinessError("ER-AD-ESE-07");
            } else {
                throw error;
            }
        });
    }

    supprimerMasse(data: SecteurMetier[]): Promise<any> {
        const ids: number[] = [];
        data.map((line: SecteurMetier) => {
            ids.push(line.id);
        });
        return this.secteurDAO.deleteById(ids).catch((error) => {
            if (error.index === "fk_produit_secteur") {
                throw new BusinessError("ER-AD-ESE-07");
            } else {
                throw error;
            }
        });
    }

    modifierSecteurs(): Promise<any> {
        return this.secteurDAO.entity.bulkCreate([]).then(() => {
            return this.secteurDAO.entity.update({
                desc: "secteur batch 2.0"
            }, {
                    where: {
                        desc: "secteur batch"
                    }
                }).spread((affectedCount, affectedRows) => {
                    logger.log("affectedCount", affectedCount);
                });
        });
    }
}
