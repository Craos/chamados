function listarequipamentos(callback) {
    $.get( "http://192.168.2.220/ck/equipamentos", function( data ) {
        callback(data)
    });
}