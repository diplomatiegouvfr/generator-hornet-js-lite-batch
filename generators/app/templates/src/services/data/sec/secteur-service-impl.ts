import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { SecteurService } from "src/services/data/sec/secteur-service";
import { SecteursDAO } from "src/dao/secteurs-dao";
import { SecteurMetier } from "src/models/adm/sec-mod";

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
}
