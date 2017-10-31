import Bean from "hornet-js-bean/src/decorators/Bean";
import Map from "hornet-js-bean/src/decorators/Map";

@Bean
export class SecteurMetier {
    @Map()
    id: number;
    @Map()
    nom: string;
    @Map()
    desc: string;
    @Map()
    dateCreat: Date;
    @Map()
    auteurCreat: string;
    @Map()
    dateMajEnreg: Date;
    @Map()
    auteurMaj: string;
    @Map()
    dateSupEnreg: Date;
    @Map()
    auteurSupEnreg: string;

    constructor(nom: string, description: string) {
        this.nom = nom;
        this.desc = description;
    }
}

