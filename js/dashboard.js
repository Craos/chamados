function dashboard() {
    let layoutdashboard = mySidebar.cells('dashboard').attachLayout({
        pattern:    "3L",
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
                text: "Fila de Chamados",
                height: 280,
                fix_size: [true,null],
            },
            {
                id: "c",
                header: true,
                text: "Fila de Registros em Aberto",
                height: 280,
                fix_size: [true, null],
            },
        ]
    });




    let gridchamados = layoutdashboard.cells('b').attachGrid();

    gridchamados.setHeader("Cliente, Situação, Chamados");
    gridchamados.setInitWidths("200,300");
    gridchamados.init();

    function atualizargrid_chamados() {

        $.get( "http://192.168.2.220/ck/dashboard_chamados", function( data ) {
            data.filter(function (item) {

                let filedate = window.dhx.date2str(new Date(item.filedate), '%d/%m - %H:%i');
                // let situacao = situacoes.find(x => x.id === item.situacao).nome;

                gridchamados.addRow(item.id, [item.cliente, item.situacao, item.chamados]);
            });
        });
    }

    let gridregistros = layoutdashboard.cells('c').attachGrid();

    gridregistros.setHeader("Cliente, Situação, Equipamento, Horário de Abertura");
    gridregistros.setInitWidths("200, 190, 100");
    gridregistros.setColAlign("left,left,left,left");
    gridregistros.init();

    function atualizargrid_registros() {

        $.get( "http://192.168.2.220/ck/uptime", function( data ) {
            data.filter(function (item) {

                let data_inicio = window.dhx.date2str(new Date(item.data_inicio), '%d/%m/%Y');
                let data_final = (item.data_final !== null) ? window.dhx.date2str(new Date(item.data_final), '%d/%m/%Y') : null;
                let hora_final = (item.hora_final !== null) ? window.dhx.date2str(new Date(item.data_final + ' ' + item.hora_final), '%H:%i:%s') : null;


                gridregistros.addRow(item.id, [item.cliente,  item.equipamento, item.situacao, data_inicio]);
            });
        });
    }

    atualizargrid_registros();

    atualizargrid_chamados();

    layoutdashboard.attachEvent('onContentLoaded', function (id) {

        let ifr = layoutdashboard.cells(id).getFrame();
        let documento = ifr.contentWindow.document;


        $.get( "http://192.168.2.220/ck/dashboard_chamados_resumo", function( data ) {

            let tpl = documento.getElementById('barras');

            data.filter(function (item) {

                let barra = tpl.content.cloneNode(true);
                barra.getElementById('porcentagem').style.width = item.percent;
                barra.getElementById('porcentagem').style.backgroundColor = item.cor;
                barra.getElementById('descricao').innerText = item.situacao + ' ' + item.percent;

                console.debug(barra.getElementById('porcentagem'));
                ifr.contentWindow.document.getElementById('data_container').appendChild(barra);



            });



            $.get( "http://192.168.2.220/ck/dashboard_chamados_max", function( data ) {

                documento.getElementById('icone').innerText = data[0].img;


            });

            $.get( "http://192.168.2.220/ck/dashboard_chamados", function( data ) {

                documento.getElementById('chamadosfila').innerHTML = data[0].chamados;

            });


        });
    });

    let dashboardscreen = layoutdashboard.cells('a').attachURL("chart.html", null, {fname: "Mike", hobby: "fishing"});






}