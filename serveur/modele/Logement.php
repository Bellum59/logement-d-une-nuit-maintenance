<?php

class Logement
{
    public ?int $id;
    public ?string $nom;
    public ?string $description;
    public ?string $image;
    public ?string $ville;
    public ?string $province;
    public ?string $codePostal;
    public ?string $pays;
    public ?float $lattitude;
    public ?float $longitude;
    public ?float $prix;

    private static array $filter = [
        "id" => FILTER_SANITIZE_NUMBER_INT,
        "nom" => FILTER_SANITIZE_SPECIAL_CHARS,
        "description" => FILTER_SANITIZE_SPECIAL_CHARS,
        "image" => FILTER_SANITIZE_SPECIAL_CHARS,
        "ville" => FILTER_SANITIZE_SPECIAL_CHARS,
        "province" => FILTER_SANITIZE_SPECIAL_CHARS,
        "codePostal" => FILTER_SANITIZE_SPECIAL_CHARS,
        "pays" => FILTER_SANITIZE_SPECIAL_CHARS,
        "lattitude" => FILTER_SANITIZE_NUMBER_FLOAT,
        "longitude" => FILTER_SANITIZE_NUMBER_FLOAT,
        "prix" => FILTER_SANITIZE_NUMBER_FLOAT
    ];

    public function __construct(array $array, bool $doitFiltrer = false)
    {
        if ($doitFiltrer) $array = filter_var_array($array, Logement::$filter);
        $this->id = $array["id"] ?? null;
        $this->nom = $array["nom"] ?? null;
        $this->description = $array["description"] ?? null;
        $this->image = $array["image"] ?? null;
        $this->ville = $array["ville"] ?? null;
        $this->province = $array["province"] ?? null;
        $this->codePostal = $array["codePostal"] ?? null;
        $this->pays = $array["pays"] ?? null;
        $this->lattitude = $array["lattitude"] ?? null;
        $this->longitude = $array["longitude"] ?? null;
        $this->prix = $array["prix"] ?? null;
    }
}
