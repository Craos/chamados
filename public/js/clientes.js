function listarclientes(callback) {
    $.get( config.endpoint + "/ck/clientes", function( data ) {
        callback(data)
    });
}