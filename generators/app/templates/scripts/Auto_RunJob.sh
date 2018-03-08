#!/bin/sh
### ====================================================================== ###
##  Nom du script : Auto_RunJob.sh                                          ##
##  Version       : 1.0.2                                                   ##
##  Description   :  Lancement d'un batch associé                           ##
##                   à l'application <%= slugify(appname) %>.               ##
##   Parametres   : Param numero 1 : hostname du serveur                    ##
##                  Param numero 2 : port du serveur                        ##
##                  Param numero 3 : le nom du job devant etre declenche    ##
##                                                                          ##
##   Code retour  :  0 - execution reussie                                  ##
##                   1 - execution avec erreur majeure                      ##
##                   2 - execution avec erreur mineure                      ## 
##                                                                          ##
### ====================================================================== ###

# Temps en seconde entre les interrogations pour savoir si le traitement est fini
REFRESH_EVERY=20

echo debut
date +"%y/%m/%d_%H:%M:%S"

# Recuperation du repertoire contenant le script
DIRNAME=`dirname $0`

# USAGE
USAGE="Auto_RunJob.sh {Param 1 : hostname du serveur} {Param 2 : port du serveur} {Param 3 : Nom du job}"

# Le serveur d'applications web hebergeant l'instance
hostname=$1
if [ "x$hostname" = "x" ]
then
	echo Parametre hostname manquant !
	echo USAGE : $USAGE
	exit 1	
fi

# Le port d'ecoute de l'instance HTTP du serveur
port=$2
if [ "x$port" = "x" ]
then
	echo Parametre port manquant !
	echo USAGE : $USAGE
	exit 1	
fi

# Le nom du job devant etre declenche sur l'instance
job=$3
if [ "x$job" = "x" ]
then
	echo Parametre numero 3 manquant !
	echo USAGE : $USAGE
	exit 1	
fi


URL=http://$hostname:$port/<%= slugify(appname) %>/batch/$job
echo $URL
# Fichier qui contiendra le résultat de la requête URL.
mkdir -p $DIRNAME/resultat_$job
RESULT_HTTP=$DIRNAME/resultat_$job/response.json

# Définition des Mots clé
KEYWORD_SUCCESS=\"status\":\"OK\"
KEYWORD_RUNNING=\"code_retour\":\"-9999\"
KEYWORD_MINOR_ERROR=\"code_retour\":\"2\"
KEYWORD_MAJOR_ERROR=\"code_retour\":\"1\"

ENCOURS=1

#Invocation de l'URL permettant de déclencher le job
# Tant que le traitement est en attente, on reinterroge toutes les REFRESH_EVERY secondes
while [ $ENCOURS -eq 1 ]
do
	wget -O - "$URL" >  $RESULT_HTTP
	code_retour=$?
	if [ $code_retour -ne 0 ]; then
		echo Pb survenu lors de l\'execution de la commande WGET \(code retour $code_retour \)
		exit 1
	fi
	
	cmd=`grep -i  $KEYWORD_RUNNING $RESULT_HTTP`
	if [ "x$cmd" != "x" ]; then
		sleep $REFRESH_EVERY
	else
		ENCOURS=0
	fi
done

# Exploitation du resultat de la requete HTTP
cmd=`grep -i  $KEYWORD_SUCCESS $RESULT_HTTP`

if [ "x$cmd" != "x" ]; then
	CODE_RETOUR=0
else
	cmd=`grep -i $KEYWORD_MINOR_ERROR $RESULT_HTTP`
	if [ "x$cmd" != "x" ]; then	
	CODE_RETOUR=2
	else
		cmd=`grep -i $KEYWORD_MAJOR_ERROR $RESULT_HTTP`
		if [ "x$cmd" != "x" ]; then	
			CODE_RETOUR=1
		else
			CODE_RETOUR=1
		fi
	fi
fi

## Affichage du resultat
echo == RESULTAT DE LA REQUETE ==
cat $RESULT_HTTP 
echo == FIN RESULTAT DE LA REQUETE ==
echo =
## Suppression du fichier resultat
rm $RESULT_HTTP 

if [ $CODE_RETOUR -eq 0 ]; then
	echo "Execution reussie de l'appel de l'URL $URL" 
	status=0
elif [ $CODE_RETOUR -eq 1 ]; then
	echo "ERREUR MAJEURE survenue a l'issue de l'appel de l'URL $URL."
	status=1
elif [ $CODE_RETOUR -eq 2 ]; then
	echo "ERREUR MINEURE survenue a l'issue de l'appel de l'URL $URL"
	status=2
else
	echo "ERREUR survenue lors de l'execution de  de $commande (code retour = $status)"
	status=1
fi

echo ================================
echo =
echo = fin
date +"%y/%m/%d_%H:%M:%S"
echo =status=$status
echo =
echo ================================
exit $status
