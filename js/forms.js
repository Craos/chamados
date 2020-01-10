var formStructure = [

    {type:"settings", position:"label-left", offsetLeft: 50, labelWidth:90,  labelAlign: "right"},

    {type:"input", name:"data_inicio", label:"Data Inicial: ", value: window.dhx.date2str(new Date(), '%d/%m/%Y')},
    {type:"input", name:"hora_inicio", label:"Horario Inicial: ", value: window.dhx.date2str(new Date(), '%H:%i:%s')},
    {type: "combo", label: "Cliente: ", name: "cliente", options:[
            {text: "Selecione um Condomínio", value: "valesca", selected: true, labelAlign: "right", label: "Internal Color"},
            {text: "Condominio Valesca", value: "Condominio Valesca"},
            {text: "Condominio Balesca", value: "Condominio Balesca"},
            {text: "Condominio Antuerpia", value: "Condominio Antuerpia"},
            {text: "Central Security", value: "Central Security"},
        ]},


    {type:"input", name:"equipamento", label:"Equipamento: "},

    {type:'input', name:'descricao', label:'Descrição do Equipamento:', inputWidth:250, labelAlign:'right', offsetLeft: 20},

    {type:"newcolumn", offset:20},

];
