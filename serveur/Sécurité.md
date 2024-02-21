La 1ere etape de securite est la connexion a la base de donnees. Dans la version actuelle rien ne peux etre ecris dans la base de donnees l'utilisateur SQL utiliser n'a donc que les permissions de lecture de la base de donnees.

Lors de l'appelle de l'api des PHP filters verifie le type de variables passer (PHP validate). Ces filtres PHP servent à valider une donnée sans la modifier, et dans le cas où la valeur n'est pas valide, la valeur false est retournée et si aucune valeur n'existe

Les Dao utilise exclusivement des fonction prepares PHP avec l'option Bind param pour eviter les injections de code SQL dans les champs de valeur du coter client.

Ensuite les logements retourner par l'api passe au travers d'un object logement PHP. Le constructeur contient des filtres php sanitize qui permet de convertir la donnée pour s'assurer qu'elle contient toujours le format attendu.

sources : https://www.php.net/manual/en/mysqli.quickstart.prepared-statements.php et https://inforisque.fr/fiches-pratiques/securite-validation-PHP.php
