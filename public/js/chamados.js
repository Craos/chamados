
function chamados() {
    let layoutchamados = mySidebar.cells('chamados').attachLayout({
        pattern:    "2E",
        offsets: {
            top:    5,
            right:  10,
            bottom: 5,
            left:   10
        },

        cells: [
            {
                id: "a",
                text: "Novo Cadastro",
                header: false,

            },
            {
                id: "b",
                header: true,
                text: "Chamados Registrados",
                height: 280,
                fix_size: [true,null],
            },
        ]
    });

    layoutchamados.cells('a').attachToolbar({
        iconset: "awesome",
        items:[
            {id: "novo", type: "button", text: "Novo", img: "fas fa-plus"},
            {id: "enviar", type: "button", text: "Enviar", img: "fas fa-share"},
            {id: "sep1", type: "separator" },
            {id: "excluir", type: "button", text: "Excluir", img: "far fa-trash-alt"},
            {id: "sep1", type: "separator" },
            {id: "ajuda", type: "button", img: "fas fa-question-circle"},
        ],

        onClick: function (id) {
            if (id === 'enviar') {
                let dados = form_chamados.getFormData();
                enviarchamado(dados, atualizargrid);

                dhtmlx.message.position="top";
                dhtmlx.message("Registro enviado com Sucesso!");

            } else if (id === 'finalizar'){
                dhtmlx.message.position="top";
                dhtmlx.message("Registro enviado com Sucesso!");
                if (registros.getSelectedRowId() === null){
                    dhtmlx.message('Houve um erro ao aplicar um retorno. Por favor, insira um novo registro e tente novamente.');
                    dhtmlx.alert({
                        title:"Aviso!",
                        type:"alert-error",
                        text:"Faça um novo Registro para continuar com a operação!"
                    });
                }
                finalizar(registros.getSelectedRowId(), atualizargrid);
            } else if(id === 'excluir'){
                $.ajax({
                    type: "DELETE",
                    url: config.endpoint + '/ck/chamados?id=eq.' + chamadoslayout.getSelectedRowId(),
                    dataType: "json",
                    headers: {
                        Prefer: "return=representation",
                        Accept: "application/vnd.pgrst.object+json"
                    },
                    success: function () {
                        atualizargrid();
                        dhtmlx.message.position="top";
                        dhtmlx.message("Registro excluido.");
                    },
                }).fail(function (jqXHR) {
                    console.debug('Ocorreu algum erro ao tentar conectar-se ao banco de dados.')
                });
            }
        }
    });

    let form_chamados = layoutchamados.cells("a").attachForm();

    form_chamados.loadStruct(Form_Chamados, function () {

        let comboclientes = form_chamados.getCombo('cliente');

        listarclientes(function (response) {

            let itens = [];
           response.filter(function (item) {
               itens.push({value: item.id, text: item.nome});
           });
            comboclientes.addOption(itens);

        });
    });


    let chamadoslayout = layoutchamados.cells('b').attachGrid();

    chamadoslayout.setHeader("Chamado, Data, Assunto, Solicitação, Solicitante");
    chamadoslayout.setInitWidths("80,135,400,400");
    chamadoslayout.setColAlign("center,left,left,left");
    chamadoslayout.init();

    atualizargrid();

    function atualizargrid() {

        chamadoslayout.clearAll();

        $.get( config.endpoint + "/ck/chamados", function( data ) {
            data.filter(function (item) {

                let filedate = window.dhx.date2str(new Date(item.filedate), '%d/%m/%Y - %H:%i');

                chamadoslayout.addRow(item.id, [item.numero, filedate, item.assunto, item.solicitacao, item.solicitante]);
            });
        });
    };

        let enviarchamado = function(data, callback) {
        $.ajax({
            type: "POST",
            url: config.endpoint + '/ck/chamados',
            dataType: "json",
            headers: {
                Prefer: "return=representation",
                Accept: "application/vnd.pgrst.object+json"
            },
            success: function () {
                callback();
            },
            data: data
        }).fail(function (jqXHR) {
            console.debug('Ocorreu algum erro ao tentar conectar-se ao banco de dados.')
        });
    };
}

