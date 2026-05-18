const SHOP_LIMIT = 8;
let SHOP_OFFSET = 0;
let SHOP_LAST_URL = "module/shop/controller/controller_shop.php?op=all_running";
let SHOP_LAST_FILTER = null;
let SHOP_LAST_ORDER = null;

function loadShop() {
    SHOP_OFFSET = 0;

    const filtroHome = localStorage.getItem('filter_from_home') || null;
        if (filtroHome) {
            localStorage.removeItem('filter_from_home'); 
            loadDetails(filtroHome);                      
            SHOP_LAST_URL = "module/shop/controller/controller_shop.php?op=all_running";
            SHOP_LAST_FILTER = null;
            SHOP_LAST_ORDER = null;
            ajaxForSearch(SHOP_LAST_URL); 
            return;
        }
    
        // Shop amb filtres
        const filtro = JSON.parse(localStorage.getItem('filter')) || null;
        // console.log("Filtro cargado en loadShop:", filtro);
        if (filtro && Array.isArray(filtro) && filtro.length > 0) {
            // console.log("filtro:", filtro);
            SHOP_LAST_URL = "module/shop/controller/controller_shop.php?op=filter";
            SHOP_LAST_FILTER = filtro;
            SHOP_LAST_ORDER = null;
            ajaxForSearch(SHOP_LAST_URL, SHOP_LAST_FILTER);
        } else if (localStorage.getItem('order')) {
            var all_orderby = JSON.parse(localStorage.getItem('order'));
            SHOP_LAST_ORDER = all_orderby[0].order;
            SHOP_LAST_URL = "module/shop/controller/controller_shop.php?op=all_running";
            SHOP_LAST_FILTER = null;
            ajaxForSearch(SHOP_LAST_URL);
        } else {
            SHOP_LAST_URL = "module/shop/controller/controller_shop.php?op=all_running";
            SHOP_LAST_FILTER = null;
            SHOP_LAST_ORDER = null;
            ajaxForSearch(SHOP_LAST_URL);
        }
}


function ajaxForSearch(url, filter) {
//  console.log("Filtro cargado en loadShop:", filter);
    var payload = {
        limit: SHOP_LIMIT,
        offset: SHOP_OFFSET
    };
    if (filter) payload.filter = filter;
    if (SHOP_LAST_ORDER !== null && SHOP_LAST_ORDER !== undefined) {
        payload.order = SHOP_LAST_ORDER;
    }

    ajaxPromise("POST", "JSON", url, payload)
        .then(function (shop) {
            var total = 0;
            if (shop && !Array.isArray(shop) && Array.isArray(shop.items)) {
                total = parseInt(shop.total, 10) || 0;
                shop = shop.items;
            } else if (Array.isArray(shop)) {
                total = shop.length;
            } else {
                shop = [];
            }

            renderPagination(total);
            $("#content_shop_running").empty();

            if (!Array.isArray(shop) || shop.length === 0) {
                $('<div class="no-results"></div>').appendTo('#content_shop_running')
                    .html('<p style="color:#a0846a; font-family:Lexend,sans-serif; padding:2rem 0;">No races found with the selected filters.</p>');
                return;
            }

            for (var row in shop) {
                var r = shop[row];

                // status
                var badgeClass = 'badge-closed';
                if (r.status === 'Open')          badgeClass = 'badge-open';
                else if (r.status === 'Sold Out') badgeClass = 'badge-sold';
                else if (r.status === 'Upcoming') badgeClass = 'badge-upcoming';

                $('<div class="race-card"></div>').appendTo('#content_shop_running')
                    .html(`
                        <div class="race-card-img">
                            <img src="${r.running_image || ''}" alt="${r.running_name || ''}" loading="lazy">
                            <span class="race-status-badge ${badgeClass}">${r.status || ''}</span>
                            ${r.circuit_name ? `<span class="race-circuit-badge">${r.circuit_name}</span>` : ''}
                        </div>
                        <div class="race-card-body">
                            <p class="race-card-name">${r.running_name || ''}</p>
                            <p class="race-card-loc">${r.location || ''}</p>
                            <div class="race-card-meta">
                                <span>${r.race_km || ''} km</span>
                                <span>${r.race_date || ''}</span>
                                ${r.land_name ? `<span>${r.land_name}</span>` : ''}
                            </div>
                            <a class="more_info_list" id="${r.id_running}">More Info</a>
                        </div>
                    `);
            }
            mapLeaflet_all(shop);

            var openFirstResult = localStorage.getItem('open_first_result');
            if (openFirstResult === '1' && Array.isArray(shop) && shop.length > 0) {
                localStorage.removeItem('open_first_result');
                loadDetails(shop[0].id_running);
            }
        }).catch(function (e) {
            // console.error(e);
            renderPagination(0);
            $("#content_shop_running").empty();
            mapLeaflet_all([]);
            $('<div class="no-results"></div>').appendTo('#content_shop_running')
                .html('<p style="color:#a0846a; font-family:Lexend,sans-serif; padding:2rem 0;">No races found with the selected filters.</p>');
        });
}

//contar les pàgines i ficar els números i en html els dibuixa
function renderPagination(total) {
    var totalPages = Math.max(1, Math.ceil(total / SHOP_LIMIT));
    var currentPage = Math.floor(SHOP_OFFSET / SHOP_LIMIT) + 1;
    if (currentPage > totalPages) currentPage = totalPages;
    var html = '';
    for (var i = 1; i <= totalPages; i++) {
        var activeClass = (i === currentPage) ? 'is-active' : '';
        html += `<button class="shop-page-btn ${activeClass}" data-page="${i}">${i}</button>`;
    }
    $('#shop-pagination').html(html);
}

//carregar les dades de la pàgina en la que està
function initPaginationEvents() {
    $(document).on('click', '.shop-page-btn', function () {
        var page = parseInt($(this).data('page'), 10);
        if (isNaN(page) || page < 1) return;
        SHOP_OFFSET = (page - 1) * SHOP_LIMIT;
        ajaxForSearch(SHOP_LAST_URL, SHOP_LAST_FILTER);
    });
}

// ─── DETALLS EXTRES ──────────────────
function loadDetails(id_running) {
    ajaxPromise("GET", "JSON", `module/shop/controller/controller_shop.php?op=details_running&id=${id_running}`)
        .then(function(data) {
            $('#content_shop_running').fadeOut(200, function() {
                $('#map-all').hide();
                $('#details-shop').fadeIn(200)
                $('#shop-pagination').hide(); 
                window.scrollTo(0, 0);
                mapLeaflet_one(data[0]); 
                
            });

            const d = data[0];
            const extras = data[2] || null;
            let imagesDAO = data[1][0] || [];

            let mainImg = d.running_image;
            if (d.running_name.includes("Snowdonia")) mainImg = "https://res.cloudinary.com/utmb-world/image/upload/q_auto/f_auto/c_fill,g_auto/if_w_gt_1920/c_scale,w_1920/if_end/v1/snowdonia/22_UTS_David_Miller_23_9de1d7414e?_a=ATADJAA0";
            else if (d.running_name.includes("Tokyo")) mainImg = "https://hips.hearstapps.com/hmg-prod/images/a7205532-3a5e-4ca6-ac50-e14b253c2f2e.jpeg?crop=0.666666666667xw:1xh;center,top&resize=640:*";
            else if (d.running_name.includes("Western States")) mainImg = "https://pathprojects.com/cdn/shop/articles/western-states-start-line.jpg?v=1562179974&width=980";
            else if (d.running_name.includes("Lavaredo")) mainImg = "https://res.cloudinary.com/utmb-world/image/upload/q_auto/f_auto/c_fill,g_auto/if_w_gt_1920/c_scale,w_1920/if_end/v1/lavaredo/Races/Cortina%20Trail%2050km/iancorless_f27546f6e0?_a=ATADJAA0";
            else if (d.running_name.includes("Transvulcania")) mainImg = "https://carreraspormontana.com/images/2022/11/trasnvulcania-by-utmb2.jpg";
            else if (d.running_name.includes("Mont-Blanc")) mainImg = "https://www.labolsadelcorredor.com/wp-content/uploads/2023/09/UTMB-2024.jpg";

            let badgeColor = "bg-slate-500/80";
            if (d.status === "Open") badgeColor = "bg-emerald-500";
            else if (d.status === "Sold Out") badgeColor = "bg-red-500";
            else if (d.status === "Upcoming") badgeColor = "bg-amber-500";

            let carouselHTML = `<div class="details-carousel" id="details-carousel-main"><div class="details-carousel-track">`;
            carouselHTML += `<img src="${mainImg}" class="details-carousel-slide active" />`;
            imagesDAO.slice(1).forEach((imgObj) => {
                let url = imgObj.image_url;
                if (d.running_name.includes("Snowdonia") && url.includes("9de1d7414e")) {
                    url = "https://evolutionofaracingsnake.wordpress.com/wp-content/uploads/2023/05/28009121328129.jpg?w=1200";
                }
                carouselHTML += `<img src="${url}" class="details-carousel-slide" />`;
            });
            carouselHTML += `</div>
                ${imagesDAO.length > 1 ? `<button class="det-arrow left" onclick="detCarouselMove(-1)">&#8249;</button><button class="det-arrow right" onclick="detCarouselMove(1)">&#8250;</button>` : ''}
            </div>`;

            document.getElementById('container-img-shop').innerHTML = carouselHTML;

            document.getElementById('container-info-shop').innerHTML = `
            <div class='flex items-center gap-4 mb-4'>
                <h1 class='text-4xl font-black uppercase text-white'>${d.running_name}</h1>
                <span class='${badgeColor} text-white font-black px-3 py-1 text-xs rounded uppercase shadow-md'>
                    ${d.status}
                </span>
            </div>
            <hr class='border-primary/20 mb-6'>
            <div class='grid grid-cols-2 gap-4 text-sm text-slate-300 mb-8'>
                <span class='flex items-center gap-3'><i class='material-symbols-outlined text-primary text-sm'>location_on</i>${d.location}</span>
                <span class='flex items-center gap-3'><i class='material-symbols-outlined text-primary text-sm'>distance</i>${d.race_km} km</span>
                <span class='flex items-center gap-3'><i class='material-symbols-outlined text-primary text-sm'>calendar_month</i>${d.race_date}</span>
            </div>
            <p class='text-slate-400 italic mb-6'>Registration status: ${d.status}</p>

            ${extras ? `
            <div class='grid grid-cols-2 gap-3 mb-8 text-sm'>
                <div class='bg-slate-800/60 rounded-lg p-3 flex flex-col gap-1'>
                    <span class='text-amber-300 text-xs uppercase font-bold'>Elevation gain</span>
                    <span class='text-white font-bold'>${extras.elevation_gain} m</span>
                </div>
                <div class='bg-slate-800/60 rounded-lg p-3 flex flex-col gap-1'>
                    <span class='text-amber-300 text-xs uppercase font-bold'>Max altitude</span>
                    <span class='text-white font-bold'>${extras.max_altitude} m</span>
                </div>
                <div class='bg-slate-800/60 rounded-lg p-3 flex flex-col gap-1'>
                    <span class='text-amber-300 text-xs uppercase font-bold'>Time limit</span>
                    <span class='text-white font-bold'>${extras.time_limit}h</span>
                </div>
                <div class='bg-slate-800/60 rounded-lg p-3 flex flex-col gap-1'>
                    <span class='text-amber-300 text-xs uppercase font-bold'>Max participants</span>
                    <span class='text-white font-bold'>${extras.max_participants?.toLocaleString()}</span>
                </div>
                <div class='bg-slate-800/60 rounded-lg p-3 flex flex-col gap-1'>
                    <span class='text-amber-300 text-xs uppercase font-bold'>Circuit</span>
                    <span class='text-white font-bold'>${extras.circuit_name ?? '—'}</span>
                </div>
                <div class='bg-slate-800/60 rounded-lg p-3 flex flex-col gap-1'>
                    <span class='text-amber-300 text-xs uppercase font-bold'>Terrain</span>
                    <span class='text-white font-bold'>${extras.land_name ?? '—'}</span>
                </div>
                <div class='bg-slate-800/60 rounded-lg p-3 flex flex-col gap-1 col-span-2'>
                    <span class='text-amber-300 text-xs uppercase font-bold'>Checkpoints</span>
                    <span class='text-white font-bold'>${extras.checkpoints}</span>
                </div>
                ${extras.official_url ? `
                <div class='col-span-2'>
                    <a href='${extras.official_url}' target='_blank'
                    class='flex items-center gap-2 text-primary hover:underline text-sm'>
                        <i class='material-symbols-outlined text-sm'>open_in_new</i>
                        Official website
                    </a>
                </div>` : ''}
            </div>
            ` : ''}

            <div class='flex gap-4'>
                <button onclick='backToList()' class='flex-1 py-4 border border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-background-dark transition-all uppercase text-sm'>Back to list</button>
                <button class='flex-[2] py-4 bg-primary text-background-dark font-bold rounded-lg hover:bg-primary/90 transition-all uppercase text-sm'>Register Now</button>
            </div>
        `;
        window._id_running_similar = id_running;
        $('.results').empty();
        more_running_related(d.status);
        }).catch(function() {
            console.log('error loadDetails');
        });
}

// ─── CAROUSEL DETAILS ──────────────────
function detCarouselMove(dir) {
    const slides = document.querySelectorAll('.details-carousel-slide');
    if (slides.length <= 1) return;
    let current = [...slides].findIndex(s => s.classList.contains('active'));
    slides[current].classList.remove('active');
    current = (current + dir + slides.length) % slides.length;
    slides[current].classList.add('active');
}

// ─── PRINT FILTERS ──────────────────
function print_filters() {
    $('<div class="div-filters filters"></div>').appendTo('.filters_container')
        .html(`
            <!-- STATUS — radio button -->
            <div class="filter-group">
            <p class="filter-group-label">All Status</p>
            <label><input type="radio" name="filter_status" value="Open"> Open</label>
            <label><input type="radio" name="filter_status" value="Upcoming"> Upcoming</label>
            <label><input type="radio" name="filter_status" value="Sold Out"> Sold Out</label>
            </div>

            <!-- CIRCUIT — checkbox -->
            <div class="filter-group">
            <p class="filter-group-label">All Circuits</p>
            <label><input type="checkbox" class="filter_circuit" value="UTMB World Series"> UTMB World Series</label>
            <label><input type="checkbox" class="filter_circuit" value="Golden Trail Series"> Golden Trail Series</label>
            <label><input type="checkbox" class="filter_circuit" value="Majors"> Majors</label>
            <label><input type="checkbox" class="filter_circuit" value="ITRA Ultra Tour"> ITRA Ultra Tour</label>
            </div>

            <!-- DISTANCE — radio button -->
            <div class="filter-group">
            <p class="filter-group-label">All Distances</p>
            <label><input type="radio" name="filter_distance" value="Half Marathon"> Half Marathon</label>
            <label><input type="radio" name="filter_distance" value="Marathon"> Marathon</label>
            <label><input type="radio" name="filter_distance" value="Ultra Marathon"> Ultra Marathon</label>
            <label><input type="radio" name="filter_distance" value="Trail Short"> Trail Short</label>
            <label><input type="radio" name="filter_distance" value="Trail Long"> Trail Long</label>
            <label><input type="radio" name="filter_distance" value="Ultra Trail"> Ultra Trail</label>
            </div>

            <!-- TERRAIN — checkbox -->
            <div class="filter-group">
            <p class="filter-group-label">All Terrain</p>
            <label><input type="checkbox" class="filter_land" value="Mountain"> Mountain</label>
            <label><input type="checkbox" class="filter_land" value="Desert"> Desert</label>
            <label><input type="checkbox" class="filter_land" value="Forest"> Forest</label>
            <label><input type="checkbox" class="filter_land" value="Coastal"> Coastal</label>
            </div>

            <!-- RUNNERS — checkbox -->
            <div class="filter-group">
            <p class="filter-group-label">All Runners</p>
            <label><input type="checkbox" class="filter_runner" value="Kilian Jornet"> Kilian Jornet</label>
            <label><input type="checkbox" class="filter_runner" value="Courtney Dauwalter"> Courtney Dauwalter</label>
            <label><input type="checkbox" class="filter_runner" value="François DHaene"> François DHaene</label>
            <label><input type="checkbox" class="filter_runner" value="Sara Alonso"> Sara Alonso</label>
            <label><input type="checkbox" class="filter_runner" value="Camille Herron"> Camille Herron</label>
            <label><input type="checkbox" class="filter_runner" value="Pau Capell"> Pau Capell</label>
            </div>

            <!-- PRICE SLIDER -->
            <div class="filter-group">
            <p class="filter-group-label">Max Price</p>
            <div class="price-slider-wrapper">
                <input type="range" id="filter_price_max" name="filter_price_max" min="0" max="1000" step="10" value="1000">
                <div class="price-slider-labels">
                    <span>0 €</span>
                    <span id="price_max_display">1000 €</span>
                </div>
            </div>
            </div>

            <!-- ORDER BY -->
            <div class="filter-group">
            <p class="filter-group-label">Sort by</p>
            <select id="orderby" name="orderby" class="shop-orderby-select">
                <option value="race_date">Race date</option>
                <option value="price">Price</option>
            </select>
            <button type="button" class="order-btn boton_filter">Apply sort</button>
            </div>

            <button class="boton_filter" id="btn_apply_filter">Search</button>
            <button class="filter_remove" id="btn_remove_filter">Remove</button>
        `);

    filter_button();
}

// ─── FILTER BUTTON ──────────────────
function filter_button() {

        var savedStatus = localStorage.getItem('filter_status');
        if (savedStatus) {
            $(`input[name="filter_status"][value="${savedStatus}"]`).prop('checked', true);
        }

        var savedDistance = localStorage.getItem('filter_distance');
        if (savedDistance) {
            $(`input[name="filter_distance"][value="${savedDistance}"]`).prop('checked', true);
        }

        var savedCircuits = JSON.parse(localStorage.getItem('filter_circuit') || '[]');
        savedCircuits.forEach(function(val) {
            $(`.filter_circuit[value="${val}"]`).prop('checked', true);
        });

        var savedLands = JSON.parse(localStorage.getItem('filter_land') || '[]');
        savedLands.forEach(function(val) {
            $(`.filter_land[value="${val}"]`).prop('checked', true);
        });

        var savedRunners = JSON.parse(localStorage.getItem('filter_runner') || '[]');
        savedRunners.forEach(function(val) {
            $(`.filter_runner[value="${val}"]`).prop('checked', true);
        });

        // ── Restaurar slider ────────────────────────────────
        var savedPriceMax = localStorage.getItem('filter_price_max');
        if (savedPriceMax) {
            $('#filter_price_max').val(savedPriceMax);
            $('#price_max_display').text(`${savedPriceMax} €`);
        }

        try {
            var ordRaw = localStorage.getItem('order');
            if (ordRaw) {
                var ord = JSON.parse(ordRaw);
                if (ord && ord[0] && ord[0].order !== undefined) {
                    $('#orderby').val(String(ord[0].order));
                }
            }
        } catch (e) { /* ignore */ }

        // Actualitzar slider
        $(document).on('input', '#filter_price_max', function () {
            $('#price_max_display').text(`${this.value} €`);
            localStorage.setItem('filter_price_max', this.value);
        });

        // GUARDAR ELS RADIOBUTTON
        $(document).on('change', 'input[name="filter_status"]', function () {
            localStorage.setItem('filter_status', this.value);
        });

        $(document).on('change', 'input[name="filter_distance"]', function () {
            localStorage.setItem('filter_distance', this.value);
        });

        // GUARDAR CHECKBOX EN ARRAYS
        $(document).on('change', '.filter_circuit', function () {
            var checked = $('.filter_circuit:checked').map(function() { return this.value; }).get();
            localStorage.setItem('filter_circuit', JSON.stringify(checked));
        });

        $(document).on('change', '.filter_land', function () {
            var checked = $('.filter_land:checked').map(function() { return this.value; }).get();
            localStorage.setItem('filter_land', JSON.stringify(checked));
        });

        $(document).on('change', '.filter_runner', function () {
            var checked = $('.filter_runner:checked').map(function() { return this.value; }).get();
            localStorage.setItem('filter_runner', JSON.stringify(checked));
        });

        // Botó SEARCH
        $(document).on('click', '#btn_apply_filter', function () {
            var filter = [];

            var status = localStorage.getItem('filter_status');
            if (status) filter.push(['status', status]);

            var distance = localStorage.getItem('filter_distance');
            if (distance) filter.push(['distance_name', distance]);

            var circuit = JSON.parse(localStorage.getItem('filter_circuit') || '[]');
            if (circuit.length) filter.push(['circuit_name', circuit[0]]);

            var land = JSON.parse(localStorage.getItem('filter_land') || '[]');
            if (land.length) filter.push(['land_name', land[0]]);

            var runner = JSON.parse(localStorage.getItem('filter_runner') || '[]');
            if (runner.length) filter.push(['id_runner', runner[0]]);

            var priceMax = localStorage.getItem('filter_price_max');
            if (priceMax && parseInt(priceMax) < 1000) {
            filter.push(['price_max', priceMax]);  
            }

            localStorage.removeItem('order');
            localStorage.setItem('filter', JSON.stringify(filter));
            window.location.reload();
            });

            // Botó REMOVE
            $(document).on('click', '#btn_remove_filter', function () {
                localStorage.removeItem('filter');
                localStorage.removeItem('order');
                localStorage.removeItem('filter_status');
                localStorage.removeItem('filter_runner');
                localStorage.removeItem('filter_distance');
                localStorage.removeItem('filter_circuit');
                localStorage.removeItem('filter_land');
                localStorage.removeItem('filter_runner');
                localStorage.removeItem('filter_price_max');
                window.location.reload();
            });
}

// ─── CLICK MORE INFO ──────────────────
function shopClicks() {
    $(document).on("click", ".more_info_list", function() {
        loadDetails(this.id);
    });
}

// ─── BACK TO LIST ──────────────────
function backToList() {
    if (window._mapOne) {
        window._mapOne.remove();
        window._mapOne = null;
    }
    $('#details-shop').fadeOut(200, function() {
        $('#shop-pagination').show();         
        $('#content_shop_running').fadeIn(200, function() {
            $('#map-all').show();
            if (window._mapAll) {
                window._mapAll.invalidateSize();
            }
        });
    });
}

// ─── MAPA TOTS ELS EVENTS ──────────────────
function mapLeaflet_all(data) {
    if (typeof L === 'undefined') return;
 
    // lleva el mapa d'abans i crea uno nou
    if (window._mapAll) {
        window._mapAll.remove();
        window._mapAll = null;
    }

    const map = L.map('map-all').setView([20.0, 10.0], 2);
    window._mapAll = map;
    setTimeout(function() { map.invalidateSize(true); }, 120);
    setTimeout(function() { map.invalidateSize(true); }, 420);

    // Title oscuro 
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
        noWrap: false
    }).addTo(map);

    const markerBounds = [];
    for (let row in data) {
        const lat = parseFloat(data[row].lat);
        const lon = parseFloat(data[row].lon);
        if (isNaN(lat) || isNaN(lon)) continue;
        markerBounds.push([lat, lon]);

        const statusColors = {
            'Open':     '#2ecc71',
            'Upcoming': '#f48c25',
            'Sold Out': '#e74c3c',
            'Closed':   '#95a5a6'
        };
        const statusColor = statusColors[data[row].status] || '#aaa';

        const popupContent = `
            <h3 style="text-align:center; margin-bottom:4px; font-family:Lexend,sans-serif;">${data[row].running_name}</h3>
            <p style="text-align:center; margin:2px 0;">📍 <b>${data[row].location}</b></p>
            <p style="text-align:center; margin:2px 0;">📅 <b>${data[row].race_date}</b></p>
            <p style="text-align:center; margin:2px 0;">🏃 <b>${data[row].race_km} km</b></p>
            <p style="text-align:center; margin:4px 0;">
                <span style="background:${statusColor}; color:#fff; padding:2px 8px; border-radius:10px; font-size:0.85em;">
                    ${data[row].status}
                </span>
            </p>
            <img src="${data[row].running_image}" style="width:100%; border-radius:6px; margin:6px 0;" onerror="this.style.display='none'"/>
            <a class="button button-primary-outline button-ujarak button-size-1 wow fadeInLeftSmall link more_info_list"
               data-wow-delay=".4s"
               id="${data[row].id_running}">See more</a>`;

        L.marker([lat, lon])
            .bindPopup(popupContent)
            .addTo(map);
    }

    if (markerBounds.length > 0) {
        map.fitBounds(markerBounds, { padding: [30, 30], maxZoom: 6 });
    }
}

// ─── MAPA DETALL──────────────────
function mapLeaflet_one(data) {
    if (typeof L === 'undefined') return;
    if (!data.lat || !data.lon) {
        document.getElementById('map-detail').style.display = 'none';
        return;
    }

    if (window._mapOne) {
        window._mapOne.remove();
        window._mapOne = null;
    }

    var container = document.getElementById('map-detail');
    container.style.display = 'block';         
    container.style.height = '350px';           

    const map = L.map('map-detail').setView([parseFloat(data.lat), parseFloat(data.lon)], 10);
    window._mapOne = map;

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CARTO',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    const statusColors = {
        'Open':     '#2ecc71',
        'Upcoming': '#f48c25',
        'Sold Out': '#e74c3c',
        'Closed':   '#95a5a6'
    };
    const statusColor = statusColors[data.status] || '#aaa';

    const popupContent = `
        <div style="font-family:Lexend,sans-serif; min-width:180px;">
            <h3 style="margin:0 0 6px; font-size:14px; text-align:center;">${data.running_name}</h3>
            <p style="margin:2px 0; text-align:center;">📍 <b>${data.location}</b></p>
            <p style="margin:2px 0; text-align:center;">📅 <b>${data.race_date}</b></p>
            <p style="margin:2px 0; text-align:center;">🏃 <b>${data.race_km} km</b></p>
            <p style="margin:6px 0; text-align:center;">
                <span style="background:${statusColor}; color:#fff; padding:2px 10px; border-radius:10px; font-size:12px;">
                    ${data.status}
                </span>
            </p>
        </div>`;

    L.marker([parseFloat(data.lat), parseFloat(data.lon)])
        .bindPopup(popupContent)
        .openPopup()
        .addTo(map);
}

function runnings_related(loadeds = 0, type_running, total_items) {
    let items = 3;
    let loaded = loadeds;
    let type = type_running;
    let total_item = total_items;

    ajaxPromise("POST", "JSON", "module/shop/controller/controller_shop.php?op=runnings_related", { 'type': type, 'loaded': loaded, 'items': items, 'id_running': window._id_running_similar || '' })
        .then(function(data) {
            if (loaded == 0) {
                $('<div></div>').attr({ 'id': 'title_content', class: 'title_content' }).appendTo('.results')
                    .html(
                        '<h2 class="cat">Runnings related</h2>'
                    )
                for (row in data) {
                    if (data[row].id_running != undefined) {
                        $('<div></div>').attr({ 'id': data[row].id_running, 'class': 'more_info_list' }).appendTo('.title_content')
                            .html(
                                `<li class='portfolio-item'>
                                    <div class='item-main'>
                                        <div class='portfolio-image'>
                                            <img src=${data[row].running_image} alt='imagen running' </img>
                                        </div>
                                        <h5>${data[row].location}  ${data[row].running_name}</h5>
                                    </div>
                                </li>`
                            )
                    }
                }
                $('<div></div>').attr({ 'id': 'more_running__button', 'class': 'more_running__button' }).appendTo('.title_content')
                    .html(
                        '<button class="load_more_button" id="load_more_button">LOAD MORE</button>'
                    )
            }
            if (loaded >= 3) {
                for (row in data) {
                    if (data[row].id_running != undefined) {
                        console.log(data);
                        $('<div></div>').attr({ 'id': data[row].id_running, 'class': 'more_info_list' }).appendTo('.title_content')
                            .html(
                                `<li class='portfolio-item'>
                                    <div class='item-main'>
                                        <div class='portfolio-image'>
                                            <img src=${data[row].running_image} alt='imagen running' </img>
                                        </div>
                                        <h5>${data[row].location}  ${data[row].running_name}</h5>
                                    </div>
                                </li>`
                            )
                    }
                }
                var total_runnings = total_item - 3;
                if (total_runnings <= loaded) {
                    $('.more_running__button').empty();
                    $('<div></div>').attr({ 'id': 'more_running__button', 'class': 'more_running__button' }).appendTo('.title_content')
                        .html(
                            `</br><button class='btn-notexist' id='btn-notexist'></button>`
                        )
                } else {
                    $('.more_running__button').empty();
                    $('<div></div>').attr({ 'id': 'more_running__button', 'class': 'more_running__button' }).appendTo('.title_content')
                        .html(
                            '<button class="load_more_button" id="load_more_button">LOAD MORE</button>'
                        )
                }
            }
        }).catch(function() {
            console.log("error runnings_related");
        });
}

function more_running_related(type_running){
    var type_running = type_running;
    var items = 0;
    ajaxPromise('POST', 'JSON', 'module/shop/controller/controller_shop.php?op=count_running_related', { 'type': type_running, 'id_running': window._id_running_similar || '' })
        .then(function(data) {
            var total_items = data[0].n_prod;
            runnings_related(0, type_running, total_items);
            $(document).on("click", '.load_more_button', function() {
                items = items + 3;
                $('.more_running__button').empty();
                runnings_related(items, type_running, total_items);
            });
        }).catch(function() {
            console.log('error total_items');
        });
}

function save_orderby() {
    $(document).on('click', '.order-btn', function() {
        var orderby = [];

        if ($('#orderby').val() == 0) {
            orderby.push({ "order": '0' });
        } else {
            orderby.push({ "order": $('#orderby').val() });
        }

        localStorage.removeItem('filter');
        localStorage.setItem('order', JSON.stringify(orderby));
        SHOP_OFFSET = 0;
        SHOP_LAST_ORDER = orderby[0].order;
        SHOP_LAST_URL = "module/shop/controller/controller_shop.php?op=all_running";
        SHOP_LAST_FILTER = null;
        ajaxForSearch(SHOP_LAST_URL);
    });
}

function updateMostVisited(id){
     ajaxPromise('module/shop/controller/controller_shop.php?op=update_most_visited&id=' + id, 'GET', 'JSON')
}

// ─── INIT ──────────────────
$(document).ready(function() {
    loadShop();
    shopClicks();
    print_filters();
    filter_button();
    save_orderby();
    initPaginationEvents();
});