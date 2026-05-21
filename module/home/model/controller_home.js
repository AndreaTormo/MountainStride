/**
 * Hero carousel (slide 0…n): filtros aplicados al abrir el shop.
 * null = todas las carreras. Los nombres deben coincidir con `circuit_name` en BD (mismos que en filtros del shop).
 */
var HERO_SHOP_FILTERS_BY_SLIDE = [
    null,
    [['circuit_name', 'UTMB World Series']],
    [['circuit_name', 'Golden Trail Series']],
    [['circuit_name', 'Majors']],
    [['circuit_name', 'ITRA Ultra Tour']]
];

function goShopFromHeroCarousel() {
    var idx = typeof window.heroSlideIndex === 'number' ? window.heroSlideIndex : 0;
    idx = Math.max(0, Math.min(idx, HERO_SHOP_FILTERS_BY_SLIDE.length - 1));
    var def = HERO_SHOP_FILTERS_BY_SLIDE[idx];
    localStorage.removeItem('filter_from_home');
    localStorage.removeItem('order');
    localStorage.removeItem('open_first_result');
    if (def && def.length) {
        localStorage.setItem('filter', JSON.stringify(def));
    } else {
        localStorage.removeItem('filter');
    }
    window.location.href = 'index.php?page=controller_shop&op=view';
}

function loadRunning() {

    ajaxPromise('GET', 'JSON', 'module/home/controller/controller_home.php?op=homePageRunning')
    .then(function(data) {
        const wrapper = $('#evTrack');
        wrapper.empty();

        for (let row = 0; row < data.length; row++) {
            const race = data[row];
            wrapper.append(`
                <div class="ev-card">
                    <img src="${race.running_image || ''}" alt="${race.running_name || 'Race'}" onerror="this.style.display='none'"/>
                    <div class="ev-overlay"></div>
                    <div class="ev-price">
                        <span class="ev-price-label">Distance</span>
                        <span class="ev-price-val">${race.race_km || '-'} km</span>
                    </div>
                    <div class="ev-content">
                        <span class="ev-tag">📅 ${race.race_date || '-'}</span>
                        <h3 class="ev-title">${race.running_name || ''}</h3>
                        <p class="ev-loc"><span class="ev-dot"></span>${race.location || ''}</p>
                        <button class="ev-btn btn-running" data-running="${race.id_running}">More info</button>
                    </div>
                </div>
            `);
        }

        if (typeof window.initEventsCarousel === 'function') {
            window.initEventsCarousel();
        }

    }).catch(function() {
        
    });
}

function loadCircuits() {

    ajaxPromise('GET', 'JSON', 'module/home/controller/controller_home.php?op=homePageCircuits')
    .then(function(data) {
        var wrapper = $('#circTrack');
        wrapper.empty();

        for (let row = 0; row < data.length; row++) {
            $('<div></div>')
                .addClass("cat-slide")
                .appendTo('#circTrack')
                .html(`
                    <div class="user_card" id="${data[row].id_circuit}">
                        <div class="cat-img-wrap">
                            <span class="cat-badge">🏆</span>
                            <img
                                class="cat-img"
                                src="${data[row].circuit_image || ''}"
                                alt="${data[row].circuit_name || 'Circuit'}"
                                onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
                            />
                            <div class="cat-fallback">
                                ${(data[row].circuit_name || 'C').charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <div class="cat-body">
                            <h3 class="cat-name">${data[row].circuit_name || ''}</h3>
                            <div class="cat-footer">
                                <button class="btn-ticket btn-circuit" data-circuit="${data[row].id_circuit}">More info</button>
                            </div>
                        </div>
                    </div>
                `);
        }

        if (typeof window.initCatCarousel === 'function') {
            window.initCatCarousel('circTrack', 'circPrev', 'circNext', 'circDots');
        }

    }).catch(function() {
       
    });
}

function loadDistance() {

    // ajaxPromise('module/home/controller/controller_home.php?op=homePageDistance','GET', 'JSON')
    ajaxPromise('GET', 'JSON', 'module/home/controller/controller_home.php?op=homePageDistance')
    .then(function(data) {
        var wrapper = $('#distTrack');
        wrapper.empty();

        for (let row = 0; row < data.length; row++) {
            $('<div></div>')
                .addClass("cat-slide")
                .appendTo('#distTrack')
                .html(`
                    <div class="user_card" id="${data[row].id_distance}">
                        <div class="cat-img-wrap">
                            <span class="cat-badge">📏</span>
                            <img
                                class="cat-img"
                                src="${data[row].distance_image || ''}"
                                alt="${data[row].distance_name || 'Distance'}"
                                onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
                            />
                            <div class="cat-fallback">
                                ${(data[row].distance_name || 'D').charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <div class="cat-body">
                            <h3 class="cat-name">${data[row].distance_name || ''}</h3>
                            <div class="cat-footer">
                                <button class="btn-ticket btn-distance" data-distance="${data[row].id_distance}">More info</button>
                            </div>
                        </div>
                    </div>
                `);
        }

        if (typeof window.initCatCarousel === 'function') {
            window.initCatCarousel('distTrack', 'distPrev', 'distNext', 'distDots');
        }

    }).catch(function() {
        
    });
}

function loadLand() {

    // ajaxPromise('module/home/controller/controller_home.php?op=homePageLand','GET', 'JSON')
    ajaxPromise('GET', 'JSON', 'module/home/controller/controller_home.php?op=homePageLand')
    .then(function(data) {
        var wrapper = $('#landTrack');
        wrapper.empty();

        for (let row = 0; row < data.length; row++) {
            $('<div></div>')
                .addClass("cat-slide")
                .appendTo('#landTrack')
                .html(`
                    <div class="user_card" id="${data[row].id_land}">
                        <div class="cat-img-wrap">
                            <span class="cat-badge">🗻</span>
                            <img
                                class="cat-img"
                                src="${data[row].land_image || ''}"
                                alt="${data[row].land_name || 'Land'}"
                                onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
                            />
                            <div class="cat-fallback">
                                ${(data[row].land_name || 'L').charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <div class="cat-body">
                            <h3 class="cat-name">${data[row].land_name || ''}</h3>
                            <div class="cat-footer">
                                <button class="btn-ticket btn-land" data-land="${data[row].id_land}">More info</button>
                            </div>
                        </div>
                    </div>
                `);
        }

        if (typeof window.initCatCarousel === 'function') {
            window.initCatCarousel('landTrack', 'landPrev', 'landNext', 'landDots');
        }

    }).catch(function() {
        
    });
}

function loadRunners() {

    // ajaxPromise('module/home/controller/controller_home.php?op=homePageRunners','GET', 'JSON')
    ajaxPromise('GET', 'JSON', 'module/home/controller/controller_home.php?op=homePageRunners')
    .then(function(data) {
        const wrapper = $('#containerRunners');
        wrapper.empty();

        for (let row = 0; row < data.length; row++) {
            const wins = data[row].runner_wins || 0;
            const km = data[row].runner_km || 0;
            wrapper.append(`
                <div class="runner-card" id="${data[row].id_runner}">
                    <span class="runner-rank-bg">${wins}</span>
                    <div class="runner-img-wrap">
                        <img class="runner-img"
                             src="${data[row].runner_image || ''}"
                             alt="${data[row].runner_name || 'Runner'}"
                             onerror="this.style.display='none'; this.closest('.runner-img-wrap').insertAdjacentHTML('beforeend', '<div class=&quot;cat-fallback&quot; style=&quot;display:flex;position:absolute;inset:0;&quot;>${(data[row].runner_name || 'R').charAt(0).toUpperCase()}</div>');"/>
                        <span class="runner-medal">🏅</span>
                    </div>
                    <div class="runner-body">
                        <p class="runner-name">${data[row].runner_name || ''}</p>
                        <p class="runner-country">${data[row].runner_country || 'Elite Runner'}</p>
                        <div class="runner-meta">
                            <span class="runner-pill">${wins} wins</span>
                            <span class="runner-pill">${Number(km).toLocaleString()} km</span>
                        </div>
                        <div class="runner-footer">
                            <button class="btn-ticket btn-runner" data-runner="${data[row].id_runner}">More info</button>
                        </div>
                    </div>
                </div>
            `);
        }

    }).catch(function() {
        
    });
}

function formatMostVisitedDate(raceDate) {
    var MESES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    if (!raceDate) {
        return '-';
    }
    var s = String(raceDate).trim().split(/[T\s]/)[0];
    var parts = s.split('-');
    if (parts.length >= 3) {
        var mes = MESES[parseInt(parts[1], 10) - 1] || '';
        return (parts[2] || '') + ' ' + mes + ' ' + (parts[0] || '');
    }
    return s;
}

function loadMostVisited() {
    ajaxPromise('GET', 'JSON', 'module/home/controller/controller_home.php?op=homePageMostVisited')
    .then(function(data) {
        $('#containerMostVisited').empty();

        if (!Array.isArray(data) || data === 'error' || !data.length) {
            return;
        }

        for (let row = 0; row < data.length; row++) {
            const r = data[row];
            if (!r || !r.id_running) {
                continue;
            }
            const img = r.running_image || r.circuit_image || '';
            const dateLabel = formatMostVisitedDate(r.race_date);

            $('<div></div>')
                .attr({ id: r.id_running, class: 'running-card' })
                .appendTo('#containerMostVisited')
                .html(`
                    <img class="running-card-img" src="${img}" alt="${r.running_name || ''}" onerror="this.style.display='none'"/>
                    <div class="running-card-body">
                        <p class="running-name">${r.running_name || ''}</p>
                        <div class="running-meta">
                            <span class="running-meta-item">
                                <span class="material-symbols-outlined">circuit</span>
                                ${r.circuit_name || ''}
                            </span>
                            <span class="running-meta-item">
                                <span class="material-symbols-outlined">calendar_month</span>
                                ${dateLabel}
                            </span>
                        </div>
                        <div class="running-card-footer">
                            <span class="running-price-badge">${r.price != null ? r.price : ''}€</span>
                            <button class="btn-tickets btn-running" data-running="${r.id_running}">View tickets</button>
                        </div>
                    </div>
                `);
        }

        if ($('#containerMostVisited').children().length && typeof window.initCatCarousel === 'function') {
            window.initCatCarousel('containerMostVisited', null, null, 'mostDots');
        }
    }).catch(function() {
        console.error('Error loading most visited');
    });
}

function homeClicks() {

    $(document).on('click', '#heroShopLink', function (e) {
        if ($(e.target).closest('.hero-btns').find('button, a').length) {
            return;
        }
        goShopFromHeroCarousel();
    });

    $(document).on('keydown', '#heroShopLink', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            goShopFromHeroCarousel();
        }
    });

    // ── RUNNING
    $(document).on("click", '.btn-running', function () {
        var id_running = $(this).data('running');
        localStorage.removeItem('filter_from_home');
        localStorage.removeItem('filter');
        localStorage.setItem('filter_from_home', id_running);
        window.location.href = 'index.php?page=controller_shop&op=view';
    });
 
    // ── CIRCUIT
    $(document).on("click", '.btn-circuit', function () {
        var id_circuit = $(this).data('circuit');
        var filter = [['id_circuit', id_circuit]];
        localStorage.removeItem('filter_from_home');
        localStorage.removeItem('filter');
        localStorage.setItem('open_first_result', '1');
        localStorage.setItem('filter', JSON.stringify(filter));
        window.location.href = 'index.php?page=controller_shop&op=view';
    });
 
    // ── DISTANCE
    $(document).on("click", '.btn-distance', function () {
        var id_distance = $(this).data('distance');
        var filter = [['id_distance', id_distance]];
        localStorage.removeItem('filter_from_home');
        localStorage.removeItem('filter');
        localStorage.setItem('open_first_result', '1');
        localStorage.setItem('filter', JSON.stringify(filter));
        window.location.href = 'index.php?page=controller_shop&op=view';
    });
 
    // ── LAND
    $(document).on("click", '.btn-land', function () {
        var id_land = $(this).data('land');
        var filter = [['id_land', id_land]];
        localStorage.removeItem('filter_from_home');
        localStorage.removeItem('filter');
        localStorage.setItem('open_first_result', '1');
        localStorage.setItem('filter', JSON.stringify(filter));
        window.location.href = 'index.php?page=controller_shop&op=view';
    });
 
    // ── RUNNER
    $(document).on("click", '.btn-runner', function () {
        var id_runner = $(this).data('runner');
        var filter = [['id_runner', id_runner]];
        localStorage.removeItem('filter_from_home');
        localStorage.removeItem('filter');
        localStorage.setItem('open_first_result', '1');
        localStorage.setItem('filter', JSON.stringify(filter));
        window.location.href = 'index.php?page=controller_shop&op=view';
    });
}

/* ─── INIT ──────────────────────────────────────────────── */
$(document).ready(function () {
    loadRunning();
    loadCircuits();
    loadDistance();
    loadLand();
    loadRunners();
    loadMostVisited();
    homeClicks();
});