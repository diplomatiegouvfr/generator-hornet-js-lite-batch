/**
 * Interface des services pour les secteurs
 * @interface
 */
export abstract class SecteurService {
    abstract lister(): Promise<any>;

    abstract creer(secteur: any): Promise<any>;
}