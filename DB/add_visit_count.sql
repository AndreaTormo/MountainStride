-- Ejecutar una vez en phpMyAdmin (base de datos: mountainstride)
-- Si la columna ya existe, ignorar el error "Duplicate column name"
USE mountainstride;

ALTER TABLE `running`
  ADD COLUMN `visit_count` INT UNSIGNED NOT NULL DEFAULT 0;
