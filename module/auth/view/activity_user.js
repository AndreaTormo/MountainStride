// ================AJAX-PROMISE================
function ajaxPromise(sUrl, sType, sTData, sData = undefined) {
    // Compatibility: handle method-first calls like ajaxPromise('POST', 'JSON', 'url', data)
    if (typeof sUrl === 'string' &&
        (sUrl.toUpperCase() === 'GET' || sUrl.toUpperCase() === 'POST' ||
         sUrl.toUpperCase() === 'PUT'  || sUrl.toUpperCase() === 'DELETE')) {
        var _m = sUrl; sUrl = sTData; sTData = sType; sType = _m;
    }
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData,
            beforeSend: function() {
                $("#overlay").fadeIn(300);
            }
        }).done((data) => {
            setTimeout(function() {
                $("#overlay").fadeOut(300);
            }, 500);
            resolve(data)

        }).fail((jqXHR, textStatus, errorThrow) => {
            setTimeout(function() { $("#overlay").fadeOut(300); }, 500);
            reject(errorThrow);
        });
    });
}

