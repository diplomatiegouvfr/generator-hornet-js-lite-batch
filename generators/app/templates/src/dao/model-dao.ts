import * as Sequelize from "sequelize";
import { injectable, Scope, Side } from "hornet-js-core/src/inject/injectable";
import { HornetSequelizeModel } from "hornet-js-database/src/sequelize/hornet-sequelize-model";
import { inject } from "hornet-js-core/src/inject/inject";

import { SecteurModel } from "src/models/adm/seq-sec-mod";
import { Entity } from "hornet-js-database/src/decorators/dec-seq-entity";

@injectable(ModelDAO, Scope.SINGLETON, Side.SERVER)
export class ModelDAO extends HornetSequelizeModel {

    @Entity("secteur", SecteurModel)
    public secteurEntity: Sequelize.Model<any, any>;

    constructor(@inject("configApplitutoDatabase")conf?: string) {
        super(conf);
    }

}
