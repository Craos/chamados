function situacaochamado(callback) {
    $.get( config.endpoint + "/ck/situacao", function( data ) {
        callback(data)
    });
}