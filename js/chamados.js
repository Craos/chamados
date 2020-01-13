
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
                header: false,
                height: 280,
                fix_size: [true,null],
            },
        ]
    });

    layoutchamados.cells('a').attachToolbar({
        items:[
            {id: "novo", type: "button", text: "Novo", img: "./img/novo.png"},
            {id: "enviar", type: "button", text: "Enviar", img: "./img/salvar.png"},
            {id: "sep1", type: "separator" },
            {id: "excluir", type: "button", text: "Excluir", img: "./img/excluir.png"},
            {id: "sep1", type: "separator" },
            {id: "ajuda", type: "button", img: "./img/ajuda.png"},
        ],

        onClick: function (id) {
            if (id === 'enviar') {
                let dados = formulario.getFormData();
                Enviar(dados);

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
            } else if(id === 'novoevento'){
                formulario.clear();

                formulario.setItemValue('data_inicio', window.dhx.date2str(new Date(), '%d/%m/%Y'));
                formulario.setItemValue('hora_inicio', window.dhx.date2str(new Date(), '%H:%i:%s'));

            }else if(id === 'excluir'){
                $.ajax({
                    type: "DELETE",
                    url: 'http://api/ck/uptime?id=eq.' + registros.getSelectedRowId(),
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

    let formulario =   layoutchamados.cells("a").attachForm(Form_Chamados);

    let chamados = layoutchamados.cells('b').attachGrid();

    chamados.setHeader("Chamado, Data, Assunto, Solicitação, Solicitante");
    chamados.setInitWidths("100,100,400,400,100");
    chamados.setColAlign("left,left,left,left");
    chamados.setColSorting("int,int,str,str,str");
    chamados.init();

    let Enviar = function(data, callback) {
        $.ajax({
            type: "POST",
            url: 'http://api/ck/chamados',
            dataType: "json",
            headers: {
                Prefer: "return=representation",
                Accept: "application/vnd.pgrst.object+json"
            },
            success: function () {
                callback()
            },
            data: data
        }).fail(function (jqXHR) {
            console.debug('Ocorreu algum erro ao tentar conectar-se ao banco de dados.')
        });
    };
}

