CREATE TABLE UTILISATEUR (
    ID_UTILISATEUR SERIAL PRIMARY KEY
    , UTI_LOGIN VARCHAR(10) NOT NULL
    , UTI_PASSWORD VARCHAR(40) NOT NULL
    , UTI_ENABLED BOOLEAN DEFAULT FALSE NOT NULL );

CREATE TABLE ROLE (
    ID_ROLE SERIAL PRIMARY KEY
    , ROL_NOM VARCHAR(30) NOT NULL);

CREATE TABLE ROLE_UTILISATEUR (
    ID_ROLE INTEGER NOT NULL
    , ID_UTILISATEUR INTEGER NOT NULL
    , CONSTRAINT FK_ROLE_UTILISATEUR_U FOREIGN KEY(ID_UTILISATEUR) REFERENCES UTILISATEUR(ID_UTILISATEUR)
    , CONSTRAINT FK_ROLE_UTILISATEUR_R FOREIGN KEY(ID_ROLE) REFERENCES ROLE(ID_ROLE)
    , CONSTRAINT PK_ROLE_UTILISATEUR PRIMARY KEY(ID_ROLE, ID_UTILISATEUR));

CREATE TABLE SECTEUR (
    ID_SECTEUR SERIAL PRIMARY KEY
    , SEC_NOM VARCHAR(50)
    , SEC_DESCR VARCHAR(200)
    , SEC_DATE_CREAT timestamp
    , SEC_AUTEUR_CREAT VARCHAR(10)
    , SEC_DATE_MAJ timestamp
    , SEC_AUTEUR_MAJ VARCHAR(10)
    , SEC_DATE_SUPPR timestamp  NULL
    , SEC_AUTEUR_SUPPR VARCHAR(10) NULL);

COMMIT;