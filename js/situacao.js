function situacaochamado(callback) {
    $.get( "http://192.168.2.220/ck/situacao", function( data ) {
        callback(data)
    });
}