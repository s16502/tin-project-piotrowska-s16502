CREATE SCHEMA IF NOT EXISTS `tin-s16502`;

CREATE TABLE IF NOT EXISTS `tin-s16502`.`Consultant`
    ( `consId` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `firstName` VARCHAR(50) NOT NULL ,
      `lastName` VARCHAR(50) NOT NULL ,
      `email` VARCHAR(50) NOT NULL ,
      `pass` VARCHAR(100) NOT NULL ,
      PRIMARY KEY (`consId`) ,
      UNIQUE INDEX `consId_UNIQUE` (`consId` ASC)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-s16502`.`Project`
    ( `projectId` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `name` VARCHAR(50) NOT NULL ,
      `date` DATETIME NOT NULL ,
      `location` VARCHAR(50) NOT NULL ,
      PRIMARY KEY (`projectId`) ,
      UNIQUE INDEX `projectId_UNIQUE` (`projectId` ASC)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-s16502`.`Cons_Project`
    ( `cons_projectId` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `hours` INT UNSIGNED NOT NULL ,
      `workType` VARCHAR(50) NOT NULL ,
      `consId` INT UNSIGNED NOT NULL ,
      `projectId` INT UNSIGNED NOT NULL ,
      PRIMARY KEY (`cons_projectId`) ,
      CONSTRAINT `cons_fk` FOREIGN KEY (`consId`) REFERENCES `tin-s16502`.`Consultant` (`consId`) ,
      CONSTRAINT `project_fk` FOREIGN KEY (`projectId`) REFERENCES `tin-s16502`.`Project` (`projectId`)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

INSERT IGNORE INTO `tin-s16502`.`Consultant` (`consId`, `firstName`, `lastName`, `email`, `pass`) VALUES
  (1, 'Jan', 'Kowalski', 'jan.kowalski@greenleaf.com', 'kowalski123') ,     
  (2, 'Anna', 'Nowak', 'anna.nowak@greenleaf.com', 'nowak123') ,   
  (3, 'Piotr', 'Kot', 'piotr.kot@greenleaf.com', 'nowak123')       
;

INSERT IGNORE INTO `tin-s16502`.`Project` (`projectId`, `name`, `Date`, `location`) VALUES
  (1, 'Astra', '2020-12-31', 'Poznan') ,
  (2, 'Panda', '2021-01-12', 'Szczecin'), 
  (3, 'Neptun', '2019-01-02', 'Warszawa') 
;

INSERT IGNORE INTO `tin-s16502`.`Cons_Project` (`cons_projectId`, `hours`, `workType`, `consId`, `projectId`) VALUES
  (1, 10, 'raport', 1 , 1) ,
  (2, 2, 'wizja', 1 , 2) ,
  (3, 3, 'oferta', 2 , 1) ,
  (4, 13, 'raport', 3 , 2) ,
  (5, 20, 'wizja', 3, 1) ,
  (6, 7, 'wizja', 2 , 3)
;




