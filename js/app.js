$(document).ready(function () {

    var mySidebar = new dhtmlXSideBar({

        parent:         document.body,   // id/object, container for sidebar
         template:       "icons",      // string, used template, "details" by default
        icons_path:     "icons/",       // string, path to the folder with icons
        single_cell:    false,           // boolean, true to enable the single cell mode
        bubble:         6,              // number, marker to show number of notifications
        width:          50,            // number, width of the left part
        header:         true,           // boolean, true to enable the header
        autohide:       false,          // boolean, true to autohide the navigation bar
        xml:            "sidebar.xml",  // string, path to xml config, optional
        json:           "sidebar.json", // string, path to json config, optional
        onload:         function(){},   // function, callback for xml/json, optional
        items: [
            // items config
            {
                id:         "chamados",       // item id
                text:       "Chamados",     // item text
                icon:       "../img/chamado.png",   // icon used for the item
                selected:   true        // boolean, true to select an item
            },
            // separator config
            {
                id:         "sep1",     // separator id
                type:       "separator" // item type, mandatory
            },
            {
                id:         "configuracoes",       // item id
                text:       "Configurações",     // item text
                icon:       "../img/configuracoes.png",   // icon used for the item
                selected:   false        // boolean, true to select an item
            },

        ]

    });



    let layout = mySidebar.cells('chamados').attachLayout({
        pattern:    "2E",           // string, layout's pattern


        offsets: {          // optional, offsets for fullscreen init
            top:    5,     // you can specify all four sides
            right:  10,     // or only the side where you want to have an offset
            bottom: 5,
            left:   10
        },

        cells: [    // optional, cells configuration according to the pattern
            // you can specify only the cells you want to configure
            // all params are optional
            {
                id: "a",        // id of the cell you want to configure
                text: "Novo Cadastro",
                header: false,

            },
            {
                id: "b",        // id of the cell you want to configure
                header: false,
            },
        ]
    });


    layout.cells('a').attachToolbar({
        items:[
            {id: "novoevento", type: "buttonTwoState", text: "Novo Evento", img: "./img/new.png"},
            {id: "cancelar", type: "buttonTwoState", text: "Cancelar", img: "./img/cancel.png"},
            {id: "sep1", type: "separator" },
            {id: "cancelar", type: "buttonTwoState", img: "./img/ajuda.png"},

        ],

        onClick: function (id) {
                console.debug(id);
        }

    });

    let formulario = layout.cells("a").attachForm(formStructure);




    let chamados = layout.cells('b').attachGrid();
    chamados.setHeader("Data Inicio,Hora Inicio,Descrição do Equipamento,Local,Data de Retorno,Horario de Retorno");//the headers of columns
    chamados.init();

    $.get( "http://api.craos.net/ck/uptime", function( data ) {
        data.filter(function (item) {
            console.debug(item);
            chamados.addRow(item.id, [item.data_inicio, item.id, item.hora_inicio, item.equipamento, item.local, item.data_final, item.hora_final]);
        });
    });



});