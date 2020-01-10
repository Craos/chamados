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
                text:       "Controle de Eventos",
                icon:       "../img/chamado.png",
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

    let layout = mySidebar.cells('chamados').attachLayout({
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
            },
        ]
    });


    layout.cells('a').attachToolbar({
        items:[
            {id: "novoevento", type: "button", text: "Novo Chamado", img: "./img/new.png"},
            {id: "finalizar", type: "button", text: "Finalizar Chamado", img: "./img/finalizarchamado.png"},
            {id: "sep1", type: "separator" },
            {id: "enviar", type: "button", text: "Enviar", img: "./img/enviarchamado.png"},
            {id: "excluir", type: "button", text: "Excluir", img: "./img/cancelarchamado.png"},
            {id: "sep1", type: "separator" },
            {id: "ajuda", type: "button", img: "./img/ajuda.png"},
        ],

        onClick: function (id) {
                if (id === 'enviar') {
                    Enviar(formulario.getFormData(), atualizargrid);
                } else if (id === 'finalizar'){

                }
        }

    });

    let formulario = layout.cells("a").attachForm(formStructure);

    let chamados = layout.cells('b').attachGrid();
    chamados.setHeader("Data Inicio,Hora Inicio,Descrição do Equipamento,Cliente,Data de Retorno,Horario de Retorno");
    chamados.setInitWidths("150,150,400,300,130,130");
    chamados.setColAlign("left,left,left,left");
    chamados.setColSorting("int,str,str,int");
    chamados.init();

    function atualizargrid() {

        chamados.clearAll();
        $.get( "http://api/ck/uptime", function( data ) {
            data.filter(function (item) {
                let data_inicio = window.dhx.date2str(new Date(item.data_inicio), '%d/%m/%Y');
                let data_final = window.dhx.date2str(new Date(item.data_final), '%d/%m/%Y');
                let hora_final = window.dhx.date2str(new Date(item.data_final + ' ' + item.hora_final), '%H:%i:%s');

                chamados.addRow(item.id, [data_inicio, item.hora_inicio, item.equipamento, item.cliente, data_final, hora_final]);
            });
        });

    }
    atualizargrid();
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