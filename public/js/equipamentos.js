let listaequipamentos, equipamentosoptions = [];

function listarequipamentos(callback) {
    $.get( config.endpoint + "/ck/equipamentos", function( data ) {

        listaequipamentos = data;

        data.filter(function (item) {
            equipamentosoptions.push({value: item.id, text: item.nome});
        });

        callback(data)
    });
}