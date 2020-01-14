var mySidebar, situacoes;

$(document).ready(function () {

     mySidebar = new dhtmlXSideBar({

        parent:         document.body,
        template:       "icons",
        icons_path:     "icons/",
        single_cell:    false,
        bubble:         6,
        width:          50,
        header:         true,
        autohide:       false,
        items: [
            {
                id:         "dashboard",
                text:       " Dashboard",
                icon:       "../img/dashboard.png",
                selected:   true
            },
            {
                id:         "sep1",
                type:       "separator"
            },
            {
                id:         "chamados",
                text:       " Abertura de Chamado",
                icon:       "../img/chamado.png",
                selected:   false
            },
            {
                id:         "sep1",
                type:       "separator"
            },
            {
                id:         "registros",
                text:       " Registro de Eventos",
                icon:       "../img/registro.png",
                selected:   false
            },
            {
                id:         "sep1",
                type:       "separator"
            },
            {
                id:         "fila",
                text:       " Fila Geral de Chamados",
                icon:       "../img/fila.png",
                selected:   false
            },
            {
                id:         "sep1",
                type:       "separator"
            },
            {
                id:         "configuracoes",
                text:       " Configurações",
                icon:       "../img/configuracoes.png",
                selected:   false
            },
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

});