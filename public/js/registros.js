function registros() {

    let that = this;
    let user = JSON.parse(sessionStorage.user);


    let layout = mySidebar.cells('registros').attachLayout({
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
                text: "Eventos Registrados",
                height: 280,
                fix_size: [true,null],
            },
        ]
    });

    layout.cells('a').attachToolbar({
        iconset: "awesome",
        items:[
            {id: "novoevento", type: "button", text: "Novo", img: "fas fa-plus"},
            {id: "enviar", type: "button", text: "Enviar", img: "fas fa-share"},
            {id: "sep1", type: "separator" },
            {id: "finalizar", type: "button", text: "Finalizar", img: "fas fa-check-double"},
            {id: "excluir", type: "button", text: "Excluir", img: "far fa-trash-alt"},
            {id: "sep1", type: "separator" },
            {id: "ajuda", type: "button", img: "fas fa-question-circle"},
        ],

        onClick: function (id) {
            if (id === 'enviar') {
                let dados = formulario.getFormData();
                dados.situacao = 'Em aberto';

                let user = JSON.parse(sessionStorage.user);

                console.log(user);

                dados.condominio = user.userinfo.condominio;

                Enviar(dados, atualizargrid);

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
    
    let formulario = layout.cells("a").attachForm();

    formulario.loadStruct(Form_Registros, function () {

        let comboequipamentos = formulario.getCombo('equipamento');

        comboequipamentos.addOption(equipamentosoptions);
    });

    let registros = layout.cells('b').attachGrid();

    registros.setHeader("Data Inicio,Hora Inicio, Equipamento, Descrição do Equipamento, Situação, Data de Retorno, Horario de Retorno");
    registros.setInitWidths("100,100,150,400,150,150");
    registros.setColAlign("left,left,left,left");
    registros.setColSorting("int,str,str,int");
    registros.init();

    function atualizargrid() {

        registros.clearAll();


        $.get( "http://api/ck/uptime?condominio=eq." + user.userinfo.condominio, function( data ) {
            data.filter(function (item) {

                let data_inicio = window.dhx.date2str(new Date(item.data_inicio), '%d/%m/%Y');
                let data_final = (item.data_final !== null) ? window.dhx.date2str(new Date(item.data_final), '%d/%m/%Y') : null;
                let hora_final = (item.hora_final !== null) ? window.dhx.date2str(new Date(item.data_final + ' ' + item.hora_final), '%H:%i:%s') : null;

                let exibirequipamento = 'Não definido';

                listaequipamentos.filter(function (i) {
                    if(i.id === item.equipamento){
                        exibirequipamento = i.nome;
                    }
                });

                registros.addRow(item.id, [data_inicio, item.hora_inicio, exibirequipamento, item.descricao, item.cliente,  item.situacao, data_final, hora_final, item.situacao]);
            });
        });

    }

    atualizargrid();

    function finalizar(id, callback) {
        $.ajax({
            type: "PATCH",
            url: 'http://api/ck/uptime?id=eq.' + id,
            dataType: "json",
            headers: {
                Prefer: "return=representation",
                Accept: "application/vnd.pgrst.object+json"
            },
            success: function () {
                callback()
            },
            data: {
                data_final: window.dhx.date2str(new Date(), '%d/%m/%Y'),
                hora_final: window.dhx.date2str(new Date(), '%H:%i:%s'),
                situacao: 'Retornou'
            }
        }).fail(function (jqXHR) {
            console.debug('Ocorreu algum erro ao tentar conectar-se ao banco de dados.')
        });
    }

    let Enviar = function(data, callback) {
        $.ajax({
            type: "POST",
            url: 'http://api/ck/uptime',
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