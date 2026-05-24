function ajaxPromise(sType, sTData, sUrl, sData = undefined) {
    if (typeof sType === 'string' && (sType.indexOf('.php') !== -1 || sType.indexOf('module/') === 0)) {
        var url = sType;
        sType = sTData;
        sTData = sUrl;
        sUrl = url;
    }
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        }); 
    });
};


