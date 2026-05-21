-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 21-05-2026 a las 14:34:50
-- Versión del servidor: 8.4.7
-- Versión de PHP: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mountainstride`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `circuits`
--

DROP TABLE IF EXISTS `circuits`;
CREATE TABLE IF NOT EXISTS `circuits` (
  `id_circuit` int NOT NULL AUTO_INCREMENT,
  `circuit_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `circuit_image` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_circuit`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `circuits`
--

INSERT INTO `circuits` (`id_circuit`, `circuit_name`, `circuit_image`) VALUES
(1, 'UTMB World Series', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85'),
(2, 'Golden Trail Series', 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=800&q=85'),
(3, 'Majors', 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=85'),
(4, 'ITRA Ultra Tour', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `distance`
--

DROP TABLE IF EXISTS `distance`;
CREATE TABLE IF NOT EXISTS `distance` (
  `id_distance` int NOT NULL AUTO_INCREMENT,
  `distance_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `distance_km` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `distance_difficulty` int DEFAULT '1',
  `distance_image` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_distance`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `distance`
--

INSERT INTO `distance` (`id_distance`, `distance_name`, `distance_km`, `distance_difficulty`, `distance_image`) VALUES
(1, 'Half Marathon', '21 km', 1, 'https://s3.sportstatics.com/relevo/www/multimedia/202412/30/media/cortadas/media-maraton-RRDkXeX6Fs5NH4r7Ev2PlBI-1200x648@Relevo.jpg'),
(2, 'Marathon', '42 km', 2, 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=85'),
(3, 'Ultra Marathon', '50-80 km', 3, 'https://wmimg.azureedge.net/public/img/marathons/antalya-ultra-marathon/bQJFgi_antalya-ultra-marathon.jpg?c=1695385049'),
(4, 'Trail Short', '20-40 km', 2, 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=85'),
(5, 'Trail Long', '40-80 km', 3, 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=800&q=85'),
(6, 'Ultra Trail', '80-170 km', 4, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `filters`
--

DROP TABLE IF EXISTS `filters`;
CREATE TABLE IF NOT EXISTS `filters` (
  `id_filter` int NOT NULL AUTO_INCREMENT,
  `id_type_filter` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `filter` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_filter`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `filters`
--

INSERT INTO `filters` (`id_filter`, `id_type_filter`, `filter`) VALUES
(1, 'select', 'status'),
(2, 'select', 'km_range'),
(3, 'select', 'land_name'),
(4, 'select', 'circuit_name');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `filters_values`
--

DROP TABLE IF EXISTS `filters_values`;
CREATE TABLE IF NOT EXISTS `filters_values` (
  `id_filter_values` int NOT NULL AUTO_INCREMENT,
  `id_filter` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_filter_values`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `filters_values`
--

INSERT INTO `filters_values` (`id_filter_values`, `id_filter`, `value`) VALUES
(1, '1', 'Open'),
(2, '1', 'Upcoming'),
(3, '1', 'Sold Out'),
(4, '1', 'Closed'),
(5, '2', '0-42'),
(6, '2', '42-80'),
(7, '2', '80-200'),
(8, '3', 'Trail'),
(9, '3', 'Road'),
(10, '3', 'Mixed'),
(11, '3', 'Volcanic'),
(12, '3', 'Desert'),
(13, '4', 'UTMB World Series'),
(14, '4', 'Golden Trail Series'),
(15, '4', 'Majors'),
(16, '4', 'ITRA Ultra Tour');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `land`
--

DROP TABLE IF EXISTS `land`;
CREATE TABLE IF NOT EXISTS `land` (
  `id_land` int NOT NULL AUTO_INCREMENT,
  `land_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `land_image` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_land`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `land`
--

INSERT INTO `land` (`id_land`, `land_name`, `land_image`) VALUES
(2, 'Trail', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=85'),
(3, 'Road', 'https://images.unsplash.com/photo-1602248349525-be667454a880?w=800&q=85'),
(4, 'Mixed', 'https://plus.unsplash.com/premium_photo-1698513569237-e8a228b12f51?w=800&q=85'),
(5, 'Volcanic', 'https://images.unsplash.com/photo-1621361607621-aa46e79bd017?w=800&q=85'),
(6, 'Desert', 'https://plus.unsplash.com/premium_photo-1701165868429-815a0b43c49b?w=800&q=85');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `runners`
--

DROP TABLE IF EXISTS `runners`;
CREATE TABLE IF NOT EXISTS `runners` (
  `id_runner` int NOT NULL AUTO_INCREMENT,
  `runner_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `runner_image` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `runner_country` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `runner_wins` int DEFAULT '0',
  `runner_km` int DEFAULT '0',
  PRIMARY KEY (`id_runner`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `runners`
--

INSERT INTO `runners` (`id_runner`, `runner_name`, `runner_image`, `runner_country`, `runner_wins`, `runner_km`) VALUES
(1, 'Kilian Jornet', 'https://www.mundodeportivo.com/files/og_thumbnail/files/fp/uploads/2025/10/04/68e15042b7fce.r_d.812-469-9202.jpeg', 'Spain', 87, 42000),
(2, 'Courtney Dauwalter', 'https://www.trailrun.es/uploads/s1/14/37/14/95/whatsapp-image-2023-09-02-at-17-38-19.jpeg', 'USA', 12, 18500),
(3, 'François D\'Haene', 'https://kissthemountain.com/revista/wp-content/uploads/2018/02/5-10.jpg', 'France', 24, 29000),
(4, 'Sara Alonso', 'https://static.runnea.com/images/202308/sara-alonso-sorprende-con-una-victoria-en-su-debut-en-trail-en-el-etc-del-utmb-1-1200x572x80xX.jpg', 'Spain', 8, 15000),
(5, 'Camille Herron', 'https://hips.hearstapps.com/hmg-prod/images/united-states-long-distance-runner-camille-herron-reacts-news-photo-1727447733.jpg', 'USA', 31, 35000),
(6, 'Pau Capell', 'https://www.trailrun.es/uploads/s1/32/33/68/8/f0af3690-0c41-4750-acff-709f3a57c50e.jpeg', 'Spain', 15, 19500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `running`
--

DROP TABLE IF EXISTS `running`;
CREATE TABLE IF NOT EXISTS `running` (
  `id_running` int NOT NULL AUTO_INCREMENT,
  `running_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `running_image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `location` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `race_km` decimal(6,2) DEFAULT NULL,
  `race_date` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('Open','Sold Out','Closed','Upcoming') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'Upcoming',
  `price` decimal(8,2) DEFAULT NULL,
  `lat` decimal(10,6) DEFAULT NULL,
  `lon` decimal(10,6) DEFAULT NULL,
  `id_land` int DEFAULT NULL,
  `id_circuit` int DEFAULT NULL,
  `visit_count` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id_running`),
  KEY `fk_running_land` (`id_land`),
  KEY `fk_running_circuit` (`id_circuit`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `running`
--

INSERT INTO `running` (`id_running`, `running_name`, `running_image`, `location`, `race_km`, `race_date`, `status`, `price`, `lat`, `lon`, `id_land`, `id_circuit`, `visit_count`) VALUES
(1, 'UTMB® Mont-Blanc', 'https://imgs.search.brave.com/n9FmvC9K_vEK5GWCY6tB-lPfqoZXA4ECvhfICcWwsWo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy8z/LzMzL1VUTUJfMjAx/NS5qcGc', 'Chamonix, France', 171.00, 'Aug 26, 2024', 'Sold Out', 280.00, 45.923697, 6.869433, 2, 1, 0),
(2, 'Transvulcania', 'https://imgs.search.brave.com/ui5EFaIZSo96KbqnynLzWxssQU7BNUljXqOmBTlJLLY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cnR2Yy5lcy9hcmNo/aXZvcy8yMDI1LzA1/L1ByZXZpYS10cmFu/c3Z1bGNhbmlhLTEw/MjR4NjgzLndlYnA', 'La Palma, Spain', 73.00, 'May 11, 2024', 'Open', 95.00, 28.680992, -17.844938, 5, 1, 0),
(3, 'Lavaredo Ultra Trail', 'https://imgs.search.brave.com/PePEXtUftFptxS7fqE5CtDgHUOde0LFmN80rgfgx1v4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vY2FycmVy/YXNkZW1vbnRhbmEu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDE4LzA4L2xhLXNw/b3J0aXZhLWxhdmFy/ZWRvLXVsdHJhLXRy/YWlsLTIwMTkuanBn/P3Jlc2l6ZT02NTAs/NDMzJnNzbD0x', 'Cortina, Italy', 120.00, 'Jun 23, 2024', 'Upcoming', 185.00, 46.540450, 12.135930, 2, 1, 0),
(4, 'Western States 100', 'https://imgs.search.brave.com/ClL4uBkgzemH_JqJvndOBoYkgwqpzsQgcsAnyo5amOE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ydW4t/Y2RuLm91dHNpZGVv/bmxpbmUuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDI1LzA2/LzQucG5n', 'Olympic Valley, USA', 161.00, 'Jun 28, 2025', 'Open', 140.00, 39.196060, -120.238520, 2, 3, 0),
(5, 'Tokyo Marathon', 'https://media.gettyimages.com/id/476899905/photo/tokyo-marathon.jpg?s=612x612&w=0&k=20&c=1-7aGdqAXF1HCjxeEUbwAg59yOdUIsDE0D9vo2XwwhoU=', 'Tokyo, Japan', 42.20, 'Mar 2, 2025', 'Upcoming', 300.00, 35.681236, 139.767125, 3, 3, 0),
(6, 'Ultra-Trail Snowdonia', 'https://runnerslab.com/wp-content/uploads/2023/06/ultra_trail_snowdonia_start_line-1024x744.jpg', 'Snowdonia, Wales', 100.00, 'Jul 12, 2025', 'Open', 165.00, 53.068401, -3.986229, 2, 1, 0),
(7, 'Zegama-Aizkorri Trail', 'https://apartamentosturisticosnavarra.es/wp-content/uploads/2024/04/Carrera-Trail-Running-Zegama-Aizkorri-XXIII.jpg', 'Zegama, Basque Country, Spain', 42.00, 'May 25, 2025', 'Open', 80.00, 42.968600, -2.318800, 2, 2, 0),
(8, 'Skyrunning Buff Epic Trail', 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=800&q=80', 'Guadarrama, Spain', 83.00, 'Sep 13, 2025', 'Upcoming', 120.00, 40.753300, -4.016700, 2, 4, 0),
(9, 'CCC® (Courmayeur-Champex-Chamonix)', 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80', 'Courmayeur, Italy / Chamonix, France', 101.00, 'Aug 28, 2025', 'Open', 230.00, 45.796390, 6.969390, 2, 1, 0),
(10, 'Millau Grands Causses Trail', 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&q=80', 'Millau, France', 65.00, 'Oct 4, 2025', 'Upcoming', 75.00, 44.099700, 3.077000, 2, 4, 0),
(11, 'Penyagolosa Trails MIM', 'https://i0.wp.com/carrerasdemontana.com/wp-content/uploads/2025/04/Penyagolosa-trails-2025_3.jpg?resize=650,434&ssl=1', 'Vistabella del Maestrat, Spain', 108.00, 'May 10, 2025', 'Open', 90.00, 40.302800, -0.286900, 2, 4, 0),
(12, 'Ronda dels Cims', 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=800&q=80', 'Andorra', 170.00, 'Jul 18, 2025', 'Upcoming', 195.00, 42.506300, 1.521800, 2, 4, 0),
(13, 'Maratón de Valencia Trinidad Alfonso', 'https://estaticos-cdn.prensaiberica.es/clip/f15dbeab-5248-4d47-b09c-2325dcb51a0d_16-9-discover-aspect-ratio_default_0.jpg', 'Valencia, Spain', 42.20, 'Dec 7, 2025', 'Open', 85.00, 39.469900, -0.376300, 3, 3, 0),
(14, 'Maratón de Madrid', 'https://www.soycorredor.es/uploads/s1/14/68/55/07/mmmm-top-latemilente-30.jpeg', 'Madrid, Spain', 42.20, 'Apr 27, 2025', 'Sold Out', 95.00, 40.416775, -3.703790, 3, 3, 0),
(15, 'Berlin Marathon', 'https://i.ibb.co/mF3zK0X/puerta-branderburgo-maraton-berlin-travelmarathon-es.jpg', 'Berlin, Germany', 42.20, 'Sep 28, 2025', 'Open', 129.00, 52.516300, 13.377700, 3, 3, 0),
(16, 'Chicago Marathon', 'https://www.clarin.com/img/2025/10/12/GRPOPVPme_1256x620__2.jpg', 'Chicago, USA', 42.20, 'Oct 12, 2025', 'Upcoming', 285.00, 41.882000, -87.629800, 3, 3, 0),
(17, 'Media Maratón de Valencia', 'https://hips.hearstapps.com/hmg-prod/images/salida-media-maraton-valencia-68fb67cba4c47.jpg?resize=980:*', 'Valencia, Spain', 21.10, 'Nov 30, 2025', 'Open', 45.00, 39.469900, -0.376300, 3, 3, 0),
(18, 'Great North Run', 'https://cdn.timeoutdoors.com/media/gr/great-north-run/gallery-photo13_3.jpg', 'Newcastle, England', 21.10, 'Sep 7, 2025', 'Upcoming', 62.00, 54.978252, -1.617780, 3, 3, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `running_extras`
--

DROP TABLE IF EXISTS `running_extras`;
CREATE TABLE IF NOT EXISTS `running_extras` (
  `id_extra` int NOT NULL AUTO_INCREMENT,
  `id_running` int NOT NULL,
  `elevation_gain` int DEFAULT NULL,
  `elevation_loss` int DEFAULT NULL,
  `max_altitude` int DEFAULT NULL,
  `min_altitude` int DEFAULT NULL,
  `checkpoints` int DEFAULT NULL,
  `time_limit` int DEFAULT NULL,
  `max_participants` int DEFAULT NULL,
  `min_age` int DEFAULT '18',
  `official_url` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `strava_url` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gpx_url` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_circuit` int DEFAULT NULL,
  `id_distance` int DEFAULT NULL,
  `id_land` int DEFAULT NULL,
  PRIMARY KEY (`id_extra`),
  UNIQUE KEY `uq_running` (`id_running`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `running_extras`
--

INSERT INTO `running_extras` (`id_extra`, `id_running`, `elevation_gain`, `elevation_loss`, `max_altitude`, `min_altitude`, `checkpoints`, `time_limit`, `max_participants`, `min_age`, `official_url`, `strava_url`, `gpx_url`, `id_circuit`, `id_distance`, `id_land`) VALUES
(1, 1, 10000, 10000, 2527, 1035, 11, 46, 2300, 18, 'https://utmb.world/races/utmb', 'https://www.strava.com/routes/utmb', 'https://utmb.world/gpx/utmb.gpx', 1, 6, 2),
(2, 2, 4196, 4196, 2230, 0, 8, 30, 1500, 18, 'https://transvulcania.com', 'https://www.strava.com/routes/transvulcania', 'https://transvulcania.com/gpx/ultra.gpx', 2, 5, 5),
(3, 3, 5800, 5800, 2469, 1211, 9, 42, 1800, 18, 'https://lavaredo.com', 'https://www.strava.com/routes/lavaredo', 'https://lavaredo.com/gpx/lut120.gpx', 1, 6, 2),
(4, 4, 5500, 7000, 2654, 282, 10, 30, 369, 18, 'https://www.wser.org', 'https://www.strava.com/routes/western-states', 'https://www.wser.org/gpx/ws100.gpx', 3, 6, 4),
(5, 5, 114, 114, 40, 0, 5, 7, 38000, 16, 'https://www.tokyo42195.org', 'https://www.strava.com/routes/tokyo-marathon', 'https://www.tokyo42195.org/gpx/tokyo.gpx', 3, 2, 3),
(6, 6, 6000, 6000, 1085, 2, 8, 36, 800, 18, 'https://utmb.world/races/snowdonia', 'https://www.strava.com/routes/snowdonia', 'https://utmb.world/gpx/snowdonia100.gpx', 1, 6, 2),
(7, 7, 4200, 4200, 1551, 340, 6, 12, 700, 18, 'https://www.zegama-aizkorri.com', 'https://www.strava.com/routes/zegama', 'https://www.zegama-aizkorri.com/gpx/zegama.gpx', 2, 4, 2),
(8, 8, 4800, 4800, 2428, 950, 9, 30, 1200, 18, 'https://www.buffepictrail.com', 'https://www.strava.com/routes/buff-epic', 'https://www.buffepictrail.com/gpx/bet83.gpx', 4, 5, 2),
(9, 9, 6100, 6100, 2516, 815, 10, 40, 2300, 18, 'https://utmb.world/races/ccc', 'https://www.strava.com/routes/ccc', 'https://utmb.world/gpx/ccc.gpx', 1, 6, 2),
(10, 10, 3500, 3500, 910, 160, 7, 24, 2500, 18, 'https://www.millautrail.com', 'https://www.strava.com/routes/millau-trail', 'https://www.millautrail.com/gpx/mgt65.gpx', 4, 5, 2),
(11, 11, 5500, 5500, 1814, 390, 10, 36, 600, 18, 'https://www.penyagolosatrails.com', 'https://www.strava.com/routes/penyagolosa', 'https://www.penyagolosatrails.com/gpx/mim.gpx', 4, 6, 2),
(12, 12, 11500, 11500, 2942, 840, 16, 56, 350, 18, 'https://www.rondadelscims.com', 'https://www.strava.com/routes/ronda-cims', 'https://www.rondadelscims.com/gpx/rdc170.gpx', 4, 6, 2),
(13, 13, 126, 126, 40, 0, 5, 7, 22000, 16, 'https://www.valenciaciudaddelrunning.com', 'https://www.strava.com/routes/valencia-marathon', 'https://www.valenciaciudaddelrunning.com/gpx/marathon.gpx', 3, 2, 3),
(14, 14, 310, 310, 700, 580, 6, 7, 35000, 18, 'https://www.maratonmadrid.org', 'https://www.strava.com/routes/madrid-marathon', 'https://www.maratonmadrid.org/gpx/madrid.gpx', 3, 2, 3),
(15, 15, 170, 170, 55, 30, 6, 6, 45000, 18, 'https://www.bmw-berlin-marathon.com', 'https://www.strava.com/routes/berlin-marathon', 'https://www.bmw-berlin-marathon.com/gpx/berlin.gpx', 3, 2, 3),
(16, 16, 80, 80, 180, 170, 7, 6, 50000, 18, 'https://www.chicagomarathon.com', 'https://www.strava.com/routes/chicago-marathon', 'https://www.chicagomarathon.com/gpx/chicago.gpx', 3, 2, 3),
(17, 17, 60, 60, 40, 0, 4, 4, 18000, 16, 'https://www.valenciaciudaddelrunning.com/media-maraton', 'https://www.strava.com/routes/valencia-half', 'https://www.valenciaciudaddelrunning.com/gpx/half.gpx', 3, 1, 3),
(18, 18, 100, 100, 90, 0, 5, 4, 57000, 16, 'https://www.greatrun.org/great-north-run', 'https://www.strava.com/routes/great-north-run', 'https://www.greatrun.org/gpx/gnr.gpx', 3, 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `running_images`
--

DROP TABLE IF EXISTS `running_images`;
CREATE TABLE IF NOT EXISTS `running_images` (
  `id_image` int NOT NULL AUTO_INCREMENT,
  `id_running` int NOT NULL,
  `image_url` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` int DEFAULT '0',
  PRIMARY KEY (`id_image`)
) ENGINE=MyISAM AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `running_images`
--

INSERT INTO `running_images` (`id_image`, `id_running`, `image_url`, `sort_order`) VALUES
(1, 6, 'https://res.cloudinary.com/utmb-world/image/upload/q_auto/f_auto/c_fill,g_auto/if_w_gt_1920/c_scale,w_1920/if_end/v1720610462/snowdonia/Race%20Info%20Images/UTS_100_M_RACE_66258e3265.jpg', 0),
(2, 6, 'https://res.cloudinary.com/utmb-world/image/upload/q_auto/f_auto/c_fill,g_auto/if_w_gt_1920/c_scale,w_1920/if_end/v1721815199/snowdonia/Race%20Info%20Images/UTS_100_K_1_548c492dea.jpg', 1),
(3, 6, 'https://res.cloudinary.com/utmb-world/image/upload/q_auto/f_auto/c_fill,g_auto/if_w_gt_1920/c_scale,w_1920/if_end/v1720610462/snowdonia/Race%20Info%20Images/UTS_50_K_RACE_735c13124d.jpg', 2),
(4, 6, 'https://res.cloudinary.com/utmb-world/image/upload/q_auto/f_auto/c_fill,g_auto/if_w_gt_1920/c_scale,w_1920/if_end/v1721815199/snowdonia/Race%20Info%20Images/ERYRI_25_K_1_e07e30a7d4.jpg', 3),
(5, 6, 'https://trailrunningforlife.b-cdn.net/wp-content/uploads/2023/05/9585_20230513_125521_280102286_original.jpg', 4),
(6, 6, 'https://carnethy.com/wp-content/uploads/2023/05/ultra-trail2.jpg?x17866', 5),
(7, 5, 'https://cdn.prod.website-files.com/5f58a4616a9e717a6fa059d0/5fc524daab2b60cbb8fc36eb_6dab1bf3-2687-4be0-ab19-48e014ca15aa.jpeg', 0),
(8, 5, 'https://www.wintecare.ch/wp-content/uploads/2019/08/fa45bed8d4d5716050f33622502ec6b0.jpg', 1),
(9, 5, 'https://assets.aws.worldathletics.org/large/8b1b0ce1-80c8-4bdf-8e21-84e615e098cc.png', 2),
(10, 5, 'https://assets.aws.worldathletics.org/large/64040d1cc325eee54d959b9e.jpg', 3),
(11, 5, 'https://marathinez.com/wp-content/uploads/2024/08/START011-1.jpg', 4),
(12, 4, 'https://hips.hearstapps.com/hmg-prod/images/ws100-keely-henninger-robinson-flat-2023-credit-brian-metzler-685eebb833ff0.jpg?crop=0.668xw:1.00xh;0.0510xw,0&resize=640:*', 0),
(13, 4, 'https://www.trailrun.es/uploads/s1/94/56/36/4/66092657-10156949557640412-441445010789892096-n.jpeg', 1),
(14, 4, 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Hanging_with_the_Oregonians.jpg/330px-Hanging_with_the_Oregonians.jpg', 2),
(15, 4, 'https://cdn.trailrunnermag.com/wp-content/uploads/2023/06/2022-WSER-Start-Credit-Peter-Maksimow-1-scaled.jpeg?auto=webp&width=3840&quality=75&fit=cover', 3),
(16, 4, 'https://strambecco.com/wp-content/uploads/2022/07/1080x540_wser100_Paul-Nelson_.webp', 4),
(17, 4, 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh3rdKL3IPJTjyqbsf3bHWcvcAkCnJylH8cEkB9U32y7c87Fdr2lPaiYpq5NAnOR1vKF4DeIzZhO8EeLGCUwUOqaUgOLRHug8-4ZoQlJJRkrTWAO4y9VLMvigC76MsiXGjpjl0jQyw7-mU', 5),
(18, 3, 'https://wmimg.azureedge.net/public/img/marathons/lavaredo-ultra-trail/lavaredo-ultra-trail.jpg', 0),
(19, 3, 'https://i0.wp.com/carrerasdemontana.com/wp-content/uploads/2018/08/la-sportiva-lavaredo-ultra-trail-2019.jpg?fit=1500%2C1000&ssl=1', 1),
(20, 3, 'https://www.trailrun.es/uploads/s1/13/43/88/40/vcsprasset-3574646-736914-1371b2d5-3945-4e20-9ad5-e68bd7fb0f6e-0.jpeg', 2),
(21, 3, 'https://iancorless.org/wp-content/uploads/2021/06/iancorless.com_cortinatrail-04673.jpg', 3),
(22, 3, 'https://i.ytimg.com/vi/r9zjsg0eumg/maxresdefault.jpg', 4),
(23, 3, 'https://res.cloudinary.com/utmb-world/image/upload/q_auto/f_auto/c_fill,g_auto/if_w_gt_1920/c_scale,w_1920/if_end/v1660124631/lavaredo/Races/Dolomites%2080km/c_Jordi_Saragossa_LUT_042_a037cff622.jpg', 5),
(24, 2, 'https://hips.hearstapps.com/hmg-prod/images/carrera-transvulcania-1665655024.jpg?crop=1xw:0.84375xh;center,top&resize=1200:*', 0),
(25, 2, 'https://transvulcania.com/wp-content/uploads/2023/10/TRV_20.jpg', 1),
(26, 2, 'https://www.spain.info/export/sites/segtur/.content/imagenes/cabeceras-grandes/eventos-fiestas/canarias/transvulcania-2015-c.jpg', 2),
(27, 2, 'https://transvulcania.com/wp-content/uploads/2023/10/TRV_17.jpg', 3),
(28, 2, 'https://vert.run/wp-content/uploads/2019/09/transvulcania.jpg', 4),
(29, 2, 'https://eltime.es/images02/Deportes/Transvulcania-Foto-de-Saul-Santosok.jpg', 5),
(30, 1, 'https://res.cloudinary.com/utmb-world/image/upload/q_auto/f_auto/c_fill,g_auto/if_w_gt_1920/c_scale,w_1920/if_end/v1/montblanc/Races/UTMB/utmb24_utmb_fo_00_0810_bffcaa786e?_a=ATADJAA0', 0),
(31, 1, 'https://res.cloudinary.com/utmb-world/image/upload/q_auto/f_auto/c_fill,g_auto/if_w_gt_1920/c_scale,w_1920/if_end/v1/montblanc/Pages/Headbands/utmb_2022_08_26_utmb22_utmb_fo_00_0295_0f751519ba?_a=ATAD', 1),
(32, 1, 'https://res.cloudinary.com/utmb-world/image/upload/q_auto/f_auto/c_fill,g_auto/if_w_gt_1920/c_scale,w_1920/if_end/v1/montblanc/Races/UTMB/utmb23_utmb_fo_00_0494_616a9998dc?_a=ATADJAA0', 2),
(33, 1, 'https://www.labolsadelcorredor.com/wp-content/uploads/2023/09/UTMB-2024.jpg', 3),
(34, 1, 'https://www.labolsadelcorredor.com/wp-content/uploads/2025/08/vcsPRAsset_3574646_757325_6211d4e5-0eb8-47fd-a978-657ad762a6bd_0.jpg', 4),
(35, 1, 'https://esmontañas.es/wp-content/uploads/2019/10/ob_d81556_utmb-2015.jpg', 5),
(36, 7, 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85', 0),
(37, 7, 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1200&q=85', 1),
(38, 7, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85', 2),
(39, 7, 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=85', 3),
(40, 7, 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=85', 4),
(41, 8, 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1200&q=85', 0),
(42, 8, 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85', 1),
(43, 8, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85', 2),
(44, 8, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=85', 3),
(45, 9, 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=85', 0),
(46, 9, 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85', 1),
(47, 9, 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1200&q=85', 2),
(48, 9, 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=85', 3),
(49, 9, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85', 4),
(50, 10, 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=85', 0),
(51, 10, 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1200&q=85', 1),
(52, 10, 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85', 2),
(53, 10, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85', 3),
(54, 11, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85', 0),
(55, 11, 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85', 1),
(56, 11, 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1200&q=85', 2),
(57, 11, 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=85', 3),
(58, 11, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=85', 4),
(59, 12, 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1200&q=85', 0),
(60, 12, 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=85', 1),
(61, 12, 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=85', 2),
(62, 12, 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=85', 3),
(63, 12, 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200&q=85', 4),
(64, 13, 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=85', 0),
(65, 13, 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1200&q=85', 1),
(66, 13, 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=1200&q=85', 2),
(67, 13, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=85', 3),
(68, 13, 'https://images.unsplash.com/photo-1602248349525-be667454a880?w=1200&q=85', 4),
(69, 14, 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1200&q=85', 0),
(70, 14, 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=85', 1),
(71, 14, 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=1200&q=85', 2),
(72, 14, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=85', 3),
(73, 15, 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=1200&q=85', 0),
(74, 15, 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=85', 1),
(75, 15, 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1200&q=85', 2),
(76, 15, 'https://images.unsplash.com/photo-1602248349525-be667454a880?w=1200&q=85', 3),
(77, 15, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=85', 4),
(78, 16, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=85', 0),
(79, 16, 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1200&q=85', 1),
(80, 16, 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=85', 2),
(81, 16, 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=1200&q=85', 3),
(82, 17, 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=1200&q=85', 0),
(83, 17, 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1200&q=85', 1),
(84, 17, 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=85', 2),
(85, 17, 'https://images.unsplash.com/photo-1602248349525-be667454a880?w=1200&q=85', 3),
(86, 18, 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1200&q=85', 0),
(87, 18, 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=1200&q=85', 1),
(88, 18, 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=85', 2),
(89, 18, 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=85', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','user','moderator') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `avatar` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
