var Form_Registros = [

    {type:"settings", position:"label-left", offsetLeft: 15, labelWidth:150,  labelAlign: "left",  inputWidth:300, inputLeft:97, inputTop:110,},

    {type:"input", name:"data_inicio", label:"Data Inicial: ", value: window.dhx.date2str(new Date(), '%d/%m/%Y')},
    {type:"input", name:"hora_inicio", label:"Horario Inicial: ", value: window.dhx.date2str(new Date(), '%H:%i:%s')},
    {type: "combo", label: "Cliente: ", name: "cliente", required:true, options:[
            {text: "Selecione um Condomínio", value: "valesca", selected: true, labelAlign: "right", label: "Internal Color"},
            {text: "Condominio Valesca", value: "Condominio Valesca"},
            {text: "Condominio Bavesca", value: "Condominio Bavesca"},
            {text: "Condominio Antuerpia", value: "Condominio Antuerpia"},
            {text: "Academia Horizon", value: "Academia Horizon"},
            {text: "Crossfit Barba Negra", value: "Crossfit Barba Negra"},
            {text: "Central Security", value: "Central Security"},
            {text: "Central Craos", value: "Central Craos"},

        ]},
    {type: "combo", name:"equipamento", label:"Equipamento: ", required:true, options:[
            {text: "Selecione um Equipamento", value: "Nenhum", selected: true, labelAlign: "right", label: "Internal Color"},
            {text: "VoIP", value: "VoIP"},
            {text: "Câmera", value: "Câmera"},
            {text: "DVR", value: "DVR"},
            {text: "Interfone", value: "Interfone"},
            {text: "Alarme", value: "Alarme"},
            {text: "Portão", value: "Portão"},
        ]},
    {
        type: "input",
        name: 'descricao',
        label: 'Descrição da Ocorrência:',
        rows: 3,
        note: {text: "Descreva sobre a ocorrência."}},

    {type: "newcolumn", offset: 20},

];

var Form_Chamados = [

    {type:"settings", position:"label-left", offsetLeft: 15, labelWidth:90,  labelAlign: "left",  inputWidth:300, inputLeft:97, inputTop:110,},

    {type:"input", name:"filedate", label:"Data: ", value: window.dhx.date2str(new Date(), '%d/%m/%Y')},

    {type: "combo", name:"cliente", label:"Cliente: ", required:true},

    {type:"input", required:true, name:"assunto", label:"Assunto: "},
    {
        type: "input",
        name: 'solicitacao',
        label: 'Solicitação:',
        rows: 3,
        required: true,
        note: {text: "Descreva informações necessárias para abertura do chamado."}
        },

    {type: "newcolumn", offset: 20},

    {type:"input", name:"solicitante", label:"Solicitante: ", required: true},


];