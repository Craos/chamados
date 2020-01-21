var mySidebar, situacoes;

let app = function() {

     mySidebar = new dhtmlXSideBar({

        parent:         document.body,
        template:       "icons_text",
        icons_path:     "icons/",
        single_cell:    false,
        bubble:         6,
        width:          100,
        header:         true,
        autohide:       false,
         offsets: {          // optional, offsets for fullscreen init
             top:    0,     // you can specify all four sides
             right:  0,     // or only the side where you want to have an offset
             bottom: 0,
             left:   0
         },
        items: [
            {
                id:         "dashboard",
                text:       "Dashboard",
                icon:       "../img/dashboard.png",
                selected:   true
            },
            {
                id:         "sep1",
                type:       "separator"
            },
            {
                id:         "chamados",
                text:       "Chamados",
                icon:       "../img/chamado.png",
                selected:   false
            },
            {
                id:         "sep1",
                type:       "separator"
            },
            {
                id:         "registros",
                text:       "Eventos",
                icon:       "../img/registro.png",
                selected:   false
            },
            // {
            //     id:         "sep1",
            //     type:       "separator"
            // },
            // {
            //     id:         "fila",
            //     text:       " Fila Geral de Chamados",
            //     icon:       "../img/fila.png",
            //     selected:   false
            // },
            // {
            //     id:         "sep1",
            //     type:       "separator"
            // },
            // {
            //     id:         "configuracoes",
            //     text:       " Configurações",
            //     icon:       "../img/configuracoes.png",
            //     selected:   false
            // },
        ]
    });

    mySidebar.attachEvent("onSelect", function(id, lastId){

        if (id === 'chamados'){
            chamados();
        }else if (id === 'registros'){
            registros();
        }else if (id === 'dashboard'){
            dashboard();
        }else if (id === 'configuracoes'){

        }
    });

    situacaochamado(function (response) {
        situacoes = response;
    });

    dashboard();

};