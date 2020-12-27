CREATE SCHEMA IF NOT EXISTS `tin-s16502`;

CREATE TABLE IF NOT EXISTS `tin-s16502`.`Consultant`
    ( `consNo` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `firstName` VARCHAR(50) NOT NULL ,
      `lastName` VARCHAR(50) NOT NULL ,
      `email` VARCHAR(50) NOT NULL ,
      `pass` VARCHAR(100) NOT NULL ,
      PRIMARY KEY (`consNo`) ,
      UNIQUE INDEX `consNo_UNIQUE` (`consNo` ASC)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-s16502`.`Project`
    ( `projectNo` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `name` VARCHAR(50) NOT NULL ,
      `Date` DATETIME NOT NULL ,
      `location` VARCHAR(50) NOT NULL ,
      PRIMARY KEY (`projectNo`) ,
      UNIQUE INDEX `projectNo_UNIQUE` (`projectNo` ASC)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `tin-s16502`.`Consultant_Project`
    ( `cons_projectNo` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
      `hours` INT UNSIGNED NOT NULL ,
      `workType` VARCHAR(50) NOT NULL ,
      `consNo` INT UNSIGNED NOT NULL ,
      `projectNo` INT UNSIGNED NOT NULL ,
      PRIMARY KEY (`cons_projectNo`) ,
      CONSTRAINT `cons_fk` FOREIGN KEY (`consNo`) REFERENCES `tin-s16502`.`Consultant` (`consNo`) ,
      CONSTRAINT `project_fk` FOREIGN KEY (`projectNo`) REFERENCES `tin-s16502`.`Project` (`projectNo`)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

INSERT IGNORE INTO `tin-s16502`.`Consultant` (`consNo`, `firstName`, `lastName`, `email`, `pass`) VALUES
  (1, 'Jan', 'Kowalski', 'jan.kowalski@greenleaf.com', 'kowalski123') ,     
  (2, 'Anna', 'Nowak', 'anna.nowak@greenleaf.com', 'nowak123') ,   
  (3, 'Piotr', 'Kot', 'piotr.kot@greenleaf.com', 'nowak123')       
;

INSERT IGNORE INTO `tin-s16502`.`Project` (`projectNo`, `name`, `Date`, `location`) VALUES
  (1, 'Astra', '2020-12-31', 'Poznan') ,
  (2, 'Panda', '2021-01-12', 'Szczecin') 
;

INSERT IGNORE INTO `tin-s16502`.`Consultant_Project` (`cons_projectNo`, `hours`, `workType`, `consNo`, `projectNo`) VALUES
  (1, '10', 'raport', 1 , 1) ,
  (2, '2', 'wizja', 1 , 2) ,
  (3, '3', 'oferta', 2 , 1) ,
  (4, '13', 'raport', 3 , 2) ,
  (5, '20', 'wizja', 3, 1) ,
  (6, '7', 'wizja', 2 , 2)
;




