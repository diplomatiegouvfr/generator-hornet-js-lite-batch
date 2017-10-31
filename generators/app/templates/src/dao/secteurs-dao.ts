import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { EntityDAO } from "src/dao/entity-dao";
import { SecteurMetier } from "src/models/adm/sec-mod";
import Map from "hornet-js-bean/src/decorators/Map";

const logger: Logger = Utils.getLogger("<%= slugify(appname) %>.src.dao.secteurs-dao");

export class SecteursDAO extends EntityDAO {

    constructor() {
        super();
    }

    @Map(SecteurMetier)
    listerSecteurs(): Promise<Array<SecteurMetier>> {
        return this.modelDAO.secteurEntity.findAll();
    }

    insert(data) {
        data.dateCreat = new Date();
        data.dateMajEnreg = new Date();
        return this.modelDAO.secteurEntity.create(data);
    }

}
