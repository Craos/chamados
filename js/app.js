$(document).ready(function () {
    let layout = new dhtmlXLayoutObject({

        parent: document.body,
        pattern: "3L",           // string, layout's pattern

        offsets: {          // optional, offsets for fullscreen init
            top: 0,     // you can specify all four sides
            right: 0,     // or only the side where you want to have an offset
            bottom: 0,
            left: 0
        },

        cells: [    // optional, cells configuration according to the pattern
            // you can specify only the cells you want to configure
            // all params are optional
            {
                id: "a",        // id of the cell you want to configure
                text: "dados",     // header text
                header: false,      // hide header on init
            },
            // all params are optional
            {
                id: "b",        // id of the cell you want to configure
                text: "Text",     // header text
            },     // all params are optional
            {
                id: "c",        // id of the cell you want to configure
                text: "Text",     // header text
            },

        ]
    });



    let mygrid = layout.cells('a').attachGrid();
    mygrid.setHeader("Data Inicio,Hora Inicio,Descrição do Equipamento,Local,Data de Retorno,Horario de Retorno");//the headers of columns
    mygrid.init();

    $.get( "http://api.craos.net/ck/uptime", function( data ) {
        data.filter(function (item) {
            console.debug(item);
            mygrid.addRow(item.id, [item.data_inicio, item.id, item.hora_inicio, item.equipamento, item.local, item.data_final, item.hora_final]);
        });
    });


});