$(document).ready(function () {

    let that = this;

    var mySidebar = new dhtmlXSideBar({

        parent:         document.body,
         template:       "icons",
        icons_path:     "icons/",
        single_cell:    false,
        bubble:         6,
        width:          50,
        header:         true,
        autohide:       false,
        xml:            "sidebar.xml",
        json:           "sidebar.json",
        onload:         function(){},
        items: [
            {
                id:         "chamados",
                text:       "Abertura de Chamado",
                icon:       "../img/chamado.png",
                selected:   true
            },
            // separator config
            {
                id:         "sep1",
                type:       "separator"
            },
            {
                id:         "registros",
                text:       "Registro de Eventos",
                icon:       "../img/registro.png",
                selected:   true
            },
            // separator config
            {
                id:         "sep1",
                type:       "separator"
            },
            {
                id:         "configuracoes",
                text:       "Configurações",
                icon:       "../img/configuracoes.png",
                selected:   false
            },
        ]
    });

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
                header: false,
                height: 280,
                fix_size: [true,null],
            },
        ]
    });


    layout.cells('a').attachToolbar({
        items:[
            {id: "novoevento", type: "button", text: "Novo Registro", img: "./img/novo.png"},
            {id: "enviar", type: "button", text: "Salvar Registro", img: "./img/salvar.png"},
            {id: "sep1", type: "separator" },
            {id: "finalizar", type: "button", text: "Aplicar Retorno", img: "./img/retorno.png"},
            {id: "excluir", type: "button", text: "Excluir", img: "./img/excluir.png"},
            {id: "sep1", type: "separator" },
            {id: "ajuda", type: "button", img: "./img/ajuda.png"},
        ],

        onClick: function (id) {
                if (id === 'enviar') {
                    let dados = formulario.getFormData();
                    dados.situacao = 'Em aberto';
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

    let formulario = layout.cells("a").attachForm(formStructure);

    let registros = layout.cells('b').attachGrid();
    registros.setHeader("Data Inicio,Hora Inicio, Equipamento, Descrição do Equipamento, Cliente, Situação, Data de Retorno, Horario de Retorno");
    registros.setInitWidths("100,100,150,400,150,100,100");
    registros.setColAlign("left,left,left,left");
    registros.setColSorting("int,str,str,int");
    registros.init();

    function atualizargrid() {

        registros.clearAll();
        $.get( "http://api/ck/uptime", function( data ) {
            data.filter(function (item) {


                let data_inicio = window.dhx.date2str(new Date(item.data_inicio), '%d/%m/%Y');
                let data_final = (item.data_final !== null) ? window.dhx.date2str(new Date(item.data_final), '%d/%m/%Y') : null;
                let hora_final = (item.hora_final !== null) ? window.dhx.date2str(new Date(item.data_final + ' ' + item.hora_final), '%H:%i:%s') : null;


                registros.addRow(item.id, [data_inicio, item.hora_inicio, item.equipamento, item.descricao, item.cliente,  item.situacao, data_final, hora_final, item.situacao]);
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
});

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