function load_brands() {
    $('.search_brand').empty();
    $('<option value="">Circuits</option>').prop('selected', true).appendTo('.search_brand');

    ajaxPromise('POST', 'JSON', 'module/search/controller/controller_search.php?op=search_brand')
        .then(function (data) {
            if (!Array.isArray(data)) return;
            data.forEach(function (row) {
                const label = row && row.circuit_name ? String(row.circuit_name).trim() : '';
                if (!label) return;
                $('<option value="' + label + '">' + label + '</option>').appendTo('.search_brand');
            });
        }).catch(function () {
            window.location.href = "index.php?page=controller_home&op=view";
        });
}

function load_category(brand) {
    $('.search_category').empty();
    $('<option value="">Category</option>').prop('selected', true).appendTo('.search_category');

    if (brand == undefined) {
        ajaxPromise('POST', 'JSON', 'module/search/controller/controller_search.php?op=search_category_null')
            .then(function (data) {
                if (!Array.isArray(data)) return;
                data.forEach(function (row) {
                    const label = row && row.distance_name ? String(row.distance_name).trim() : '';
                    if (!label) return;
                    $('<option value="' + label + '">' + label + '</option>').appendTo('.search_category');
                });
            }).catch(function () {
                window.location.href = "index.php?page=controller_home&op=view";
            });
    }
    else {
        ajaxPromise('POST', 'JSON', 'module/search/controller/controller_search.php?op=search_category', { brand: brand })
            .then(function (data) {
                if (!Array.isArray(data)) return;
                data.forEach(function (row) {
                    const label = row && row.distance_name ? String(row.distance_name).trim() : '';
                    if (!label) return;
                    $('<option value="' + label + '">' + label + '</option>').appendTo('.search_category');
                });
            }).catch(function () {
                window.location.href = "index.php?page=controller_home&op=view";
            });
    }
}

function launch_search() {
    load_brands();
    load_category();
    $(document).on('change', '.search_brand', function () {
        let brand = $(this).val();
        if (!brand || brand === 'Brand') {
            load_category();
        } else {
            load_category(brand);
        }
    });
}

function autocomplete() {
    let typingTimer = null;
    let requestCounter = 0;

    $(document).off('click', '.searchElement');
    $(document).on('click', '.searchElement', function () {
        $('#autocom').val(this.getAttribute('id'));
        $('#search_auto').fadeOut(200);
    });

    $(document).off('click.searchHide scroll.searchHide');
    $(document).on('click.searchHide scroll.searchHide', function (event) {
        if (event.target.id !== 'autocom') {
            $('#search_auto').fadeOut(200);
        }
    });

    $("#autocom").off("input.autocomplete").on("input.autocomplete", function () {
        const inputValue = $(this).val().trim();
        $('#search_auto').empty();

        if (typingTimer) {
            clearTimeout(typingTimer);
        }

        if (inputValue.length < 1) {
            $('#search_auto').fadeOut(150);
            return;
        }

        typingTimer = setTimeout(function () {
            const currentRequest = ++requestCounter;
            let sdata = { complete: inputValue };

            let brandVal = $('.search_brand').val();
            let categoryVal = $('.search_category').val();

            if (brandVal) {
                sdata.brand = brandVal;
            }

            if (categoryVal) {
                sdata.category = categoryVal;
            }

            ajaxPromise('POST', 'JSON', 'module/search/controller/controller_search.php?op=autocomplete', sdata)
                .then(function (data) {
                    // Ignore outdated responses if user kept typing.
                    if (currentRequest !== requestCounter) return;

                    $('#search_auto').empty();
                    if (!Array.isArray(data) || data.length === 0) {
                        $('#search_auto').fadeOut(150);
                        return;
                    }

                    let added = 0;
                    data.forEach(function (row) {
                        const location = row && row.location ? String(row.location).trim() : '';
                        if (!location) return;
                        $('<div></div>').appendTo('#search_auto').html(location).attr({ 'class': 'searchElement', 'id': location });
                        added++;
                    });

                    if (added > 0) {
                        $('#search_auto').fadeIn(150);
                    } else {
                        $('#search_auto').fadeOut(150);
                    }
                }).catch(function () {
                    $('#search_auto').fadeOut(150);
                });
        }, 180);
    });
}

function button_search() {
    $('#search-btn').on('click', function () {
        var search = [];
        var brandVal = $('.search_brand').val();
        var categoryVal = $('.search_category').val();
        var locationVal = $('#autocom').val().trim();
        
        if (brandVal) {
            search.push(['circuit_name', brandVal]);
        }

        if (categoryVal) {
            search.push(['distance_name', categoryVal]);
        }

        if (locationVal !== '') {
            search.push(['location', locationVal]);
        }

        localStorage.removeItem('filter');
        if (search.length != 0) {
            localStorage.setItem('filter', JSON.stringify(search));
        }
        window.location.href = 'index.php?page=controller_shop&op=view';
    });
}

$(document).ready(function () {
    launch_search();
    autocomplete();
    button_search();
});