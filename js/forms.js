var formStructure = [

    {type:"settings", position:"label-left", offsetLeft: 20, labelWidth:90,  labelAlign: "right"},

    {type:"input", name:"form_datainicio", label:"Data Inicial: "},
    {type:"input", name:"form_horainicio", label:"Horario Inicial: "},
    {type: "combo", label: "Cliente: ", name: "form_cliente", options:[
            {text: "Selecione um Condomínio", value: "valesca", selected: true, labelAlign: "right", label: "Internal Color"},
            {text: "Condominio Valesca", value: "valesca"},
            {text: "Condominio Balesca", value: "balesca"},
            {text: "Condominio Antuerpia", value: "antuerpia"},
            {text: "Central Security", value: "security"},


        ]},
    {type:"input", name:"form_equipamento", label:"Equipamento: "},

    {type:'input', name:'Description', label:'Description:', inputWidth:250, labelAlign:'right', offsetLeft: 20},


    {type:"newcolumn", offset:20},

];