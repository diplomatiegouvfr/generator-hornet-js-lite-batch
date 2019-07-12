import { Logger } from "hornet-js-logger/src/logger";
import { Promise } from "hornet-js-utils/src/promise-api";
import { HornetGenericDAO } from "hornet-js-database/src/sequelize/hornet-generic-dao";
import { HornetSequelizeInstanceModel } from "hornet-js-database/src/sequelize/hornet-sequelize-attributes";
import { ModelDAO } from "src/dao/model-dao";
import { SecteurMetier } from "src/models/adm/sec-mod";
import Map from "hornet-js-bean/src/decorators/Map";
import { Injector } from "hornet-js-core/src/inject/injector";

const logger: Logger = Logger.getLogger("<%= slugify(appname) %>.src.dao.secteur-dao");

export class SecteurDAO extends HornetGenericDAO<ModelDAO, HornetSequelizeInstanceModel<any>> {
    constructor(entity: string = "secteurEntity") {
        super(Injector.getRegistered(ModelDAO)[entity], Injector.getRegistered(ModelDAO));
    }

    @Map(SecteurMetier)
    listerSecteurs(): Promise<SecteurMetier[]> {
        return this.entity.findAll();
    }

    updateById(id: number, data) {
        data.dateMajEnreg = new Date();
        return this.entity.update(data, { where: { id } });
    }

    insert(data) {
        data.dateCreat = new Date();
        data.dateMajEnreg = new Date();
        return this.entity.create(data);
    }

    deleteById(id: number | number[]) {
        return this.entity.destroy({ where: { id } });
    }

}
