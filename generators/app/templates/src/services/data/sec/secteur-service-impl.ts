import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { SecteurService } from "src/services/data/sec/secteur-service";
import { SecteursDAO } from "src/dao/secteurs-dao";
import { SecteurMetier } from "src/models/adm/sec-mod";
import { BusinessError } from "hornet-js-utils/src/exception/business-error";

const logger: Logger = Utils.getLogger("<%= slugify(appname) %>.services.adm.secteur-service-data-impl");

/**
 * Implementation des services pour les secteurs
 * @class
 * @extends {SecteurService}
 */
export class SecteurServiceImpl extends SecteurService {

    private secteursDAO: SecteursDAO = new SecteursDAO();

    lister(): Promise<Array<SecteurMetier>> {
        return this.secteursDAO.listerSecteurs();
    }

    modifier(data: SecteurMetier): Promise<any> {
        let obj = {
            id: data.id,
            nom: data.nom,
            desc: data.desc
        };

        return this.secteursDAO.updateById(obj.id, obj);
    }

    creer(data): Promise<any> {
        let obj = {
            nom: data.nom,
            desc: data.desc,
            auteurCreat: data.user,
            auteurMaj: data.user
        };
        return new Promise<any>((resolve, reject) => {
            return this.secteursDAO.insert(obj).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    supprimer(data: SecteurMetier): Promise<any> {
        return this.secteursDAO.deleteById(data.id).catch((error) => {
            if (error.index == "fk_produit_secteur") {
                throw new BusinessError("ER-AD-ESE-07");
            } else {
                throw error;
            }
        });
    }

    supprimerMasse(data: SecteurMetier[]): Promise<any> {
        let ids: number[] = [];
        data.map((line: SecteurMetier) => {
            ids.push(line.id);
        });
        return this.secteursDAO.deleteById(ids).catch((error) => {
            if (error.index == "fk_produit_secteur") {
                throw new BusinessError("ER-AD-ESE-07");
            } else {
                throw error;
            }
        });
    }

    modifierSecteurs(): Promise<any> {
        return this.secteursDAO.getEntity().bulkCreate([]).then(() => {
            return this.secteursDAO.getEntity().update({
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
