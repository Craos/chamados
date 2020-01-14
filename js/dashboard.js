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
                text: "Fila de Chamados em Espera",
                height: 280,
                fix_size: [true,null],
            },
            {
                id: "c",
                header: false,
                height: 280,
                fix_size: [true, null],
            },
        ]
    });

    let griddashboard = layoutdashboard.cells('b').attachGrid();

    griddashboard.setHeader("Chamado, Data, Assunto, Solicitante, Situação");
    griddashboard.setInitWidths("50,120,200,110");
    griddashboard.setColAlign("center,left,left,left");
    griddashboard.init();

    function atualizargrid() {

        $.get( "http://192.168.2.220/ck/chamados", function( data ) {
            data.filter(function (item) {

                let filedate = window.dhx.date2str(new Date(item.filedate), '%d/%m - %H:%i');
                let situacao = situacoes.find(x => x.id === item.situacao).nome;

                griddashboard.addRow(item.id, [item.numero, filedate, item.assunto, item.solicitante, situacao]);
            });
        });
    };

    atualizargrid();

}