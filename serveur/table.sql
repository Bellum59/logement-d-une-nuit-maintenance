CREATE TABLE `reservation`(
    `idReservation` INT(4) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `idLogement` INT(4),
    `dateDebutReservation` DATE,
    `dateFinReservation` DATE,
    `nomReservation` VARCHAR(255),
    `prenomReservation` VARCHAR(255),
    `emailReservation` VARCHAR(255)
)

ALTER TABLE `reservation`
ADD FOREIGN KEY (`idLogement`) REFERENCES `logement`(`id`);