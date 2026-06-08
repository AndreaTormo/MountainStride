-- Tabla junction: relaciona corredores con carreras
CREATE TABLE IF NOT EXISTS `running_runners` (
  `id_running_runner` int NOT NULL AUTO_INCREMENT,
  `id_running` int NOT NULL,
  `id_runner`  int NOT NULL,
  PRIMARY KEY (`id_running_runner`),
  KEY `fk_rr_running` (`id_running`),
  KEY `fk_rr_runner`  (`id_runner`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Asociaciones corredor → carrera
-- Kilian Jornet (id=1): UTMB, Transvulcania, Lavaredo, CCC, Zegama
INSERT INTO `running_runners` (`id_running`, `id_runner`) VALUES
(1,1),(2,1),(3,1),(9,1),(7,1),
-- Courtney Dauwalter (id=2): UTMB, Western States, Lavaredo
(1,2),(4,2),(3,2),
-- François D'Haene (id=3): UTMB, CCC
(1,3),(9,3),
-- Sara Alonso (id=4): Transvulcania, Penyagolosa, Zegama
(2,4),(11,4),(7,4),
-- Camille Herron (id=5): Western States, Chicago
(4,5),(16,5),
-- Pau Capell (id=6): UTMB, Transvulcania, Buff Epic Trail
(1,6),(2,6),(8,6);
