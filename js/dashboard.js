function dashboard() {
    let layoutdashboard = mySidebar.cells('dashboard').attachLayout({
        pattern:    "2E",
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
                header: false,
                height: 280,
                fix_size: [true,null],
            },
        ]
    });

}