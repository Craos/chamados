function listarequipamentos(callback) {
    $.get( config.endpoint + "/ck/equipamentos", function( data ) {
        callback(data)
    });
}