import { Utils } from "hornet-js-utils";
import { Logger } from "hornet-js-utils/src/logger";
import { HornetGenericDAO } from "hornet-js-database/src/sequelize/hornet-generic-dao";
import { HornetSequelizeInstanceModel } from "hornet-js-database/src/sequelize/hornet-sequelize-attributes";
import { inject } from "hornet-js-core/src/inject/inject";
import { ModelDAO } from "src/dao/model-dao";
import { injectable } from "hornet-js-core/src/inject/injectable";
import { SecteurMetier } from "src/models/adm/sec-mod";
import Map from "hornet-js-bean/src/decorators/Map";
import * as Sequelize from "sequelize";

const logger: Logger = Utils.getLogger("<%= slugify(appname) %>.src.dao.secteur-dao");

@injectable()
export class SecteurDAO extends HornetGenericDAO<ModelDAO, HornetSequelizeInstanceModel<any>> {
    constructor(entity: string = "secteurEntity", @inject(ModelDAO) modelDAO?: ModelDAO) {
        super(modelDAO[entity], modelDAO);
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

    getEntity(): Sequelize.Model<any, any> {
        return this.entity;
    }

}
