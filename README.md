<div align="center">

# 🏔️ MOUNTAINSTRIDE
### WORLD SERIES · TRAIL RUNNING

**Plataforma de eventos de trail running de élite — descubre, filtra e inscríbete en las carreras más duras del mundo.**

![PHP](https://img.shields.io/badge/PHP-8.3-777BB4?style=flat-square&logo=php&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.4-4479A1?style=flat-square&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Architecture](https://img.shields.io/badge/Arquitectura-MVC-FF6B35?style=flat-square)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)

</div>

---

## ¿Qué es Mountain Stride?

Mountain Stride World Series es una aplicación web full-stack para descubrir y explorar eventos de trail running de élite a nivel mundial. Los usuarios pueden filtrar carreras por circuito, categoría, distancia y tipo de terreno, consultar datos técnicos detallados (perfil de elevación, checkpoints, rutas GPX) y gestionar su perfil de corredor.

Construida sobre una arquitectura **MVC en PHP**, base de datos MySQL, autenticación JWT y frontend dinámico en JavaScript vanilla con llamadas AJAX al backend.

> *"Push your limits in the wild"* — Mountain Stride 2026

---

## ✨ Funcionalidades principales

- 🔍 **Búsqueda y filtros avanzados** — circuito, terreno, distancia, estado y nombre en tiempo real
- 🗺️ **Geolocalización** — coordenadas `lat/lon` por evento para integración con mapas
- 📊 **Stats técnicos** — desnivel, altitud máxima, checkpoints y tiempo límite por carrera
- 🏆 **Circuitos** — UTMB World Series, Golden Trail Series, Majors, ITRA Ultra Tour
- 👤 **Sistema de usuarios** — registro, login, JWT, roles (`admin`, `user`, `moderador`) y avatar
- 🔗 **Integraciones externas** — URL oficial, Strava y descarga GPX por evento
- 📈 **Contador de visitas** — para destacar las carreras con más tendencia
- 🛍️ **Tienda** — sección de merchandise integrada en la plataforma

---

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|---|---|
| Backend | PHP 8.3 |
| Base de datos | MySQL 8.4 (WampServer / phpMyAdmin) |
| Autenticación | JWT (implementación PHP propia) |
| Frontend | JavaScript ES6+, HTML5, CSS3 |
| Arquitectura | MVC |

---

## 🗂️ Estructura del proyecto

```
MountainStride/
├── index.php                        # Front controller
├── model/
│   ├── connect.php                  # Conexión PDO
│   ├── JWT.php / jwt.ini            # Lógica y config JWT
│   └── middleware_auth.php          # Middleware de autenticación
├── module/
│   ├── home/                        # Página principal y carrusel
│   ├── login/                       # Login, registro y sesión
│   ├── profile/                     # Perfil del usuario
│   ├── search/                      # Filtros y resultados
│   └── shop/                        # Tienda
│       └── (controller / model / view) por módulo
├── view/
│   ├── css/style.css
│   ├── js/promises.js
│   ├── img/
│   └── inc/                         # Header, footer, menú, partials
└── DB/
    ├── DB.sql                        # Schema completo + datos de prueba
    └── add_visit_count.sql           # Migración contador de visitas
```

---

## 🗄️ Base de datos

```
circuits        — Circuitos (UTMB, Golden Trail, Majors, ITRA)
distance        — Categorías de distancia (Half Marathon → Ultra Trail)
land            — Tipos de terreno
running         — Eventos (nombre, ubicación, km, fecha, precio, coords)
running_extras  — Stats técnicos por evento (desnivel, GPX, URLs...)
running_images  — Galería de imágenes por evento
runners         — Perfiles de corredores de élite
users           — Usuarios registrados (auth, roles, avatar)
filters         — Definición de filtros dinámicos
```

**Ciclo de vida de un evento:** `Upcoming → Open → Sold Out → Closed`

---

## 🚀 Instalación

```bash
# 1. Clona el repositorio
git clone https://github.com/AndreaTormo/MountainStride.git

# 2. Copia el proyecto a la raíz de WampServer
cp -r MountainStride/ C:/wamp64/www/

# 3. Importa la base de datos en phpMyAdmin
#    → Crea la BD 'mountainstride' e importa DB/DB.sql

# 4. Configura la conexión en model/connect.php
$host = '127.0.0.1'; $db = 'mountainstride'; $user = 'root'; $pass = '';

# 5. Configura el secreto JWT en model/jwt.ini
secret = tu_clave_secreta

# 6. Abre en el navegador
http://localhost/MountainStride/
```

---

## 👩‍💻 Autora

**Andrea Tormo** · [![GitHub](https://img.shields.io/badge/GitHub-AndreaTormo-181717?style=flat-square&logo=github)](https://github.com/AndreaTormo)

<div align="center"><sub>Mountain Stride World Series · Trail Running · 2026</sub></div>
