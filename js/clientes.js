function listarclientes(callback) {
    $.get( "http://192.168.2.220/ck/clientes", function( data ) {
        callback(data)
    });
}