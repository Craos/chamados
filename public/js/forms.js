var Form_Registros = [

    {type:"settings", position:"label-left", offsetLeft: 15, labelWidth:150,  labelAlign: "left",  inputWidth:300, inputLeft:97, inputTop:110,},

    {type:"input", name:"data_inicio", label:"Data Inicial: ", value: window.dhx.date2str(new Date(), '%d/%m/%Y')},
    {type:"input", name:"hora_inicio", label:"Horario Inicial: ", value: window.dhx.date2str(new Date(), '%H:%i:%s')},
    {type: "combo", name:"equipamento", label:"Equipamento: ", note: {text: 'Selecionar um equipamento é obrigatório.'}},

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

    {type: "combo", name:"cliente", label:"Cliente: ", required:true, note: {text: 'Selecionar um cliente é obrigatório.'}},

    {type:"input", required:true, name:"assunto", label:"Assunto: ", note: {text: 'Selecionar um equipamento é obrigatório.'}},
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