<?php
class BaseDeDonnees
{
    public $pdo;

	function __construct()
	{
		try
        {
            $dsn = $dsn = 'mysql:dbname=logementNuit;host=localhost';
            $usager = ''; //Mdp et username retirer pour version git
            $motdepasse = '';
            $this->pdo = new PDO($dsn, $usager, $motdepasse);
        }
        catch(PDOException $exception)
        {
            echo $exception->getMessage();
        }
	}

}

?>
