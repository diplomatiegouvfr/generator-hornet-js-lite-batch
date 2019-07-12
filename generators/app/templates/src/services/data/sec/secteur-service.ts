import { SecteurMetier } from "src/models/adm/sec-mod";
import { Promise } from "hornet-js-utils/src/promise-api";

/**
 * Interface des services pour les secteurs
 * @interface
 */
export abstract class SecteurService {
    abstract lister(): Promise<any>;

    abstract supprimer(data: SecteurMetier): Promise<any>;

    abstract supprimerMasse(data: SecteurMetier[]);

    abstract creer(secteur: any): Promise<any>;

    abstract modifier(data: SecteurMetier): Promise<any>;

    abstract modifierSecteurs(): Promise<any>;
}